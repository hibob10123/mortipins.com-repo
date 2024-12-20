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
    { link: "https://www.youtube.com/embed/B79hw1wCoS0", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/L99aHF0C_8c", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/MH1YnfTBF6I", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/hk7BTKrno0k", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/oGil41Nt7ZM", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/gvdweIU9m3c", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/0gwz5qJs4UA", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/OAP4UgMWhjI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/JZ3faitUC2Q", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/nL7X9SIAobE", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/9vxfjvEUW7o", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/8604H206UyA", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/w_RTZjaMcxk", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/9o5Vjnm--YE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/ZTYelONAofo", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/X0oOGzNN-oc", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/5ArRe0CKkbo", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/iw_dGyd3ZVo", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/x6HeUojc8OA", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/zDx6lBZSwG0", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/-Jo_v4kkYQA", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Ivp5MWRgyuA", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/5_wOpRsc1tk", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/2SyxfBHgGJQ", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/oeoF_gqheHE", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/kQRrHBP-veo", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/qcio5lZXXL8", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/OHz4bg2IV_8", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/xtbva7378mk", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/K8iLdlhpTJE", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/dYkxdNXdmhU", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/BM9ctZcl758", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/vkoBgA5OT50", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/sRVYXzejenc", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/2_syHedgZGI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/tvCtPuxuE90", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/436S1Obe7qQ", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/AgOj9GDoI5Q", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/n-zsfJtEpmM", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/x6HeUojc8OA", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/0T7B9PjxBJI", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/Bd_rf3Vev0w", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/UIs5rvLqBXI", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/BLoEXkfWDgI", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/ShOdTN0tDm4", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/hk7BTKrno0k", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/0AXVCmfWtuE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/0AXVCmfWtuE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/0AXVCmfWtuE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/I4yUuEng6Ss", trueRank: "Bronze", guesses: [] },
    { link: "https://www.youtube.com/embed/sXZnxoWWPxI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/mA98NO-AiQA", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/SWzwJfpey34", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/dHyq-PiGeJQ", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/orSXtoUKVKo", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/attachments", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/QJwzaKrJK3w", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/O8Ve9b2TjYM", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/nB-_mrAFMqU", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/xh_mCSahmHQ", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/7EvMCC1AaJI", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/XDSRRgop7Ck", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/7eEVqPa5rXQ", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/yGwzCN1P0SI", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/hyEI30VzoE4", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/AjLK0D2U5yw", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/VbybAv97zl4", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/oFmhq-RFMDg", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/tMVv4xepwOM", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/WTor8aq6EUs", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/guest-login", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/LCWislFwdw0", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/Tz8OSB_8Kkc", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/sRK5yKvduXw", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Hx12w1DlWEE", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/AH0aCSX2Z0Y", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/E5Ixj-Nl9fg", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/8wQDwAW7v6E", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/MkO0PU0iMD4", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/m8zJRLVOLbs", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/C-5TcH8vh8U", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/-HRZ_0x35d4", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/UEMLZ_2Vs1g", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/CXxg4B3wCDc", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/UzlUp_T_048", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/_KXxTGwEydA", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/nRSjsMQNOus", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/U9YvpRO0wcA", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/1prdzrHmTAa", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/25INMcWVZLI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/1ZxSxc5eSfk", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/EeOyEOhkNBc", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/AOUYD6Tu-us", trueRank: "Diamond", guesses: [] },
];

const videoDailyNumber = 69;
const videoLinksDaily = [
    videoLinks[videoDailyNumber],
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
    videoLinks[currentVideoIndex].guesses.push(selectedRankNameRankName);
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
    /*
    const lastGuessDate = localStorage.getItem('lastGuessDate');
    const today = new Date().toISOString().split('T')[0];

    return lastGuessDate !== today;
    */
   return true;
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
    if (selectedRankName === null) {
        console.log('No rank selected');
        return;
    }

    const modal = document.getElementById("rankModal");
    const modalText = document.getElementById("modalText");
    const trueRank = videoLinks[currentVideoIndex].trueRank;
    modalText.innerHTML = `
        <p>You guessed: ${selectedRankName}</p>
        <p>True Rank: ${trueRank}</p>
        <canvas id="guessDistributionChart" width="400" height="400"></canvas>
    `;
    modal.style.display = "block";

    console.log('Submitting guess:', {
        video_id: videoLinks[videoDailyNumber].link,
        guess: selectedRankName
    });

    fetch('https://solitary-star-3b20.caoalexander9-25f.workers.dev/api/guess', { 
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
        showGuessDistribution();

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
        const response = await fetch('https://solitary-star-3b20.caoalexander9-25f.workers.dev/api/guess-distribution');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched guess distribution:', data);
        return data;
    } catch (error) {
        console.error('Error fetching guess distribution:', error);
    }
}

async function showGuessDistribution() {
    const data = await fetchGuessDistribution();
    if (data) {
        const rankNames = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Mythic', 'Legendary', 'Masters'];
        const counts = rankNames.map(rank => {
            return data[0][rank] || 0;
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
                },
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
}

if (typeof Chart !== 'undefined') {
    console.log('Chart.js is loaded');
} else {
    console.error('Chart.js is not loaded');
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


