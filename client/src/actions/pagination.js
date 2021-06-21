export function nextPage() {
    return {
        type: 'NEXT_PAGE'
    }
}

export function prevPage() {
    return {
        type: 'PREV_PAGE'
    }
}

export function overPage(page) {
    return {
        type: 'OVER_PAGE',
        payload: page
    }
}