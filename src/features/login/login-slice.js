import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
  id: "",
  name: "",
  isLogged: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: async (state, action) => {
      state.value = await Axios.post("http://localhost:3001/user/login", {
        username: action.payload.username,
        password: action.payload.password,
      });
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
