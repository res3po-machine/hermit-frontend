import axios from 'axios'
import { AsyncStorage } from 'react-native'

export const TRAIL_SEARCH_PENDING = 'TRAIL_SEARCH_PENDING'
export const TRAIL_SEARCH_SUCCESS = 'TRAIL_SEARCH_SUCCESS'
export const TRAIL_SEARCH_FAILURE = 'TRAIL_SEARCH_FAILURE'
export const LOAD_MORE = 'LOAD_MORE'

export const getTrails = ({ lat, long, maxDistance }) => {
    return async (dispatch) => {
        try {
            dispatch({type: TRAIL_SEARCH_PENDING})
            let response = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxResults=25&key=200355674-2678e760ceac9155c45dc4d568511bda${maxDistance ? '&maxDistance=' + maxDistance : ''}`)
            console.log(response)
            dispatch({type: TRAIL_SEARCH_SUCCESS, payload: response.data.trails})
        } catch (e) {
            dispatch({type: TRAIL_SEARCH_FAILURE, payload: e})
        }
    }
}