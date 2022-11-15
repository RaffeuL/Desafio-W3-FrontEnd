import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import userSlice from "./user";

export const store = configureStore({
    reducer: userSlice.reducer,
});
