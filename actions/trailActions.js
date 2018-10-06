import { fetchTrails, buzz } from '../models/trails'

export const TRAIL_SEARCH_PENDING = 'TRAIL_SEARCH_PENDING'
export const TRAIL_SEARCH_SUCCESS = 'TRAIL_SEARCH_SUCCESS'
export const TRAIL_SEARCH_FAILURE = 'TRAIL_SEARCH_FAILURE'
export const LOAD_MORE = 'LOAD_MORE'
export const RESET_LOAD = 'RESET_LOAD'

export const BUZZ_PENDING = 'BUZZ_PENDING'
export const BUZZ_SUCCESS = 'BUZZ_SUCCESS'
export const BUZZ_SEARCH_FAILURE = 'BUZZ_SEARCH_FAILURE'

export const TRAIL_SELECT = 'TRAIL_SELECT'
export const SWITCH_VIEW = 'SWITCH_VIEW'

export const DATE_CHANGE = 'DATE_CHANGE'

export const CHANGE_SORT = 'CHANGE_SORT'

export const CHANGE_MIN = 'CHANGE_MIN'
export const CHANGE_MAX = 'CHANGE_MAX'

export const getTrails = (searchTerms) => {
    return async (dispatch) => {
        try {
            dispatch({type: TRAIL_SEARCH_PENDING})
            let response = await fetchTrails(searchTerms)
            dispatch({type: TRAIL_SEARCH_SUCCESS, payload: response.data.trails})
        } catch (e) {
            dispatch({type: TRAIL_SEARCH_FAILURE, payload: e})
        }
    }
}

export const selectOneTrail = (id) => {
    return (dispatch) => {
        dispatch({type: TRAIL_SELECT, payload: id})
    }
}

export const switchView = (index) => {
    return (dispatch) => {
        dispatch({type: SWITCH_VIEW, payload: index === 0 ? 1 : 0})
    }
}

export const getBuzz = (trail, date) => {
    return async (dispatch) => {
        try {
            dispatch({type: BUZZ_PENDING})
            let response = await buzz(trail, date)
            // This statement handles when there have been too little searches to retreive data.
            if (typeof response.data.data === 'object') {
                dispatch({type: BUZZ_SUCCESS, payload: response.data.data[0]})
            } else {
                dispatch({type: BUZZ_SUCCESS, payload: response.data.data})
            }
        } catch (e) {
            dispatch({type: BUZZ_SEARCH_FAILURE, payload: e})
        }
    }
}

export const dateChange = (date) => {
    return (dispatch) => {
        const clickDate = new Date(date)
        // Date input is always a day behind for some reason, so add one.
        clickDate.setDate(clickDate.getDate() + 1)
        dispatch({type: DATE_CHANGE, payload: clickDate})
    }
}

export const moreTrails = () => {
    return (dispatch) => {
        dispatch({type: LOAD_MORE})
    }
}

export const resetLoad = () => {
    return (dispatch) => {
        dispatch({type: RESET_LOAD})
    }
}

export const changeMin = (value) => {
    return (dispatch) => {
        dispatch({type: CHANGE_MIN, payload: value})
    }
}

export const changeMax = (value) => {
    return (dispatch) => {
        dispatch({type: CHANGE_MAX, payload: value})
    }
}

export const changeSort = (category) => {
    return (dispatch) => {
        switch (category) {
            case "None":
                dispatch({type: CHANGE_SORT, payload: {type: category, function: sortNone} })
                return
            case "Difficulty Asc.":
                dispatch({type: CHANGE_SORT, payload: {type: category, function: sortDiffAsc} })
                return
            case "Difficulty Desc.":
                dispatch({type: CHANGE_SORT, payload: {type: category, function: sortDiffDesc} })
                return
            case "Rating Asc.":
                dispatch({type: CHANGE_SORT, payload: {type: category, function: sortRatingAsc} })
                return
            case "Rating Desc.":
                dispatch({type: CHANGE_SORT, payload: {type: category, function: sortRatingDesc} })
                return
            case "Length Asc.":
                dispatch({type: CHANGE_SORT, payload: {type: category, function: sortLengthAsc} })
                return
            case "Length Desc.":
                dispatch({type: CHANGE_SORT, payload: {type: category, function: sortLengthDesc} })
                return
            default:
                dispatch({type: CHANGE_SORT, payload: {type: "None", function: sortNone} })
                return
        }
    }
}

// Sorting Functions

const sortNone = (data) => {
    return data
}
const sortDiffAsc = (data) => {
    const newData = data.map(item => {
        if (item.difficulty === 'green') {
            item['sort'] = 0
            return item
        }
        if (item.difficulty === 'greenBlue') {
            item['sort'] = 1
            return item
        }
        if (item.difficulty === 'blue') {
            item['sort'] = 2
            return item
        }
        if (item.difficulty === 'blueBlack') {
            item['sort'] = 3
            return item
        }
        if (item.difficulty === 'black') {
            item['sort'] = 4
            return item
        }
    })
    return newData.sort((a,b) => {
        return a.sort - b.sort
    })
}

const sortDiffDesc = (data) => {
    const newData = data.map(item => {
        if (item.difficulty === 'green') {
            item['sort'] = 0
            return item
        }
        if (item.difficulty === 'greenBlue') {
            item['sort'] = 1
            return item
        }
        if (item.difficulty === 'blue') {
            item['sort'] = 2
            return item
        }
        if (item.difficulty === 'blueBlack') {
            item['sort'] = 3
            return item
        }
        if (item.difficulty === 'black') {
            item['sort'] = 4
            return item
        }
    })
    return newData.sort((a,b) => {
        return b.sort - a.sort
    })
}

const sortRatingAsc = (data) => {
    let newData = [ ...data ]
    return newData.sort((a,b) => {
        return a.stars - b.stars
    })
}

const sortRatingDesc = (data) => {
    let newData = [ ...data ]
    return newData.sort((a,b) => {
        return b.stars - a.stars
    })
}

const sortLengthAsc = (data) => {
    let newData = [ ...data ]
    return newData.sort((a,b) => {
        return a.length - b.length
    })
}

const sortLengthDesc = (data) => {
    let newData = [ ...data ]
    return newData.sort((a,b) => {
        return b.length - a.length
    })
}