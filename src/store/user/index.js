import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAccount(state, action) {
            state.account = action.payload;
        },
        logoutUser(state) {
            state.account = {};
        },
        updateBalance(state, action) {
            state.account.balance = action.payload;
        },
    },
});

export const { setAccount, logoutUser, updateBalance } = userSlice.actions;
export default userSlice.reducer;
