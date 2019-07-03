import axios from 'axios'
import { getToken } from './auth'
import { AsyncStorage } from 'react-native'

const api = axios.create({
    baseURL: 'https://space-travel-server.herokuapp.com'
})

api.interceptors.request.use( async config => {
    const token = await AsyncStorage.getItem('@SpaceApi:token')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api