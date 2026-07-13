import apiClient from "../../../lib/apiClient";

export const register = async ({ username, email, password, firstName, middleName, lastName }) => {
  try {
    const res = await apiClient.post("/api/auth/register", {
      username,
      email,
      password,
      firstName: firstName || "",
      middleName: middleName || "",
      lastName: lastName || "",
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
    console.log("[Auth.getMe] Calling /api/auth/getMe");
    const res = await apiClient.post("/api/auth/getMe", {});
    console.log("[Auth.getMe] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[Auth.getMe] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const updateUserInfo = async ({ firstName, middleName, lastName }) => {
  try {
    console.log("[Auth.updateUserInfo] Calling /api/auth/update-info");
    const res = await apiClient.put("/api/auth/update-info", {
      firstName: firstName || "",
      middleName: middleName || "",
      lastName: lastName || "",
    });
    console.log("[Auth.updateUserInfo] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[Auth.updateUserInfo] Error:", error?.response?.status, error?.message);
    throw error;
  }
};
