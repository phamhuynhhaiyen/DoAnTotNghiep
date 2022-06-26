import axios from 'axios'

const BASE_URL = "http://localhost:8080/api/"


export const publishRequest = axios.create({ 
    baseURL: BASE_URL,
})

// export const userRequest = axios.create({ 
//     baseURL: BASE_URL,
//     headers: {token: TOKEN}
// })