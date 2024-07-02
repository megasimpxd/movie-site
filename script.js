document.addEventListener('DOMContentLoaded', function () {
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
