import {
    TRAIL_SEARCH_PENDING,
    TRAIL_SEARCH_SUCCESS,
    TRAIL_SEARCH_FAILURE,
    LOAD_MORE
} from '../actions/trailActions'

let initialState = {
    isLoading: false,
    data: [],
    visualMax: 10,
    error: null,
}

export default (state=initialState, action) => {
    switch (action.type) {
        case TRAIL_SEARCH_PENDING:
            return {...state, isLoading: true}
        case TRAIL_SEARCH_SUCCESS:
            return {...state, isLoading: false, data: action.payload}
        case TRAIL_SEARCH_FAILURE:
            return {...state, isLoading: false, error: action.payload}
        case LOAD_MORE:
            return {...state, visualMax: visualMax + 10}
        default:
            return state
    }
}