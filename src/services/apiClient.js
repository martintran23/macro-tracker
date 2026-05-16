import axios from "axios";

const API_ROOT = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL: `${API_ROOT}/api`,
  timeout: 15000,
});
