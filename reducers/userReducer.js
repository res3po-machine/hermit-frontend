import {
    USER_LOGIN_PENDING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,

    USER_SIGNUP_PENDING,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAILED
} from '../actions/userActions'

let initialState = {
    isLoading: false,
    user: {},
    showLoginError: false,
    showSignupError: false
}

export default (state=initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_PENDING:
            return {...state, isLoading: true}
        case USER_LOGIN_SUCCESS:
            return {...state, isLoading: false, user: action.payload, showLoginError: false}
        case USER_LOGIN_FAILED:
            return {...state, isLoading: false, showLoginError: true}
        default:
            return state;
    }
}