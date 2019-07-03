import axios from 'axios'

export const weather = axios.create({
    baseURL: 'https://apiadvisor.climatempo.com.br/api/v1'
})

export const W_TOKEN = "1f9d78a0af46f8fbac1076ed7be756a0"