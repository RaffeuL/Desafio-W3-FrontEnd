import axios from "axios";
import { store } from "../store";

const url_production = "http://68.183.143.117:3333";

const api = axios.create({
    baseURL: url_production,
});

api.interceptors.request.use(async (config) => {
    const token = store.getState().token;
    //console.log(token);
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default api;
