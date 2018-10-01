import {
    USER_LOGIN_PENDING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_SIGNUP_PENDING,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAILED,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    USER_LOGOUT
} from '../actions/userActions'

let initialState = {
    isLoading: false,
    userLoading: false,
    user: {},
    showLoginError: false,
    showSignupError: false,
    error: null
}

export default (state=initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_PENDING:
            return {...state, isLoading: true}
        case USER_LOGIN_SUCCESS:
            return {...state, isLoading: false, user: action.payload, showLoginError: false}
        case USER_LOGIN_FAILED:
            return {...state, isLoading: false, showLoginError: true, error: action.payload}
        case USER_SIGNUP_PENDING:
            return {...state, isLoading: true}
        case USER_SIGNUP_SUCCESS:
            return {...state, isLoading: false, user: action.payload, showSignupError: false}
        case USER_SIGNUP_FAILED:
            return {...state, isLoading: false, showSignupError: true, error: action.payload}
        case GET_USER:
            return {...state, userLoading: true}
        case GET_USER_SUCCESS:
            return {...state, userLoading: false, user: action.payload}
        case GET_USER_FAILURE:
            return {...state, userLoading: false, error: action.payload}
        case USER_LOGOUT:
            return {...state, user: {}}
        default:
            return state;
    }
}