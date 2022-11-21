import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/login-slice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
