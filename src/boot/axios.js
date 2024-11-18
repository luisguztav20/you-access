import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: "https://mw2rv8bf-3000.use2.devtunnels.ms",
});

export default boot(({ app }) => {});

export { axios, api };
