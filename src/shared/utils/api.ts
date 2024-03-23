import axios, { type AxiosInstance } from "axios";

// const isProduction = process.env.NODE_ENV === "production";

// const API_BASE_URL = isProduction
//   ? process.env.PROD_BACKEND_LINK
//   : process.env.DEV_BACKEND_LINK;

const instance: AxiosInstance = axios.create({
  baseURL: "https://todo-app-backend-wtew.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.withCredentials = true; // enable CORS credentials for requests
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
