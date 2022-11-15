import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
const user = {
    name: "",
    cpf: "",
    password: "",
    agency: "",
    accountNumer: "",
    token: "",
};

const initialState = { user: user };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setToken(state, action) {
            state.user.token = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(userLogin.pending, (state, action) => {
                state.status = "loading";
                console.log("loading");
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = "success";
                console.log("success");
                console.log(action.payload.token);
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.log("failed");
            });
    },
});

export const userLogin = createAsyncThunk("user/userLogin", async (data) => {
    const response = await api.post("/login", data);
    return response.data;
});

export const { setUser, setToken } = userSlice.actions;
export default userSlice;
