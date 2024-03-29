import axios from "axios";
const BASE_URL_DEV = "http://localhost:3002";
const BASE_PROD_URL = "https://chatnode-api.com"

export const BASE_API_URL = import.meta.env.DEV ? BASE_URL_DEV : BASE_PROD_URL;

axios.defaults.baseURL = BASE_API_URL;
