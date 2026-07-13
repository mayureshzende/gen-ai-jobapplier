import apiClient from "../../../lib/apiClient";

export const register = async ({ username, email, password }) => {
  try {
    const res = await apiClient.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async ({ username, password }) => {
  try {
    const res = await apiClient.post("/api/auth/login", { username, password });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await apiClient.post("/api/auth/logout", {});
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const res = await apiClient.post("/api/auth/getMe", {});
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
