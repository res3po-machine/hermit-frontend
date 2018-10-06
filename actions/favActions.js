import { favsByUser, fullFavs, favsByTrail, fav, unFav } from '../models/favs'

export const GET_USER_FAVS = 'GET_USER_FAVS'
export const GET_USER_FAVS_SUCCESS = 'GET_USER_FAVS_SUCCESS'
export const GET_USER_FAVS_FAILURE = 'GET_USER_FAVS_FAILURE'

export const FAV_TRAIL_PENDING = 'FAV_TRAIL_PENDING'
export const FAV_TRAIL_SUCCESS = 'FAV_TRAIL_SUCCESS'
export const FAV_TRAIL_FAILURE = 'FAV_TRAIL_FAILURE'

export const UNFAV_TRAIL_PENDING = 'UNFAV_TRAIL_PENDING'
export const UNFAV_TRAIL_SUCCESS = 'UNFAV_TRAIL_SUCCESS'
export const UNFAV_TRAIL_FAILURE = 'UNFAV_TRAIL FAILURE'

export const GET_TRAIL_FAVS = 'GET_TRAIL_FAVS'
export const GET_TRAIL_FAVS_SUCCESS = 'GET_TRAIL_FAVS_SUCCESS'
export const GET_TRAIL_FAVS_FAIL = 'GET_TRAILS_FAVS_FAIL'

export const GET_FULL_FAVS = 'GET_FULL_FAVS'
export const GET_FULL_FAVS_SUCCESS = 'GET_FULL_FAVS_SUCCESS'
export const GET_FULL_FAVS_FAILURE = 'GET_FULL_FAVS_FAILURE'

export const getFavsUser = (userID, token) => {
    return async (dispatch) => {
        try {
            dispatch({type: GET_USER_FAVS})
            let response = await favsByUser(userID, token)
            dispatch({type: GET_USER_FAVS_SUCCESS, payload: response.data.favs})
        } catch (e) {
            dispatch({type: GET_USER_FAVS_FAILURE, payload: e})
        }
    }
}

export const getFavsFull = (favArr) => {
    return async (dispatch) => {
        try {
            dispatch({type: GET_FULL_FAVS})
            const ids = favArr.join(',')
            let response = await fullFavs(ids)
            dispatch({type: GET_FULL_FAVS_SUCCESS, payload: response.data.trails})
        } catch (e) {
            dispatch({type: GET_FULL_FAVS_FAIL, payload: e})
        }
    }
}

export const getFavsTrail = (trailID, token) => {
    return async (dispatch) => {
        try {
            dispatch({type: GET_TRAIL_FAVS})
            let response = await favsByTrail(trailID, token)
            dispatch({type: GET_TRAIL_FAVS_SUCCESS, payload: parseInt(response.data.favs)})
        } catch (e) {
            dispatch({type: GET_TRAIL_FAVS_FAIL, payload: e})
        }
    }
}

export const favTrail = (userID, trailID, token) => {
    return async (dispatch) => {
        try {
            dispatch({type: FAV_TRAIL_PENDING})
            let response = await fav(userID, trailID, token)
            dispatch({type: FAV_TRAIL_SUCCESS, payload: response.data.fav})
        } catch (e) {
            dispatch({type: FAV_TRAIL_FAILURE, payload: e})
        }
    }
}

export const unFavTrail = (userID, trailID, token) => {
    return async (dispatch) => {
        try {
            dispatch({type: UNFAV_TRAIL_PENDING})
            await unFav(userID, trailID, token)
            dispatch({type: UNFAV_TRAIL_SUCCESS, payload: trailID})
        } catch (e) {
            dispatch({type: UNFAV_TRAIL_FAILURE, payload: e})
        }
    }
}