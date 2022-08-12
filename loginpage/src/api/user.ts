import axios from 'axios'

const BASE_URL = process.env.REACT_APP_SERVER_API
export const baseAxios = axios.create({
  baseURL: BASE_URL,
})
