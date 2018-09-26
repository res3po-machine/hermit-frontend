import {
    TRAIL_SEARCH_PENDING,
    TRAIL_SEARCH_SUCCESS,
    TRAIL_SEARCH_FAILURE,
    LOAD_MORE,
    BUZZ_PENDING,
    BUZZ_SUCCESS,
    BUZZ_SEARCH_FAILURE
} from '../actions/trailActions'

let initialState = {
    isLoading: false,
    buzzLoading: false,
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
        case BUZZ_PENDING:
            return {...state, buzzLoading: true}
        case BUZZ_SUCCESS:
            return {...state, buzzLoading: false, data: action.payload}
        case BUZZ_SEARCH_FAILURE:
            return {...state, buzzLoading: false, error: action.payload}
        default:
            return state
    }
}