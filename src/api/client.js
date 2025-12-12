import axios from "axios";

const api = axios.create({
  baseURL: "https://wavenetbackend.onrender.com",
  withCredentials: true,
});

export default api;
