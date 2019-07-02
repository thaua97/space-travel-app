import axios from 'axios'

/**
* Endereços para cada emulador
* Genymotion:              http://10.0.3.2:3333/
* Emulador Android Studio: http://10.0.2.2:3333/
* Simulador IOS:           http://localhost:3333/
*/

const api = axios.create({
    baseURL: 'http://10.0.2.2:3333'
})

export default api