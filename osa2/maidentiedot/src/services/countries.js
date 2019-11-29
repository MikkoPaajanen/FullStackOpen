import axios from 'axios'

const baseUrl = 'https://restcountries.eu/rest/v2/all'
const weatherUrl = 'http://api.weatherstack.com/current'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getWeather = (capital) => {
    const request = axios.get(`${weatherUrl}?access_key=04527a0aead80164f51b854457995a34&query=${capital}`)
    return request.then(response => response.data)
}


export default { getAll, getWeather } 