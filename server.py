from flask import Flask, send_from_directory, request
from flask_socketio import SocketIO, emit, join_room, leave_room
import random
import string

app = Flask(__name__, static_folder='.', static_url_path='')
socketio = SocketIO(app, cors_allowed_origins='*')

queue = []
rooms = {}

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
        p1 = queue.pop(0)
        p2 = queue.pop(0)
        for qsid in queue:
            socketio.emit('lobby_update', {'count': len(queue)}, to=qsid)
        room_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        rooms[room_id] = {'players': [p1, p2], 'video_list': None, 'guesses': {}}
        join_room(room_id, sid=p1)
        join_room(room_id, sid=p2)
        socketio.emit('match_found', {'room': room_id, 'player_number': 1}, to=p1)
        socketio.emit('match_found', {'room': room_id, 'player_number': 2}, to=p2)

@socketio.on('video_list')
def handle_video_list(data):
    room_id = data.get('room')
    video_list = data.get('video_list')
    if room_id in rooms:
        rooms[room_id]['video_list'] = video_list
        socketio.emit('start_game', {'video_list': video_list}, room=room_id)

@socketio.on('submit_guess')
def handle_submit_guess(data):
    room_id = data.get('room')
    p_num = data.get('player_number')
    idx = data.get('video_index')
    guess = data.get('guess')
    room = rooms.get(room_id)
    if not room:
        return
    room['guesses'].setdefault(idx, {})[p_num] = guess
    if len(room['guesses'][idx]) == 2:
        sock_guess = room['guesses'][idx]
        socketio.emit('round_result', {'video_index': idx, 'guesses': sock_guess}, room=room_id)
        total = len(room['video_list'] or [])
        next_idx = idx + 1
        if next_idx < total:
            socketio.emit('start_round', {'video_index': next_idx}, room=room_id)
        else:
            socketio.emit('game_over', {'guesses': room['guesses']}, room=room_id)

@socketio.on('leave_room')
def handle_leave_room(data):
    room_id = data.get('room')
    room = rooms.pop(room_id, None)
    if room:
        for p in room.get('players', []):
            leave_room(room_id, sid=p)

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
        for qsid in queue:
            socketio.emit('lobby_update', {'count': len(queue)}, to=qsid)
    to_delete = []
    for room_id, room in rooms.items():
        if sid in room.get('players', []):
            to_delete.append(room_id)
            other = [p for p in room['players'] if p != sid]
            if other:
                socketio.emit('opponent_left', room=other[0])
    for rid in to_delete:
        rooms.pop(rid, None)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=25565, use_reloader=False) 