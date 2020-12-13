import axios from "axios"

export default axios.create({
    baseURL: "http://192.168.43.16:8000/",
    responseType: "json",
})