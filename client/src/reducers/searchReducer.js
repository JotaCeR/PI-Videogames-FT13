let initialState = {
    videogames: [],
    videogame: [],
    gameDetail: {}
};

export default function searchReducer (state = initialState, action) {
    let pagination = state.videogames; 
    
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
        default:
            return state
    }
}