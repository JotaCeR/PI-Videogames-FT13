export function filterBySource(source) {
    return {
        type: 'FILTER_BY_SOURCE',
        payload: source
    }
}

export function filterByGenres(genre) {
    return {
        type: 'FILTER_BY_GENRE',
        payload: genre
    }
}

export function filterDirection(direction) {
    return {
        type: 'FILTER_DIRECTION',
        payload: direction
    }
}

export function filterByNameOrRating(selection) {
    return {
        type: 'FILTER_NAME_OR_RATING',
        payload: selection
    }
}