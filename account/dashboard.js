window.addEventListener('load', async function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('https://mortipins-dashboard.imenkei64.workers.dev/verify', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
            return;
        }

        const data = await response.json();
        
        document.querySelector('h2').textContent = `Welcome ${data.username}!`;
        document.getElementById('points-display').textContent = `Points: ${data.points}`;

        await loadLeaderboard();

    } catch (error) {
        console.error('Error verifying token:', error);
    }
});

document.getElementById('logoutButton').addEventListener('click', async function() {
    const token = localStorage.getItem('token');
    
    try {
        await fetch('https://mortipins-dashboard.imenkei64.workers.dev/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error during logout:', error);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = 'signin.html';
});

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');
  
    if (token) {
        const response = await fetch("https://mortipins-dashboard.imenkei64.workers.dev/get-points", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });
      
        const data = await response.json();

        if (data.points !== undefined) {
            document.getElementById("points").innerText = `Your Points: ${data.points}`;
        } else {
            alert("Could not fetch points.");
        }
    } else {
        window.location.href = "/signin.html";
    }
});
