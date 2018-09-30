import {
    GET_USER_FAVS,
    GET_USER_FAVS_SUCCESS,
    GET_USER_FAVS_FAILURE,
    FAV_TRAIL_PENDING,
    FAV_TRAIL_SUCCESS,
    FAV_TRAIL_FAILURE,
    UNFAV_TRAIL_PENDING,
    UNFAV_TRAIL_SUCCESS,
    UNFAV_TRAIL_FAILURE
} from '../actions/favActions'

let initialState = {
    isLoading: false,
    favs: [],
    error: null
}

export default (state=initialState, action) => {
    switch(action.type) {
        case GET_USER_FAVS:
            return {...state, isLoading: true}
        case GET_USER_FAVS_SUCCESS:
            return {...state, isLoading: false, favs: action.payload}
        case GET_USER_FAVS_FAILURE:
            return {...state, isLoading: false, error: action.payload}
        case FAV_TRAIL_PENDING:
            return {...state, isLoading: true}
        case FAV_TRAIL_SUCCESS:
            return {...state, isLoading: false, favs: state.favs.concat([action.payload])}
        case FAV_TRAIL_FAILURE:
            return {...state, isLoading: false, error: action.payload}
        case UNFAV_TRAIL_PENDING:
            return {...state, isLoading: true}
        case UNFAV_TRAIL_SUCCESS:
            return {...state, isLoading: false, favs: state.favs.filter(fav => fav.trail_id !== action.payload)}
        case UNFAV_TRAIL_FAILURE:
            return {...state, isLoading: false, error: action.payload}
        default:
            return state
    }
}