import axios, { AxiosRequestConfig } from "axios"

const config: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_BASEURL || "http://localhost:5001",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data)
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data)
    },
  ],
}

const api = axios.create(config)

api.get

export default api
