// Desc: API calls for the frontend
const URL = "http://localhost:8081";
const endpoint = URL + "/movies";

export const fetchMovies = () => fetch(endpoint);

export const fetchMovie = (title) => fetch(`${endpoint}/${title}`);

export const createMovie = (task) => fetch(endpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
});

export const updateMovie = (title, task) => fetch(`${endpoint}/${title}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
});

export const deleteMovie = (title) => fetch(`${endpoint}/${title}`, {
    method: 'DELETE'
});

export const fetchMoviesByGenre = () => fetch('/genres');

export const fetchFilter = (qmovies) => fetch('/filter', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    params: qmovies
});
