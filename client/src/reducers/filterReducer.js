let initialState = {
    direction: true,
    name: true,
    source: false,
    genre: false,
};

export default function filterReducer(state = initialState, action) {
    switch(action.type) {
        case "FILTER_DIRECTION":
            return {
                ...state,
                direction: action.payload
            };
        case "FILTER_NAME_OR_RATING":
            return {
                ...state,
                name: action.payload
            };
        case "FILTER_BY_SOURCE":
            return {
                ...state,
                source: action.payload
            };
        case "FILTER_BY_GENRE":
            return {
                ...state,
                genre: action.payload
            };
        default:
            return state
    }
}