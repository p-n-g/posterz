

import axios from "axios";

console.log(process.env.REACT_APP_SERVER_BASE_URL);

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    headers: {
        common: {
            Authorization: `Bearer ${process.env.REACT_APP_SERVER_API_KEY}`
        }
    }
});

export default axiosClient;
