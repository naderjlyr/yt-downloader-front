import axios from "axios"

export default axios.create({
    // baseURL: "http://127.0.0.1:8000/",
    // baseURL: "http://127.0.0.1:8000/",
    // baseURL: "http://192.168.43.16:8000/",
    baseURL:"http://192.168.0.100:8000",
    responseType: "json",
})