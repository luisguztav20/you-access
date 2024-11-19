import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: "https://youaccess-backend-0388e95e5b0d.herokuapp.com",
});

export default boot(({ app }) => {});

export { axios, api };
