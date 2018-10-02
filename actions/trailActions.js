import axios from 'axios'
// import googleTrends from 'google-trends-api'
import { AsyncStorage } from 'react-native'
import NavigationActions from 'react-navigation/src/NavigationActions';

export const TRAIL_SEARCH_PENDING = 'TRAIL_SEARCH_PENDING'
export const TRAIL_SEARCH_SUCCESS = 'TRAIL_SEARCH_SUCCESS'
export const TRAIL_SEARCH_FAILURE = 'TRAIL_SEARCH_FAILURE'
export const LOAD_MORE = 'LOAD_MORE'
export const RESET_LOAD = 'RESET_LOAD'

export const BUZZ_PENDING = 'BUZZ_PENDING'
export const BUZZ_SUCCESS = 'BUZZ_SUCCESS'
export const BUZZ_SEARCH_FAILURE = 'BUZZ_SEARCH_FAILURE'

export const TRAIL_SELECT = 'TRAIL_SELECT'
export const SWITCH_VIEW = 'SWITCH_VIEW'

export const DATE_CHANGE = 'DATE_CHANGE'

export const CHANGE_MIN = 'CHANGE_MIN'
export const CHANGE_MAX = 'CHANGE_MAX'

const BASE_URL = 'https://protected-shelf-23735.herokuapp.com/api'

export const getTrails = ({ lat, long, maxTrail, maxLength, minLength }) => {
    return async (dispatch) => {
        try {
            dispatch({type: TRAIL_SEARCH_PENDING})
            let response = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxResults=${maxTrail}&key=200355674-2678e760ceac9155c45dc4d568511bda&maxDistance=${maxLength}&minLength=${minLength}`)
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

export const getBuzz = (trail, date) => {
    return async (dispatch) => {
        try {
            dispatch({type: BUZZ_PENDING})
            let response = await axios.post(`${BASE_URL}/buzz`, {
                trail,
                date
            })
            dispatch({type: BUZZ_SUCCESS, payload: response.data.data})
        } catch (e) {
            dispatch({type: BUZZ_SEARCH_FAILURE, payload: e})
        }
    }
}

export const dateChange = (date) => {
    return (dispatch) => {
        const clickDate = new Date(date)
        clickDate.setDate(clickDate.getDate() + 1)
        dispatch({type: DATE_CHANGE, payload: clickDate})
    }
}

export const moreTrails = () => {
    return (dispatch) => {
        dispatch({type: LOAD_MORE})
    }
}

export const resetLoad = () => {
    return (dispatch) => {
        dispatch({type: RESET_LOAD})
    }
}

export const changeMin = (value) => {
    return (dispatch) => {
        dispatch({type: CHANGE_MIN, payload: value})
    }
}

export const changeMax = (value) => {
    return (dispatch) => {
        dispatch({type: CHANGE_MAX, payload: value})
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