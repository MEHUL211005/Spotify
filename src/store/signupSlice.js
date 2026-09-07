import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  name: "",
  phone: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,

  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setPassword: (state, action) => {
      state.password = action.payload;
    },

    setPersonalDetails: (state, action) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
    },

    clearSignupData: () => initialState,
  },
});

export const {
  setEmail,
  setPassword,
  setPersonalDetails,
  clearSignupData,
} = signupSlice.actions;

export default signupSlice.reducer;