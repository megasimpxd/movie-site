document.addEventListener('DOMContentLoaded', function () {
    // Replace with your PlayFab title ID
    const playFabTitleId = '48127';

    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('error-message');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent default form submission

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Register the user with PlayFab
        registerUser(username, email, password);
    });

    async function registerUser(username, email, password) {
        const requestPayload = {
            TitleId: playFabTitleId,
            Username: username,
            Email: email,
            Password: password,
            RequireBothUsernameAndEmail: true
        };

        try {
            const response = await fetch(`https://${playFabTitleId}.playfabapi.com/Client/RegisterPlayFabUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestPayload)
            });

            const result = await response.json();

            if (response.ok) {
                // Registration successful, redirect to login page
                window.location.href = 'index.html';
            } else {
                // Show error message
                errorMessage.textContent = result.errorMessage || "Registration failed. Please try again.";
                errorMessage.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            errorMessage.textContent = "An error occurred. Please try again.";
            errorMessage.classList.remove('hidden');
        }
    }
});
