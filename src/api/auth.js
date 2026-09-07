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
  const response = await api.post("/users/logout");

  return response.data;
};