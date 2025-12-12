import axios from "axios";

const api = axios.create({
  baseURL: "https://wavenet-backend-9wvk.onrender.com/api",
  withCredentials: true,
});

export default api;
