import axios from "axios"

const api = axios.create({
  baseURL: process.env.VUE_APP_BASEURL || "http://localhost:5001",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export default api
