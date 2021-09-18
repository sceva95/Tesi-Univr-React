import axios from "axios";

const database = axios.create({
    baseURL: 'http://localhost:8080'
})

export {
    database
}