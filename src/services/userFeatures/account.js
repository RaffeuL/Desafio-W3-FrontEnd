import api from "../api";

export async function getBalance() {
    try {
        const response = await api.get("/consultBalance");
        return { status: "sucess", data: response.data.message };
    } catch (error) {
        return error.message;
    }
}
