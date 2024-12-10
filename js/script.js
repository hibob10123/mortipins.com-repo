function on() {
    // display overlay
    const turnOn = document.getElementById("overlay");
    turnOn.style.display = "block";
    // turn off vertical scroll
    const overflow = document.querySelector("body");
    overflow.style.overflow = "hidden";
}

function off() {
    // hide overlay
    const turnOff = document.getElementById("overlay");
    turnOff.style.display = "none";
    // turn on vertical scroll
    const overflow = document.querySelector("body");
    overflow.style.overflow = "auto";
}

const videoLinks = [
    { link: "https://www.youtube.com/embed/MH1YnfTBF6I", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/hk7BTKrno0k", trueRank: "Masters", guesses: []  },
    { link: "https://www.youtube.com/embed/oGil41Nt7ZM", trueRank: "Diamond", guesses: []  },
    { link: "https://www.youtube.com/embed/gvdweIU9m3c", trueRank: "Mythic", guesses: []  },
    { link: "https://www.youtube.com/embed/0gwz5qJs4UA", trueRank: "Gold", guesses: []  },
    { link: "https://www.youtube.com/embed/ITTXG36n7EM", trueRank: "Diamond", guesses: []  },
    { link: "https://www.youtube.com/embed/NKVrh_qPZw8", trueRank: "Diamond", guesses: []  },
    { link: "https://www.youtube.com/embed/BjDtf5DlTmA", trueRank: "Diamond", guesses: []  },
    { link: "https://www.youtube.com/embed/nL7X9SIAobE", trueRank: "Diamond", guesses: []  }
];

const videoLinksDaily = [
    { link: "https://www.youtube.com/embed/MH1YnfTBF6I", trueRank: "Diamond", guesses: [] },
]

const rankNames = ["Bronze", "Silver", "Gold", "Diamond", "Mythic", "Legendary", "Masters"];

let currentVideoIndex = 0;
let selectedRank = null;
let selectedRankName = null;
let streak = 0;

function getRandomVideo() {
    currentVideoIndex = Math.floor(Math.random() * videoLinks.length);
    const videoFrame = document.getElementById("videoFrame");
    const rankDisplay = document.getElementById("rankDisplay");
    videoFrame.src = videoLinks[currentVideoIndex].link;
    rankDisplay.textContent = `True Rank: ${videoLinks[currentVideoIndex].trueRank}`;
}

function getVideoDaily() {
    currentVideoIndex = Math.floor(Math.random() * videoLinksDaily.length);
    const videoFrame = document.getElementById("videoFrame");
    const rankDisplay = document.getElementById("rankDisplay");
    videoFrame.src = videoLinksDaily[currentVideoIndex].link;
    rankDisplay.textContent = `True Rank: ${videoLinksDaily[currentVideoIndex].trueRank}`;
}

function selectRank(rank) {
    selectedRank = rank;
    selectedRankName = rankNames[rank- 1];
    buttons = document.querySelectorAll('.rank-buttons img');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
    buttons[rank - 1].classList.add('selected');
    // Record the guess
    videoLinks[currentVideoIndex].guesses.push(guessedRankName);
}

function submitGuess() {
    if (selectedRankName === null) {
        return;
    }
    const modal = document.getElementById("rankModal");
    const modalText = document.getElementById("modalText");
    const trueRank = videoLinks[currentVideoIndex].trueRank;
    modalText.innerHTML = `
        <p>You guessed: ${selectedRankName}</p>
        <p>True Rank: ${trueRank}</p>
    `;
    modal.style.display = "block";

    if (selectedRankName === trueRank) {
        streak++;
    } else {
        streak = 0;
    }
    updateStreakDisplay();

    selectedRankName = null;
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
    getRandomVideo();
}

function updateStreakDisplay() {
    const streakElement = document.getElementById("streak");
    streakElement.textContent = `Streak: ${streak}`;
}

if (typeof Chart !== 'undefined') {
    console.log('Chart.js is loaded');
} else {
    console.error('Chart.js is not loaded');
}

function canSubmitGuess() {
    const lastGuessDate = localStorage.getItem('lastGuessDate');
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    return lastGuessDate !== today;
}

function updateSubmitButton() {
    const submitButton = document.getElementById("submitButton");
    if (!canSubmitGuess()) {
        submitButton.textContent = "Already Submitted";
        submitButton.classList.add("disabled");
        submitButton.onclick = null; // Disable the click event
    } else {
        submitButton.textContent = "Submit Guess";
        submitButton.classList.remove("disabled");
        submitButton.onclick = submitGuessDaily; // Enable the click event
    }
}


function submitGuessDaily() {
    if (!canSubmitGuess()) {
        return;
    }

    if (selectedRankName === null) {
        console.log('No rank selected');
        return;
    }

    const modal = document.getElementById("rankModal");
    const modalText = document.getElementById("modalText");
    const trueRank = videoLinksDaily[currentVideoIndex].trueRank;
    modalText.innerHTML = `
        <p>You guessed: ${selectedRankName}</p>
        <p>True Rank: ${trueRank}</p>
        <canvas id="guessDistributionChart" width="400" height="400"></canvas>
    `;
    modal.style.display = "block";

    // Log the guess being sent to the backend
    console.log('Submitting guess:', {
        video_id: currentVideoIndex,
        guess: selectedRankName
    });

    // Send guess to the backend
    fetch('https://mortipins.com:5000/api/guess', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            video_id: currentVideoIndex,
            guess: selectedRankName
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        console.log('Guess submitted:', data);
        showGuessDistribution(); // Show the guess distribution chart after the modal is displayed

        // Store the current date as the last guess date
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('lastGuessDate', today);
        updateSubmitButton();
    }).catch(error => {
        console.error('Error:', error);
    });

    selectedRankName = null;
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
}

async function fetchGuessDistribution() {
    try {
        const response = await fetch('https://mortipins.com:5000/api/guess-distribution');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching guess distribution:', error);
    }
}

async function showGuessDistribution() {
    const data = await fetchGuessDistribution();
    if (data) {

        const counts = rankNames.map(rank => {
            const found = data.find(item => item.guess === rank);
            return found ? found.count : 0;
        });

        const ctx = document.getElementById('guessDistributionChart').getContext('2d');
        console.log('Rendering chart with data:', { rankNames, counts });
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: rankNames,
                datasets: [{
                    label: 'Guess Distribution',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}


function closeModal() {
    const modal = document.getElementById("rankModal");
    modal.style.display = "none";

     // Apply fade-out animation
     modal.style.animation = "fadeOut 0.3s ease-out forwards";
     modal.querySelector('.modal-content').style.animation = "slideOut 0.3s ease-out forwards";
     overlay.style.animation = "fadeOut 0.3s ease-out forwards";
 
     // Wait for the animation to complete before hiding the modal and overlay
     setTimeout(() => {
         modal.style.display = "none";
         overlay.style.display = "none";
         modal.style.animation = ""; // Reset animation
         modal.querySelector('.modal-content').style.animation = ""; // Reset animation
         overlay.style.animation = ""; // Reset animation
     }, 300);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');

    // Get the current time
    const now = new Date();

    // Set the reset time to 12 PM (noon) of the current day
    let resetTime = new Date(now);
    resetTime.setHours(12, 0, 0, 0); // 12 PM (noon) Standard Time

    // If it's already past 12 PM, set the reset time to 12 PM the next day
    if (now >= resetTime) {
      resetTime.setDate(resetTime.getDate() + 1);
    }

    // Calculate the time remaining until the next reset
    const timeRemaining = resetTime - now;

    if (timeRemaining <= 0) {
      onReset();
      resetTime.setDate(resetTime.getDate() + 1); // Update to the next day's reset
    }

    // Convert remaining time to hours, minutes, seconds
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Display the countdown
    timerElement.textContent = `Time until reset: ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  }

document.addEventListener("DOMContentLoaded", () => { 
    if (document.getElementById("brawldle-daily")) {
        getVideoDaily();
    }
    else {
        getRandomVideo();
    }
});
document.addEventListener("DOMContentLoaded", updateSubmitButton);

updateTimer();
setInterval(updateTimer, 1000);



// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
    const modal = document.getElementById("rankModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


