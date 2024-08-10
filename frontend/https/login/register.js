document.addEventListener('DOMContentLoaded', function () {
    // Initialize PlayFab
    const playFabSettings = {
        titleId: '48127'  // Replace with your actual title ID
    };

    PlayFab.settings.titleId = playFabSettings.titleId;

    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('error-message');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent default form submission

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Register new user
        registerUser(username, email, password);
    });

    function registerUser(username, email, password) {
        const request = {
            Username: username,
            Email: email,
            Password: password
        };

        PlayFab.ClientApi.RegisterPlayFabUser(request, function (result, error) {
            if (result) {
                // Registration successful, redirect or show success message
                window.location.href = 'index.html'; // Redirect to login page
            } else {
                // Show error message
                errorMessage.classList.remove('hidden');
            }
        });
    }
});
