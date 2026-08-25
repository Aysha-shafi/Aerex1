import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://aerex1.onrender.com/api";
const STATIC_BASE_URL = API_BASE_URL.replace(/\/api$/, "");

export const resolveAssetUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  return `${STATIC_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("aerex_admin_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;