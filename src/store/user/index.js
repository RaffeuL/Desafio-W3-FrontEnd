import { createSlice } from "@reduxjs/toolkit";
const user = {
    name: "",
    cpf: "",
    password: "",
    agency: "",
    accountNumer: "",
};

const initialState = { user: { name: "Rafeu da Silva Lisboa" } };
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});
export const { setUser } = userSlice.actions;
export default userSlice;
