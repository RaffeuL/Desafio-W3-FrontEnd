import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: {}, token: "" };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        logoutUser(state) {
            state.user = {};
            state.token = "";
        },
    },
});

export const { setUser, setToken, logoutUser } = userSlice.actions;
export default userSlice.reducer;
