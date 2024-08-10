document.addEventListener('DOMContentLoaded', function () {
    // Initialize PlayFab
    const playFabSettings = {
        titleId: '48127'  // Replace with your actual title ID
    };

    PlayFab.settings.titleId = playFabSettings.titleId;

    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent default form submission

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Login user
        loginUser(username, password);
    });

    function loginUser(username, password) {
        const request = {
            Username: username,
            Password: password
        };

        PlayFab.ClientApi.LoginWithPlayFab(request, function (result, error) {
            if (result) {
                // Login successful, redirect or show success message
                window.location.href = '/'; // Redirect to a dashboard or main page
            } else {
                // Show error message
                errorMessage.classList.remove('hidden');
            }
        });
    }
});
