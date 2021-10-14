import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://2.0.0.1:8001/api',
    timeout: 1000,
});
instance.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)
})

export default instance

