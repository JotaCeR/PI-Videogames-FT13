let initialState = {
    videogames: [],
    videogame: [],
    gameDetail: {},
    genres: []
};

export default function searchReducer (state = initialState, action) {
    
    switch (action.type) {
        case "GET_GAMES":
            return {
                ...state,
                videogames: action.payload
            };
        case "GET_GAME":
            return {
                ...state,
                videogame: action.payload
            };
        case "GET_DETAILS":
            return {
                ...state,
                gameDetail: action.payload
            };
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }
        default:
            return state
    }
}