document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = '';

    if (password.length < 8) {
        errorMessage.textContent = 'Password must be at least 8 characters long';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address';
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match';
        return;
    }

    try {
        const response = await fetch('https://mortipins-dashboard.imenkei64.workers.dev/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username, 
                email,
                password 
            }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);
            window.location.href = 'dashboard.html';
        } else {
            errorMessage.textContent = data.message || 'Error creating account';
        }
    } catch (error) {
        errorMessage.textContent = 'Network error. Please try again.';
        console.error('Signup error:', error);
    }
});
