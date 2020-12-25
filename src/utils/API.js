import axios from "axios"

export default axios.create({
<<<<<<< HEAD
    // baseURL: "http://127.0.0.1:8000/",
    baseURL: "http://192.168.43.16:8000/",
    // baseURL: "http://192.168.0.100:8000",
=======
    baseURL: "http://127.0.0.1:8000/",
    // baseURL: "http://192.168.43.16:8000/",
>>>>>>> 8411089ecc7a5449928a73299d17301cb032a02d
    responseType: "json",
})