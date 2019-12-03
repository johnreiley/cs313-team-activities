var searchResultsDiv = document.querySelector('#search-results');
var searchInput = document.querySelector('#search-input');
var searchBtn = document.querySelector('#search-btn');
var apiKey = 'f33cd13d';

searchBtn.addEventListener('click', async (e) => {
    searchBtn.disabled = true;
    if (searchInput.value != '') {
        searchResultsDiv.innerHTML = '';
        results = await searchMovieDatabase(searchInput.value);
        if (results.Search) 
            renderResults(results.Search);
        else {
            displayWarning();
        }
    }
    searchBtn.disabled = false;
})

async function searchMovieDatabase(keyword) {
    var response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`);
    var results = await response.json();
    return results;
}

async function getMovie(id) {
    var response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
    var result = await response.json();
    console.log(result);
    return result;
}

function renderResults(results) {
    results.forEach((r) => {
        var result = document.createElement('div');
        result.classList.add('card');
        result.id = r.imdbID;
        result.innerHTML = `
        <div class="card-img">
            <img class="card-img" src="${r.Poster}" alt="">
        </div>
        <div class="card-txt">${r.Title} - ${r.Year}</div>`;

        result.onclick = async function() {
            searchResultsDiv.innerHTML = '';
            var movie = await getMovie(result.id);
            renderMovie(movie);
        }

        searchResultsDiv.appendChild(result);
    })
}

function renderMovie(movie) {
    var movieDiv = document.createElement('div');
    movieDiv.classList.add('section');
    movieDiv.innerHTML = `
    <img src="${movie.Poster}"></img>
    <div>${movie.Title}</div>
    <div>${movie.Year}</div>
    <div>${movie.Rated}</div>
    <div>Plot: ${movie.Plot}</div>
    <div>Actors: ${movie.Actors}</div>`

    searchResultsDiv.appendChild(movieDiv);
}

function displayWarning() {
    var warning = document.createElement('p');
    warning.innerText = 'Too many results!  Try something a little more specific.';
    searchResultsDiv.appendChild(warning);
}