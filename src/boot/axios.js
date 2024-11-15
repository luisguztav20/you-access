import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({ baseURL: "https://api.example.com" });

export default boot(({ app }) => {});

export { axios, api };
