import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    console.log("[apiClient] Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("[apiClient] Request error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("[apiClient] Response:", response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error("[apiClient] Response error:", error.response?.status, error.message, error.config?.url);
    return Promise.reject(error);
  }
);

export default apiClient;
