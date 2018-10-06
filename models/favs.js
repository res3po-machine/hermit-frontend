import axios from 'axios'

const BASE_URL = 'https://protected-shelf-23735.herokuapp.com/api'

export const favsByUser = async (userID, token) => {
    let response = await axios.get(`${BASE_URL}/favs/user/${userID}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return response
}

export const fullFavs = async (ids) => {
    let response = await axios.get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${ids}&key=200355674-2678e760ceac9155c45dc4d568511bda`)
    return response
}

export const favsByTrail = async (trailID, token) => {
    let response = await axios.get(`${BASE_URL}/favs/${trailID}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return response
}

export const fav = async (userID, trailID, token) => {
    let response = await axios({
        method: 'post',
        url: `${BASE_URL}/favs/`,
        headers: {
            authorization: `Bearer ${token}`
        },
        data: {
            user_id: userID,
            trail_id: trailID
        }
    })
    return response
}

export const unFav = async (userID, trailID, token) => {
    let response = await axios({
        method: 'delete',
        url: `${BASE_URL}/favs/user/${userID}`,
        headers: {
            authorization: `Bearer ${token}`
        },
        data: {
            trail_id: trailID
        }
    })
    return response
}