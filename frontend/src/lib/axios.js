import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE==="development" ? "http://localhost:5001" : "/", // Backend URL
    withCredentials: true, // Send cookies when cross-origin requests

})