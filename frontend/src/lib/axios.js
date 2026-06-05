import axios from "axios";

const api = axios.create({       // create an axiosInstance
  baseURL: "http://localhost:5001/api",
});

export default api;
