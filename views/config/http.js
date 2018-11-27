import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://localhost:3001/api/', //base URL for the api call
})