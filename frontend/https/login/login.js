document.addEventListener('DOMContentLoaded', function () {
    const playFabSettings = {
        titleId: '48127'
    };

    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the default form submission

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        loginUser(username, password);
    });

    async function loginUser(username, password) {
        try {
            const response = await fetch(`https://${playFabSettings.titleId}.playfabapi.com/Client/LoginWithPlayFab`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-PlayFabSDK': 'JavascriptSDK-1.0.0'
                },
                body: JSON.stringify({
                    Username: username,
                    Password: password,
                    TitleId: playFabSettings.titleId
                })
            });

            const result = await response.json();

            if (response.ok && result.data) {
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = result.errorMessage || 'Invalid username or password';
                errorMessage.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error during login:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
            errorMessage.classList.remove('hidden');
        }
    }
});
