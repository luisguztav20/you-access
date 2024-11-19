import { boot } from "quasar/wrappers";
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://youaccess-backend-0388e95e5b0d.herokuapp.com",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("x-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { axios, api };
