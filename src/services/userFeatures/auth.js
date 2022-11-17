import api from "../api";

export async function userLogin(data) {
    try {
        const response = await api.post("/login", data);
        return { status: "sucess", data: response.data.token };
    } catch (error) {
        return error.message;
    }
}

export async function userLogout() {
    try {
        await api.post("/logout");
        return "sucess";
    } catch (error) {
        return error.message;
    }
}

export async function getUserData() {
    try {
        const response = await api.get("/authenticated");
        return { status: "sucess", data: response.data };
    } catch (error) {
        return error.message;
    }
}

export async function userRegister(data) {
    try {
        const response = await api.post("/", data);
        return response.data;
    } catch (error) {
        return error.message;
    }
}
