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

socket.on('start_next_round_timer', () => {
  initiateRoundCountdown();
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
  const submitBtn = document.getElementById('submitButton');
  if (submitBtn) {
    submitBtn.classList.remove('disabled');
    submitBtn.textContent = 'Submit Guess';
  }
  const status = document.getElementById('statusMessage');
  if (status) status.textContent = '';
  
  const video = videoList[index];
  document.getElementById('videoFrame').src = video.link;
}

function initiateRoundCountdown() {
  const overlay = document.getElementById('roundCountdownOverlay');
  const countdownValueEl = document.getElementById('roundCountdownValue');
  const gameScreen = document.getElementById('gameScreen');

  if (!overlay || !countdownValueEl) {
    console.error("Countdown overlay elements not found! Starting round timer directly.");
    startTimer();
    return;
  }

  let countdown = 5;
  countdownValueEl.textContent = countdown;
  overlay.style.display = 'flex';
  
  document.querySelectorAll('.rank-buttons img').forEach(img => img.style.pointerEvents = 'none');
  const submitButton = document.getElementById('submitButton');
  if (submitButton) submitButton.classList.add('disabled');

  const countdownInterval = setInterval(() => {
    countdown--;
    countdownValueEl.textContent = countdown;
    if (countdown <= 0) {
      clearInterval(countdownInterval);
      overlay.style.display = 'none';
      document.querySelectorAll('.rank-buttons img').forEach(img => img.style.pointerEvents = 'auto');
      if (submitButton) submitButton.classList.remove('disabled');
      
  startTimer();
    }
  }, 1000);
}

function startTimer() {
  let timeLeft = 30;
  const timerEl = document.getElementById('timer');
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerEl.textContent = `Time: ${timeLeft}s`;

  const interval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;

    // Red flash when 10 seconds left, and at 5,4,3,2,1 seconds
    if (timeLeft === 10 || (timeLeft <= 5 && timeLeft >= 1)) {
      document.documentElement.style.setProperty('--flash-color', 'rgba(255, 0, 0, 0.6)');
      document.body.classList.add('flash');
      setTimeout(() => {
        document.body.classList.remove('flash');
        document.body.style.backgroundColor = 'var(--gray5)';
      }, 500);
    }

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
  
  const roundModal = document.getElementById('roundModal');
  const correctEl = document.getElementById('correctAnswer');
  const closeButton = document.getElementById('closeRound');
  const resultScreenTimerEl = document.getElementById('resultScreenTimer');

  if (correctEl) correctEl.textContent = `Correct Answer: ${correctRank}`;
  if(closeButton) closeButton.style.display = 'none';
  roundModal.style.display = 'block';

  const ctx = document.getElementById('roundResultChart').getContext('2d');
  if (window.currentRoundChart) {
    window.currentRoundChart.destroy();
  }
  window.currentRoundChart = new Chart(ctx, {
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

  let resultTimeLeft = 5;
  if (resultScreenTimerEl) resultScreenTimerEl.textContent = `Next round in: ${resultTimeLeft}s`;

  const resultInterval = setInterval(() => {
    resultTimeLeft--;
    if (resultScreenTimerEl) resultScreenTimerEl.textContent = `Next round in: ${resultTimeLeft}s`;
    if (resultTimeLeft <= 0) {
      clearInterval(resultInterval);
      if(closeButton) closeButton.style.display = 'block';
      roundModal.style.display = 'none';
      if (resultScreenTimerEl) resultScreenTimerEl.textContent = '';
      socket.emit('request_next_round', { room: roomId, player_number: playerNumber, video_index: currentIndex });
    }
  }, 1000);
}

function showGameOver(guesses) {
  document.getElementById('gameOverModal').style.display = 'block';
  const resultsContainer = document.getElementById('gameOverResults');
  resultsContainer.innerHTML = ''; // Clear previous results

  // Define a mapping from rank name to image path
  const rankImagePaths = {
    'Bronze': 'images/icon_ranked_bronze.png',
    'Silver': 'images/icon_ranked_silver.png',
    'Gold': 'images/icon_ranked_gold.png',
    'Diamond': 'images/icon_ranked_diamond.png',
    'Mythic': 'images/icon_ranked_mythic.png',
    'Legendary': 'images/icon_ranked_legendary.png',
    'Masters': 'images/icon_ranked_masters.png',
    // Add any other rank names if they exist, or a default/placeholder
  };

  let resultsHtml = '<div class="game-over-summary-grid">'; // Using a div for flex/grid layout

  for (let i = 0; i < videoList.length; i++) {
    const youGuess = guesses[i] ? guesses[i][playerNumber] : 'No Guess';
    const oppPlayerNumber = playerNumber === 1 ? 2 : 1;
    const oppGuess = guesses[i] ? guesses[i][oppPlayerNumber] : 'No Guess';
    const trueRank = videoList[i].trueRank; // Get the true rank for this round

    const youGuessImgSrc = rankImagePaths[youGuess];
    const oppGuessImgSrc = rankImagePaths[oppGuess];
    const trueRankImgSrc = rankImagePaths[trueRank];

    resultsHtml += `
      <div class="round-summary-row">
        <div class="round-label">Round ${i + 1}</div>
        <div class="guess-details">
          <span class="player-label">You:</span>
          ${youGuessImgSrc ? `<img src="${youGuessImgSrc}" alt="${youGuess}" class="rank-icon-summary">` : '<span class="no-guess-text">(No Guess)</span>'}
        </div>
        <div class="guess-details">
          <span class="player-label">Opponent:</span>
          ${oppGuessImgSrc ? `<img src="${oppGuessImgSrc}" alt="${oppGuess}" class="rank-icon-summary">` : '<span class="no-guess-text">(No Guess)</span>'}
        </div>
        <div class="guess-details correct-answer-summary">
          <span class="player-label">Correct:</span>
          ${trueRankImgSrc ? `<img src="${trueRankImgSrc}" alt="${trueRank}" class="rank-icon-summary">` : '<span class="no-guess-text">(Unknown)</span>'}
        </div>
      </div>
    `;
  }
  resultsHtml += '</div>'; // Close game-over-summary-grid
  resultsContainer.innerHTML = resultsHtml;

  document.getElementById('closeGameOver').onclick = () => {
    socket.emit('leave_room', { room: roomId });
    window.location.href = 'brawldle.html';
  };
} 