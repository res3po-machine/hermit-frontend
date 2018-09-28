import {
    COMMENTS_LOADING,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAIL,
    COMMENT_POSTING,
    COMMENT_POST_SUCCESS,
    COMMENT_POST_FAILED,
    COMMENT_SELECT,
    COMMENT_UPDATE,
    COMMENT_UPDATE_SUCCESS,
    COMMENT_UPDATE_FAILED,
    DELETE_COMMENT,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
} from '../actions/commentActions'

let initialState = {
    isLoading: false,
    postLoading: false,
    comments: [],
    error: null,
    selected: null
}

function commentReducer (state=initialState, action) {
    switch (action.type) {
        case COMMENTS_LOADING:
            return {...state, isLoading: true}
        case GET_COMMENTS_SUCCESS:
            return {...state, isLoading: false, comments: action.payload}
        case GET_COMMENTS_FAIL:
            return {...state, isLoading: false, error: action.payload}
        case COMMENT_POSTING:
            return {...state, postLoading: true}
        case COMMENT_POST_SUCCESS:
            return {...state, postLoading: false}
        case COMMENT_POST_FAILED:
            return {...state, postLoading: false, error: action.payload}
        case COMMENT_SELECT:
            return {...state, selected: action.payload}
        case COMMENT_UPDATE:
            return {...state, isLoading: true}
        case COMMENT_UPDATE_SUCCESS:
            return {...state, isLoading: false}
        case COMMENT_UPDATE_FAILED:
            return {...state, isLoading: false, error: action.payload}
        case DELETE_COMMENT:
            return {...state, isLoading: true}
        case DELETE_COMMENT_SUCCESS:
            return {...state, isLoading: false}
        case DELETE_COMMENT_FAIL:
            return {...state, isLoading: false, error: action.payload}
        default:
            return state
    }
}

export default commentReducer