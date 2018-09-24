import axios from 'axios'
import { AsyncStorage } from 'react-native'

export const USER_LOGIN_PENDING = 'USER_LOGIN_PENDING'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'

export const USER_LOGOUT = 'USER_LOGOUT'

const BASE_URL = 'https://protected-shelf-23735.herokuapp.com/api'

export const userLogin = ({ email, password }) => {
    return async (dispatch) => {
        try {
            console.log('one')
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
            console.log(user)
            // saveToken(response);
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

const saveToken = async ({token}) => {
    try {
        await AsyncStorage.setItem('hermit-token', JSON.stringify(token))
    } catch (e) {
        console.log(e)
    }
}