import axios from "axios";
import { BASE_URL } from "./constants";

const adminApi = axios.create({
  baseURL: BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

// Add JWT token automatically to headers
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminApi;
