let initialState = {
    page: 0
}

export default function paginationReducer (state = initialState, action) {
    let valueNow = state.page;

    switch (action.type) {
        case "NEXT_PAGE":
            return {
                ...state,
                page: valueNow + 1
            };
        case "PREV_PAGE":
            if (valueNow === 0) {
                return state
            } else {
                return {
                    ...state,
                    page: valueNow - 1
                };
            }
        case "OVER_PAGE":
            return {
                ...state,
                page: action.payload
            }
        default:
            return state
    }
}