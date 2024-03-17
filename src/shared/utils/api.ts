import axios, { type AxiosInstance } from "axios";

const API_BASE_URL = "https://todo-app-backend-wtew.onrender.com";

const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use((res) => {
  return res;
});

export default instance;
