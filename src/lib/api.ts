import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status || 500,
      errorCode: error.code || null,
    };
    return Promise.reject(customError);
  }
);

// Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // You can add headers here
//     // config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
export default api;
