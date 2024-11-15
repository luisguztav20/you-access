import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000" });

export default boot(({ app }) => {});

export { axios, api };
