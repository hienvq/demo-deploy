import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://18.142.245.247/api",
});
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["token"] = token;
  }
  return config;
});
axiosClient.interceptors.response.use((response) => {
  // if (response.status === 200) return response.data;
  return response;
});
export default axiosClient;
