import axios from 'axios'
// import googleTrends from 'google-trends-api'
import { AsyncStorage } from 'react-native'
import NavigationActions from 'react-navigation/src/NavigationActions';

export const TRAIL_SEARCH_PENDING = 'TRAIL_SEARCH_PENDING'
export const TRAIL_SEARCH_SUCCESS = 'TRAIL_SEARCH_SUCCESS'
export const TRAIL_SEARCH_FAILURE = 'TRAIL_SEARCH_FAILURE'
export const LOAD_MORE = 'LOAD_MORE'

export const BUZZ_PENDING = 'BUZZ_PENDING'
export const BUZZ_SUCCESS = 'BUZZ_SUCCESS'
export const BUZZ_SEARCH_FAILURE = 'BUZZ_SEARCH_FAILURE'

export const TRAIL_SELECT = 'TRAIL_SELECT'
export const SWITCH_VIEW = 'SWITCH_VIEW'

const BASE_URL = 'http://localhost:5000/api'

export const getTrails = ({ lat, long, maxDistance, date }) => {
    return async (dispatch) => {
        try {
            dispatch({type: TRAIL_SEARCH_PENDING})
            let response = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxResults=10&key=200355674-2678e760ceac9155c45dc4d568511bda${maxDistance ? '&maxDistance=' + maxDistance : ''}`)
            console.log(response)
            dispatch({type: TRAIL_SEARCH_SUCCESS, payload: response.data.trails})
            
        } catch (e) {
            dispatch({type: TRAIL_SEARCH_FAILURE, payload: e})
        }
    }
}

export const selectOneTrail = (id) => {
    return (dispatch) => {
        dispatch({type: TRAIL_SELECT, payload: id})
    }
}

export const switchView = (index) => {
    return (dispatch) => {
        dispatch({type: SWITCH_VIEW, payload: index === 0 ? 1 : 0})
    }
}

export const getBuzz = (trails, date) => {
    return async (dispatch) => {
        try {
            dispatch({type: BUZZ_PENDING})
            let response = await axios.post(`${BASE_URL}/buzz`, {
                trails,
                date
            })
            dispatch({type: BUZZ_SUCCESS, payload: response.data.data})
        } catch (e) {
            dispatch({type: BUZZ_SEARCH_FAILURE, payload: e})
        }
    }
}

const getMonday = (d) => {
    d = new Date(d)
    let day = d.getDay()
    let diff = d.getDate() - day + (day == 0 ? -6 : 1)
    return new Date(d.setDate(diff))
}

const getSunday = (d) => {
    let mon = getMonday(d)
    let diff = mon.getDate() + 6
    return new Date(mon.setDate(diff))
}