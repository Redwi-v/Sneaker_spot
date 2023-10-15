import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4200/api/',
    withCredentials: true,
});

export default axiosInstance;
