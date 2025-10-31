// src/api/axiosInstance.ts
import axios from "axios";
import Cookies from "js-cookie";
const API = import.meta.env.VITE_API_BASE_URL
const apiClient = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,

  baseURL:API,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthToken = () => Cookies.get("token");

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

// export const BASE_PATH="/proactive"