import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://ordens120210922085502.azurewebsites.net/api'
})