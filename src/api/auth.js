import api from "./axios";

export const registerUser = async (userData) => {
  const response = await api.post(
    "/users/register",
    userData
  );

  return response.data;
};
export const loginUser = async (credentials) => {
  const response = await api.post(
    "/users/login",
    credentials
  );

  return response.data;
};
export const logoutUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await api.post("/users/logout", {
    refreshToken,
  });

  return response.data;
};
export const forgotPassword = async (email) => {
  const response = await api.post("/users/forgot-password", {
    email,
  });

  return response.data;
};
export const resetPassword = async ({
  email,
  token,
  newPassword,
}) => {
  const response = await api.post("/users/reset-password", {
    email,
    token,
    newPassword,
  });


  return response.data;
};
export const socialLogin = async ({
  firebaseIdToken,
  name,
}) => {
  const response = await api.post("/users/social-login", {
    firebaseIdToken,
    name,
  });

  return response.data;
};