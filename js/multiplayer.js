const SOCKET_URL = 'https://enkeiserver.duckdns.org';
console.log('Socket connecting to', SOCKET_URL);
const socket = io(SOCKET_URL);
let roomId;
let playerNumber;
let videoList = [];
let currentIndex = 0;
let selectedGuess = null;
let timerInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  console.log('Emitting join_queue');
  socket.emit('join_queue');
});

socket.on('match_found', data => {
  console.log('Received match_found', data);
  document.getElementById('matchmakingScreen').style.display = 'none';
  document.getElementById('countdownScreen').style.display = 'flex';
  roomId = data.room;
  playerNumber = data.player_number;
  document.getElementById('playerInfo').textContent = `You are Player ${playerNumber}`;
  let count = 5;
  const cdEl = document.getElementById('countdown');
  cdEl.textContent = count;
  const countdownInterval = setInterval(() => {
    count--;
    cdEl.textContent = count;
    if (count <= 0) {
      clearInterval(countdownInterval);
      document.getElementById('countdownScreen').style.display = 'none';
      document.getElementById('gameScreen').style.display = 'block';
      if (playerNumber === 1) {
        const picks = [];
        for (let i = 0; i < 5; i++) {
          const idx = Math.floor(Math.random() * videoLinks.length);
          picks.push(videoLinks[idx]);
        }
        socket.emit('video_list', { room: roomId, video_list: picks });
      }
    }
  }, 1000);
});

socket.on('start_game', data => {
  videoList = data.video_list;
  showRound(0);
});

socket.on('start_round', data => {
  showRound(data.video_index);
});

socket.on('round_result', data => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  showResultChart(data.video_index, data.guesses);
});

socket.on('game_over', data => {
  showGameOver(data.guesses);
});

socket.on('opponent_left', () => {
  console.log('Opponent disconnected event');
  const modal = document.getElementById('opponentLeftModal');
  if (modal) modal.style.display = 'block';
  const btn = document.getElementById('returnHomeBtn');
  if (btn) {
    btn.onclick = () => {
      socket.emit('leave_room', { room: roomId });
      window.location.href = 'brawldle.html';
    };
  }
});

socket.on('lobby_update', data => {
  console.log('Lobby count:', data.count);
  const elem = document.getElementById('lobbyCount');
  if (elem) elem.textContent = `${data.count} of 2 players in lobby`;
});

document.addEventListener('DOMContentLoaded', () => {
  const leaveBtn = document.getElementById('leaveQueueButton');
  if (leaveBtn) {
    leaveBtn.onclick = () => {
      console.log('Leaving queue');
      socket.emit('leave_queue');
      window.location.href = 'brawldle.html';
    };
  }
});

function showRound(index) {
  currentIndex = index;
  selectedGuess = null;
  document.getElementById('timer').textContent = `Time: 30s`;
  const video = videoList[index];
  document.getElementById('videoFrame').src = video.link;
  startTimer();
}

function startTimer() {
  let timeLeft = 30;
  const timerEl = document.getElementById('timer');
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  const interval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(interval);
      timerInterval = null;
      submitGuess();
    }
  }, 1000);
  timerInterval = interval;
}

function selectRank(rank) {
  selectedGuess = rank;
  document.querySelectorAll('.rank-buttons img').forEach(img => img.classList.remove('selected'));
  event.target.classList.add('selected');
}

function submitGuess() {
  const status = document.getElementById('statusMessage');
  const submitBtn = document.getElementById('submitButton');
  if (status) status.textContent = 'Waiting for opponent...';
  if (submitBtn) {
    submitBtn.classList.add('disabled');
    submitBtn.textContent = 'Submitted. Waiting for other player...';
  }
  if (!selectedGuess) selectedGuess = 'No Guess';
  socket.emit('submit_guess', {
    room: roomId,
    player_number: playerNumber,
    video_index: currentIndex,
    guess: selectedGuess
  });
}

function showResultChart(index, guesses) {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  const status = document.getElementById('statusMessage');
  const submitBtn = document.getElementById('submitButton');
  if (status) status.textContent = '';
  if (submitBtn) {
    submitBtn.classList.remove('disabled');
    submitBtn.textContent = 'Submit Guess';
  }
  const you = guesses[playerNumber];
  const opp = guesses[playerNumber === 1 ? 2 : 1];
  const labels = ['Bronze','Silver','Gold','Diamond','Mythic','Legendary','Masters'];
  const youData = labels.map(l => l === you ? 1 : 0);
  const oppData = labels.map(l => l === opp ? 1 : 0);
  const correctRank = videoList[index].trueRank;
  const correctData = labels.map(l => l === correctRank ? 1 : 0);
  document.getElementById('roundModal').style.display = 'block';
  const correctEl = document.getElementById('correctAnswer');
  if (correctEl) correctEl.textContent = `Correct Answer: ${correctRank}`;
  const ctx = document.getElementById('roundResultChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'You', data: youData, backgroundColor: 'rgba(54, 162, 235, 0.5)' },
        { label: 'Opponent', data: oppData, backgroundColor: 'rgba(255, 99, 132, 0.5)' },
        { label: 'Correct', data: correctData, backgroundColor: 'rgba(0, 255, 0, 0.3)', borderColor: 'rgba(0, 255, 0, 0.8)', borderWidth: 2 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
  });
  document.getElementById('closeRound').onclick = () => {
    document.getElementById('roundModal').style.display = 'none';
  };
}

function showGameOver(guesses) {
  document.getElementById('gameOverModal').style.display = 'block';
  const labels = ['Round 1','Round 2','Round 3','Round 4','Round 5'];
  const youData = labels.map((_, i) => guesses[i][playerNumber] === videoList[i].trueRank ? 1 : 0);
  const oppData = labels.map((_, i) => guesses[i][playerNumber === 1 ? 2 : 1] === videoList[i].trueRank ? 1 : 0);
  const ctx = document.getElementById('gameOverChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'You', data: youData, backgroundColor: 'rgba(54, 162, 235, 0.5)' },
        { label: 'Opponent', data: oppData, backgroundColor: 'rgba(255, 99, 132, 0.5)' }
      ]
    },
    options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
  });
  document.getElementById('closeGameOver').onclick = () => {
    socket.emit('leave_room', { room: roomId });
    window.location.reload();
  };

  const resultsContainer = document.getElementById('gameOverResults');
  let resultsHtml = '<ul>';
  for (let i = 0; i < videoList.length; i++) {
    const youGuess = guesses[i][playerNumber] || 'No Guess';
    const oppGuess = guesses[i][playerNumber === 1 ? 2 : 1] || 'No Guess';
    resultsHtml += `<li>Round ${i+1}: You guessed ${youGuess}, Opponent guessed ${oppGuess}</li>`;
  }
  resultsHtml += '</ul>';
  resultsContainer.innerHTML = resultsHtml;
} 