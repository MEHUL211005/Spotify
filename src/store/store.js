import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import signupReducer from "./signupSlice";
import authReducer from "./authSlice";
import loginReducer from "./loginSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
    signup: signupReducer,
    auth: authReducer,
    login: loginReducer,
  },
});

export default store;