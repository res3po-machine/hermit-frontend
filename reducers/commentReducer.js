import {
    GET_BY_TRAIL,
    GET_BY_USER,
    POST_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT
} from '../actions/commentActions'

function commentReducer (state=[], action) {
    switch (action.type) {
        case GET_BY_TRAIL:
            return action.payload
        case GET_BY_USER:
            return action.payload
        case POST_COMMENT:
            return action.payload
        case UPDATE_COMMENT:
            return action.payload
        case DELETE_COMMENT:
            return action.payload
        default:
            return state
    }
}

export default commentReducer