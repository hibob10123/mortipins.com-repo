document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'dashboard.html';
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (password.length < 8) {
        errorMessage.textContent = 'Password must be at least 8 characters long';
        return;
    }

    try {
        const response = await fetch('https://mortipins-dashboard.imenkei64.workers.dev/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);
            localStorage.setItem('points', data.points);

            window.location.href = 'dashboard.html';
        } else {
            errorMessage.textContent = data.message || 'Invalid username or password';
        }
    } catch (error) {
        errorMessage.textContent = 'Network error. Please try again.';
    }
});

document.querySelector('.login-container').insertAdjacentHTML(
    'beforeend',
    '<p class="signup-link">Need an account? <a href="signup.html">Sign up</a></p>'
);

document.querySelector('.login-container').insertAdjacentHTML(
    'beforeend',
    '<p class="forgot-password"><a href="forgot-password.html">Forgot Password?</a></p>'
);
