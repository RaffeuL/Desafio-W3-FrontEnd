import api from "../api";

export async function getStatement(initialDate, finalDate) {
    try {
        const response = await api.post("/transactions", {
            initial_date: initialDate,
            final_date: finalDate,
        });
        return { status: "sucess", data: response.data };
    } catch (error) {
        return error.message;
    }
}
