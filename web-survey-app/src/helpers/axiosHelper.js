import axios from "axios"
import { getAuthToken } from "./authHelpers";

export const axiosInstance = axios.create({
    baseURL: "http://192.168.8.101:4000/api/",
    timeout: 5000,
    headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
    }
}); 