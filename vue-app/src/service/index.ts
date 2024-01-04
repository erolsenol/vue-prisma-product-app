import axios from "axios"

const api = axios.create({
  baseURL: process.env.baseURL || "http://localhost:5001",
  headers: {
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
})

export default api
