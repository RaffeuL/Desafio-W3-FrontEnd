import axios from "axios";

const url_production = "http://68.183.143.117:3333";

const api = axios.create({
    baseURL: url_production,
});

// api.interceptors.request.use(async (config) => {
//     try {
//         const token = "";

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     } catch (error) {
//         console.log(error);
//     }
// });

export default api;
