document.addEventListener('DOMContentLoaded', function () {
    const allowedIp = '1';
    const mainContent = document.getElementById('mainContent');
    const forbiddenMessage = document.getElementById('forbiddenMessage');

    async function checkAccess() {
        try {
            const statusResponse = await fetch('status.txt');
            const status = await statusResponse.text();

            if (status.trim() === 'onbreak') {
                mainContent.style.display = 'block';
            } else if (status.trim() === 'notbreak') {
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                const data = await ipResponse.json();
                
                if (data.ip === allowedIp) {
                    mainContent.style.display = 'block';
                } else {
                    forbiddenMessage.style.display = 'block';
                }
            } else {
                forbiddenMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error fetching status or IP information:', error);
            forbiddenMessage.style.display = 'block';
        }
    }

    checkAccess();

    function shuffleColumns() {
        const container = document.getElementById('movieRow');
        const columns = Array.from(container.getElementsByClassName('column'));

        // Shuffle array
        for (let i = columns.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [columns[i], columns[j]] = [columns[j], columns[i]];
        }

        // Append shuffled columns back to container
        columns.forEach(column => container.appendChild(column));
    }

    shuffleColumns();

    const showMoreButton = document.getElementById('showMoreButton');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    let moviesToShow = 9;

    // Show more movies when "Show More" button is clicked
    showMoreButton.addEventListener('click', () => {
        moviesToShow += 9;
        showMovies();
    });

    // Search movies based on input value when Enter key is pressed
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchButton.click();
        }
    });

    // Search movies based on input value
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        filterMoviesBySearch(searchTerm);
    });

    function showMovies() {
        const columns = document.querySelectorAll('.column');
        columns.forEach((column, index) => {
            if (index < moviesToShow) {
                column.style.display = 'block';
            } else {
                column.style.display = 'none';
            }
        });

        // Show or hide "Show More" button based on number of movies displayed
        if (moviesToShow >= columns.length) {
            showMoreButton.style.display = 'none';
        } else {
            showMoreButton.style.display = 'inline-block';
        }
    }

    function filterMoviesBySearch(searchTerm) {
        const columns = document.querySelectorAll('.column');
        let visibleMovies = 0;
        columns.forEach(column => {
            const title = column.querySelector('.movie-title').textContent.trim().toLowerCase();
            const description = column.querySelector('.movie-description') ? column.querySelector('.movie-description').textContent.trim().toLowerCase() : '';
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                column.style.display = 'block';
                visibleMovies++;
            } else {
                column.style.display = 'none';
            }
        });

        // Adjust moviesToShow and display "Show More" button if necessary
        moviesToShow = Math.min(9, visibleMovies);
        showMovies();
    }

    // Initial display of movies
    showMovies();
});
