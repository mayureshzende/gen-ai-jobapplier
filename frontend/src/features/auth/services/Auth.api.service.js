import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
export const register = async ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  try {
    const res = await apiClient.post("/api/auth/register", {
      username,
      email,
      password,
      confirmPassword,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async ({ username, password }) => {
  try {
    const res = await apiClient.post("/api/auth/login", { username, password });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const res = await apiClient.post("/api/auth/logout", {});
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMe = async () => {
  try {
    const res = await apiClient.post("api/auth/getMe", {});
    console.log("fetched user data ", res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
