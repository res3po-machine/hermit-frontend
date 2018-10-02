import axios from 'axios'

export const COMMENTS_LOADING = 'COMMENTS_LOADING'
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'
export const GET_COMMENTS_FAIL = 'GET_COMMENTS_FAIL'

export const COMMENT_POSTING = 'COMMENT_POSTING'
export const COMMENT_POST_FAILED = 'COMMENT_POST_FAILED'
export const COMMENT_POST_SUCCESS = 'COMMENT_POST_SUCCESS'

export const COMMENT_SELECT = 'COMMENT_SELECT'

export const COMMENT_UPDATE = 'COMMENT_UPDATE'
export const COMMENT_UPDATE_SUCCESS = 'COMMENT_UPDATE_SUCCESS'
export const COMMENT_UPDATE_FAILED = 'COMMENT_UPDATE_FAILED'

export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAIL = 'DELETE_COMMENT_FAIL'

const BASE_URL = 'https://protected-shelf-23735.herokuapp.com/api'

export const commentsByTrail = (trailID, token) => {
    return async (dispatch) => {
        try {
            dispatch({type: COMMENTS_LOADING})
            let response = await axios.get(`${BASE_URL}/comments/${trailID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({type: GET_COMMENTS_SUCCESS, payload: response.data.comments})
        } catch (e) {
            dispatch({type: GET_COMMENTS_FAIL, payload: e})
        }
    }
}

export const postComment = ({body, userId, trailId, trailName}, token) => {
    return async (dispatch) => {
        try {
            // console.log({body, userId, trailId, trailName})
            dispatch({type: COMMENT_POSTING})
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
            dispatch({type: COMMENT_POST_SUCCESS})
        } catch (e) {
            dispatch({type: COMMENT_POST_FAILED, payload: e})
        }
    }
}

export const patchComment = (id, user_id, body, token) => {
    return async (dispatch) => {
        try {
            dispatch({type: COMMENT_UPDATE})
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
            dispatch({type: COMMENT_UPDATE_SUCCESS})
        } catch (e) {
            dispatch({type: COMMENT_UPDATE_FAILED, payload: e})
        }
    } 
}

export const deleteComment = (id, user_id, token) => {
    return async (dispatch) => {
        try {
            dispatch({type: DELETE_COMMENT})
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
            dispatch({type: DELETE_COMMENT_SUCCESS})
        } catch (e) {
            dispatch({type: DELETE_COMMENT_FAIL, payload: e})
        }
    }
}

export const selectComment = (id) => {
    return async (dispatch) => {
        dispatch({type: COMMENT_SELECT, payload: id})
    }
}