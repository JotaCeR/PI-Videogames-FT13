export function getVideogames() {
    return function (dispatch) {
        return fetch(`http://localhost:3001/videogames`)
        .then(response => response.json())
        .then(json => dispatch({type: 'GET_GAMES', payload: json}))
        .catch(e => console.log(e));
    }
}

export function getVideogame(searchedGame) {
    return function (dispatch) {
        return fetch(`https://localhost:3001/videogames?name=${searchedGame}`)
        .then(response => response.json())
        .then(json => dispatch({type: 'GET_GAME', payload: json}))
        .catch(e => console.log(e));
    }
}

export function getDetailedGame(gameId) {
    return function (dispatch) {
        return fetch(`https://localhost:3001/videogame/${gameId}`)
        .then(response => response.json())
        .then(json => dispatch({type: 'GET_DETAILS', payload: json}))
        .catch(e => console.log(e));
    }
}