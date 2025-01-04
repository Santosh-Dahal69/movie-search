// Select DOM elements
const searchButton = document.getElementById('searchButton');
const movieInput = document.getElementById('movieInput');
const movieResults = document.getElementById('movieResults');

// Base API URL with the provided key
const API_URL = ' http://www.omdbapi.com/?i=tt3896198&apikey=758af8ab';

// Function to fetch and display movie data
async function fetchMovieData(query) {
    try {
        // Show a loading message
        movieResults.innerHTML = '<p>Loading...</p>';

        // Fetch data from the API
        const response = await fetch(`${API_URL}&s=${encodeURIComponent(query)}`);
        const data = await response.json();

        // Handle API response
        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            movieResults.innerHTML = `<p>No results found for "${query}". Please try again.</p>`;
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
        movieResults.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}

// Function to display movie data
function displayMovies(movies) {
    movieResults.innerHTML = movies.map(movie => `
        <div class="movie">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
        </div>
    `).join('');
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const query = movieInput.value.trim();
    if (query) {
        fetchMovieData(query);
    } else {
        alert('Please enter a movie name!');
    }
});
