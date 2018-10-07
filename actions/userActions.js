import { AsyncStorage } from 'react-native'

import { login, signup, getUserData } from '../models/users'

export const USER_LOGIN_PENDING = 'USER_LOGIN_PENDING'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'

export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILURE = 'GET_USER_FAILURE'

export const USER_LOGOUT = 'USER_LOGOUT'

export const userLogin = (credentials) => {
    return async (dispatch) => {
        try {
            dispatch({type: USER_LOGIN_PENDING})

            let response = await login(credentials)
            await saveToken(response.data);
            let user = await getUserData(response.data)

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: user.data.user
            })
        } catch (e) {
            dispatch({
                type: USER_LOGIN_FAILED,
                payload: e
            })
        }
    }
}

export const getUser = (token) => {
    return async (dispatch) => {
        try {
            dispatch({type: GET_USER})
            let user = await getUserData(token)
            dispatch({type: GET_USER_SUCCESS, payload: user.data.user})
        } catch (e) {
            dispatch({type: GET_USER_FAILURE, payload: e})
        }
    }
}

export const userSignup = (credentials) => {
    return async (dispatch) => {
        try {
            dispatch({type: USER_SIGNUP_PENDING})

            let response = await signup(credentials)

            let user = await getUserData(response.data)
            saveToken(response.data)

            dispatch({
                type: USER_SIGNUP_SUCCESS,
                payload: user.data.user
            })
        } catch (e) {
            dispatch({
                type: USER_SIGNUP_FAILED,
                payload: e
            })
        }
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        try {
            dispatch({type: USER_LOGOUT})
            await AsyncStorage.removeItem('hermitToken')
        } catch (e) {
            console.log(e)
        }
    }
}

const saveToken = async ({ token, id }) => {
    try {
        await AsyncStorage.setItem('hermitToken', JSON.stringify({token, id}))
    } catch (e) {
        console.log(e)
    }
}