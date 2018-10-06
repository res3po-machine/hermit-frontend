import axios from 'axios'

const BASE_URL = 'https://protected-shelf-23735.herokuapp.com/api'

export const trailComments = async (trailID, token) => {
    let response = await axios.get(`${BASE_URL}/comments/${trailID}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

export const post = async ({body, userId, trailId, trailName}, token) => {
    let response = await axios({
        method: 'post',
        url: `${BASE_URL}/comments/`,
        headers: {
            authorization: `Bearer ${token}`
        },
        data: {
            user_id: userId,
            trail_id: trailId,
            trail_name: trailName,
            body,
            image_id: null
        }
    })
    return response
}

export const update = async (id, user_id, body, token) => {
    let response = await axios({
        method: 'patch',
        url: `${BASE_URL}/comments/${id}`,
        headers: {
            authorization: `Bearer ${token}`
        },
        data: {
            user_id,
            body
        }
    })
    return response
}

export const deleteCom = async (id, user_id, token) => {
    let response = await axios({
        method: 'delete',
        url: `${BASE_URL}/comments/${id}`,
        headers: {
            authorization: `Bearer ${token}`
        },
        data: {
            user_id
        }
    })
    return response
}