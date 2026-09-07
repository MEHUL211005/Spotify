import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    setLoginEmail: (state, action) => {
      state.email = action.payload;
    },

    clearLoginData: () => initialState,
  },
});

export const {
  setLoginEmail,
  clearLoginData,
} = loginSlice.actions;

export default loginSlice.reducer;