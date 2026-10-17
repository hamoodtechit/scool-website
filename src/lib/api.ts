import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

/**
 * Axios instance configured for the backend API.
 * 
 * Features:
 * - Base URL from environment variable
 * - Default headers (JSON)
 * - Interceptors ready for auth token attachment and 401 refresh logic
 */

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Request interceptor
 * E.g. attach a Bearer token from localStorage or cookies here.
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Example: attach token
    // const token = getClientToken();
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * E.g. global error handling, 401 refresh queues.
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Implement global 401 redirect or token refresh logic here
    // Example:
    // if (error.response?.status === 401) { ... refresh ... }
    
    return Promise.reject(error);
  }
);

export default api;
