import api from "../api";

export async function getBalance() {
    try {
        const response = await api.get("/consultBalance");
        return { status: "sucess", data: response.data.message };
    } catch (error) {
        return error.message;
    }
}

export async function makeTransference(data) {
    try {
        await api.post("/transference", data);
        return "sucess";
    } catch (error) {
        return error.message;
    }
}

export async function openAccount(data) {
    try {
        const response = await api.post("/openFirstCheckingAccount", data);
        return { status: "sucess", data: response.data };
    } catch (error) {
        return error.message;
    }
}
