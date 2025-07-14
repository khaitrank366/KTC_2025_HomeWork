import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://687076877ca4d06b34b6db29.mockapi.io/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

export default axiosClient;
