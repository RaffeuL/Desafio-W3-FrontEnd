import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url_production = "http://68.183.143.117:3333";

const api = axios.create({
    baseURL: url_production,
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default api;
