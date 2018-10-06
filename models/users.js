import axios from 'axios'

const BASE_URL = 'https://protected-shelf-23735.herokuapp.com/api'

export const login = async ({ email, password }) => {
    let response = await axios.post(`${BASE_URL}/users/login`, { email, password })
    return response
}

export const signup = async ({ firstName, lastName, email, username, password, proff }) => {
    let response = await axios.post(`${BASE_URL}/users/signup`, {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password,
        proff
    })
    return response
}

export const getUserData = async ({ id, token }) => {
    let response = await axios.get(`${BASE_URL}/users/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return response
}