import axios from 'axios'
import { getToken } from './auth'

/**
* Endereços para cada emulador
* Genymotion:              http://10.0.3.2:3333/
* Emulador Android Studio: http://10.0.2.2:3333/
* Simulador IOS:           http://localhost:3333/
*/

const api = axios.create({
    baseURL: 'https://space-travel-server.herokuapp.com'
})

api.interceptors.request.use( async config => {
    const token = getToken()
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api