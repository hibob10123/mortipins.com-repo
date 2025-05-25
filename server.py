from flask import Flask, send_from_directory, request
from flask_socketio import SocketIO, emit, join_room, leave_room
import random
import string
import threading
import time

app = Flask(__name__, static_folder='.', static_url_path='')
socketio = SocketIO(app, cors_allowed_origins='*')

queue = []
rooms = {}

# Game constants
ROUND_DURATION = 30  # seconds for guessing
RESULTS_SCREEN_DURATION = 5  # seconds for showing results

# Helper function to manage room state and progression
def attempt_progress_round(room_id, video_idx_completed):
    room = rooms.get(room_id)
    if not room or video_idx_completed != room.get('current_video_index', -1):
        return

    ready_for_next = room.get('ready_for_next_round', set())
    proceed = False
    if len(ready_for_next) == len(room.get('players', [])) and len(room.get('players', [])) > 0:
        proceed = True

    if proceed:
        room['ready_for_next_round'] = set()
        if room.get('round_timer_thread') and room['round_timer_thread'].is_alive():
            room['round_timer_event'].set() # Signal existing timer to stop

        next_idx = video_idx_completed + 1
        total_videos = len(room.get('video_list', []))

        if next_idx < total_videos:
            room['current_video_index'] = next_idx
            socketio.emit('start_next_round_timer', room=room_id) 
            socketio.emit('start_round', {'video_index': next_idx}, room=room_id)
            start_server_round_timer(room_id, next_idx, ROUND_DURATION + RESULTS_SCREEN_DURATION)
        else:
            socketio.emit('game_over', {'guesses': room.get('guesses', {})}, room=room_id)
            rooms.pop(room_id, None)

def start_server_round_timer(room_id, video_index, duration):
    room = rooms.get(room_id)
    if not room:
        return

    if room.get('round_timer_thread') and room['round_timer_thread'].is_alive():
        room['round_timer_event'].set() # Stop previous timer if any

    room['round_timer_event'] = threading.Event()

    def timer_thread_target(event):
        if not event.wait(duration): # Returns false if timeout occurs, true if event is set.
            handle_round_timeout(room_id, video_index)
    
    timer_thread = threading.Thread(target=timer_thread_target, args=(room['round_timer_event'],))
    room['round_timer_thread'] = timer_thread
    timer_thread.start()

def handle_round_timeout(room_id, video_index_timed_out):
    room = rooms.get(room_id)
    if not room or room.get('current_video_index', -1) != video_index_timed_out:
        return

    current_guesses = room['guesses'].setdefault(video_index_timed_out, {})
    player_map = room.get('player_map', {})
    made_default_guess = False

    for p_sid, p_num in player_map.items():
        if p_num not in current_guesses:
            current_guesses[p_num] = "No Guess"
            made_default_guess = True
    
    if made_default_guess or len(current_guesses) < len(room.get('players',[])):
        # Ensure all players have a guess entry if not already, then emit results
        for p_sid_inner, p_num_inner in player_map.items():
             current_guesses.setdefault(p_num_inner, "No Guess")
        socketio.emit('round_result', {'video_index': video_index_timed_out, 'guesses': current_guesses}, room=room_id)

    # After results are sent (or were already sent), server timeout implies we should force progress.
    # Mark both players as ready and attempt to progress.
    # This covers scenarios where clients don't send 'request_next_round' after viewing results.
    if room: # Room might have been popped by a disconnect during the sleep
        room['ready_for_next_round'] = set(room.get('player_map', {}).values()) 
        attempt_progress_round(room_id, video_index_timed_out)

@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory('.', path)

@socketio.on('join_queue')
def handle_join_queue():
    sid = request.sid
    queue.append(sid)
    for qsid in queue:
        socketio.emit('lobby_update', {'count': len(queue)}, to=qsid)
    if len(queue) >= 2:
        p1_sid = queue.pop(0)
        p2_sid = queue.pop(0)
        for qsid in queue:
            socketio.emit('lobby_update', {'count': len(queue)}, to=qsid)
        room_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        rooms[room_id] = {
            'players': [p1_sid, p2_sid],
            'player_map': {p1_sid: 1, p2_sid: 2},
            'video_list': None,
            'guesses': {},
            'current_video_index': -1,
            'round_timer_thread': None,
            'round_timer_event': None, # For stopping the timer thread
            'ready_for_next_round': set(),
        }
        join_room(room_id, sid=p1_sid)
        join_room(room_id, sid=p2_sid)
        socketio.emit('match_found', {'room': room_id, 'player_number': 1}, to=p1_sid)
        socketio.emit('match_found', {'room': room_id, 'player_number': 2}, to=p2_sid)

@socketio.on('video_list')
def handle_video_list(data):
    room_id = data.get('room')
    video_list = data.get('video_list')
    room = rooms.get(room_id)
    if room and room['players'][0] == request.sid:
        room['video_list'] = video_list
        room['current_video_index'] = 0
        socketio.emit('start_game', {'video_list': video_list}, room=room_id)
        socketio.emit('start_next_round_timer', room=room_id)
        start_server_round_timer(room_id, 0, ROUND_DURATION + RESULTS_SCREEN_DURATION)

@socketio.on('submit_guess')
def handle_submit_guess(data):
    room_id = data.get('room')
    p_num = data.get('player_number')
    video_idx = data.get('video_index')
    guess = data.get('guess')
    room = rooms.get(room_id)

    if not room or video_idx != room.get('current_video_index'):
        return

    room['guesses'].setdefault(video_idx, {})[p_num] = guess

    if len(room['guesses'][video_idx]) == len(room.get('players',[])):
        if room.get('round_timer_thread') and room['round_timer_thread'].is_alive():
            room['round_timer_event'].set() # Signal timer to stop as both guessed
        socketio.emit('round_result', {'video_index': video_idx, 'guesses': room['guesses'][video_idx]}, room=room_id)

@socketio.on('request_next_round')
def handle_request_next_round(data):
    room_id = data.get('room')
    player_number = data.get('player_number')
    video_idx_completed = data.get('video_index')
    room = rooms.get(room_id)

    if not room or video_idx_completed != room.get('current_video_index'):
        return

    room['ready_for_next_round'].add(player_number)
    attempt_progress_round(room_id, video_idx_completed)

@socketio.on('leave_room')
def handle_leave_room(data):
    room_id = data.get('room')
    room = rooms.pop(room_id, None)
    if room:
        if room.get('round_timer_thread') and room['round_timer_thread'].is_alive():
            room['round_timer_event'].set()
        for p_sid in room.get('players', []):
            leave_room(room_id, sid=p_sid)

@socketio.on('leave_queue')
def handle_leave_queue_event():
    sid = request.sid
    if sid in queue:
        queue.remove(sid)
        for qsid in queue:
            socketio.emit('lobby_update', {'count': len(queue)}, to=qsid)

@socketio.on('disconnect')
def handle_disconnect():
    sid = request.sid
    if sid in queue:
        queue.remove(sid)
        for q_sid in queue:
            socketio.emit('lobby_update', {'count': len(queue)}, to=q_sid)

    room_id_player_left = None
    other_player_sids_in_room = []

    for r_id, r_data in list(rooms.items()):
        if sid in r_data.get('players', []):
            room_id_player_left = r_id
            other_player_sids_in_room = [p for p in r_data['players'] if p != sid and p in r_data.get('player_map', {})]
            break
    
    if room_id_player_left:
        room = rooms.get(room_id_player_left) # Get room before popping
        if room:
            player_map_in_room = room.get('player_map', {})
            disconnected_player_number = player_map_in_room.get(sid)

            # Notify other players in that room
            for other_sid in other_player_sids_in_room:
                socketio.emit('opponent_left', room=other_sid) 

            # If the disconnected player was the only one left, or if it makes the room invalid
            if len(other_player_sids_in_room) < 1 and room_id_player_left in rooms: # Check if room still exists
                 # Stop timer and remove room if it becomes invalid
                if rooms[room_id_player_left].get('round_timer_thread') and rooms[room_id_player_left]['round_timer_thread'].is_alive():
                    rooms[room_id_player_left]['round_timer_event'].set()
                rooms.pop(room_id_player_left, None)
            elif room_id_player_left in rooms: # Still other players, room might continue or be handled by other logic
                # Remove disconnected player from 'players' list and 'player_map'
                if sid in rooms[room_id_player_left]['players']:
                    rooms[room_id_player_left]['players'].remove(sid)
                if sid in rooms[room_id_player_left]['player_map']:
                    del rooms[room_id_player_left]['player_map'][sid]
                
                # If this player had not yet submitted a guess for the current round, treat as "No Guess"
                # and potentially trigger round result if other player had guessed.
                current_idx = rooms[room_id_player_left].get('current_video_index', -1)
                if current_idx != -1 and disconnected_player_number:
                    current_guesses_for_round = rooms[room_id_player_left]['guesses'].setdefault(current_idx, {})
                    if disconnected_player_number not in current_guesses_for_round:
                        current_guesses_for_round[disconnected_player_number] = "No Guess"
                        # If now all remaining active players have guessed (or defaulted)
                        active_player_numbers = set(rooms[room_id_player_left]['player_map'].values())
                        if active_player_numbers.issubset(current_guesses_for_round.keys()) and len(active_player_numbers) > 0:
                            if rooms[room_id_player_left].get('round_timer_thread') and rooms[room_id_player_left]['round_timer_thread'].is_alive():
                                rooms[room_id_player_left]['round_timer_event'].set() # Stop timer
                            socketio.emit('round_result', {'video_index': current_idx, 'guesses': current_guesses_for_round}, room=room_id_player_left)
                
                # If only one player remains, game essentially ends for them. Clean up.
                if len(rooms[room_id_player_left]['players']) < 1 : # Should be 0 if last player, or 1 if this was second to last
                    if rooms[room_id_player_left].get('round_timer_thread') and rooms[room_id_player_left]['round_timer_thread'].is_alive():
                         rooms[room_id_player_left]['round_timer_event'].set()
                    rooms.pop(room_id_player_left, None)

if __name__ == '__main__':
    # Disable auto-reloader to avoid binding port twice
    socketio.run(app, host='0.0.0.0', port=25565, use_reloader=False) 