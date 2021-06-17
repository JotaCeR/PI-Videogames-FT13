let initialState = {
    page: 1
}

export default function paginationReducer (state = initialState, action) {
    let currentValue = initialState.page;

    switch (action.type) {
        case "NEXT_PAGE":
            return {
                ...state,
                page: currentValue + 1
            };
        case "PREV_PAGE":
            /* if (page == 1) {
                return {
                    state
                }
            } */
            return {
                ...state,
                page: currentValue - 1
            };
        default:
            return state
    }
}