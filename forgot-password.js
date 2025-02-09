document.getElementById('resetForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('https://mortipins-dashboard.imenkei64.workers.dev/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'API is down. Please make a new account or wait for the API to be working again.';
        } else {
            errorMessage.textContent = data.message || 'Error resetting password';
        }
    } catch (error) {
        errorMessage.textContent = 'Network error. Please try again.';
    }
});