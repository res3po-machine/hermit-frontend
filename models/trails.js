import axios from 'axios'

const BASE_URL = 'https://protected-shelf-23735.herokuapp.com/api'

export const fetchTrails = async ({ lat, long, maxTrail, maxLength, minLength }) => {
    let response = await axios.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxResults=${maxTrail}&key=200355674-2678e760ceac9155c45dc4d568511bda&maxDistance=${maxLength}&minLength=${minLength}`)
    return response
}

export const buzz = async (trail, date) => {
    let response = await axios.post(`${BASE_URL}/buzz`, {
        trail,
        date
    })
    return response
}