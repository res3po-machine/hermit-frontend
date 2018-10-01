import axios from 'axios'
import { AsyncStorage } from 'react-native'

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

const BASE_URL = 'http://localhost:5000/api'

export const userLogin = ({ email, password }) => {
    return async (dispatch) => {
        try {
            // console.log('one')
            dispatch({type: USER_LOGIN_PENDING})
            console.log(email, password)
            let response = await axios.post(`${BASE_URL}/users/login`, { email, password })
            // console.log(response.data)
            // let userInfo = await response.json()
            
            let user = await axios.get(`${BASE_URL}/users/${response.data.id}`, {
                headers: {
                    authorization: `Bearer ${response.data.token}`
                }
            })
            // console.log(user)
            saveToken(response.data.token, user.data.user.id);
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
            let user = await axios.get(`${BASE_URL}/users/${token.id}`, {
                headers: {
                    authorization: `Bearer ${token.token}`
                }
            })
            dispatch({type: GET_USER_SUCCESS, payload: user.data.user})
        } catch (e) {
            dispatch({type: GET_USER_FAILURE, payload: e})
        }
    }
}

export const userSignup = ({ firstName, lastName, email, username, password, proff }) => {
    return async (dispatch) => {
        try {
            dispatch({type: USER_SIGNUP_PENDING})
            let response = await axios.post(`${BASE_URL}/users/signup`, {
                first_name: firstName,
                last_name: lastName,
                username,
                email,
                password,
                proff
            })
            let user = await axios.get(`${BASE_URL}/users/${response.data.id}`, {
                headers: {
                    authorization: `Bearer ${response.data.token}`
                }
            })
            saveToken(response.data.token)
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

const saveToken = async (token, id) => {
    try {
        // let tokenString = await JSON.stringify(token)
        // console.log('hello')
        await AsyncStorage.setItem('hermitToken', JSON.stringify({token, id}))
    } catch (e) {
        console.log(e)
    }
}