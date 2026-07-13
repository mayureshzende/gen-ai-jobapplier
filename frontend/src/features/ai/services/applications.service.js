import apiClient from "../../../lib/apiClient";

export const getApplications = async () => {
  try {
    console.log("[applications.getApplications] Calling /api/applications/");
    const res = await apiClient.get("/api/applications/");
    console.log("[applications.getApplications] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[applications.getApplications] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const getApplicationById = async (id) => {
  try {
    console.log("[applications.getApplicationById] Calling /api/applications/" + id);
    const res = await apiClient.get(`/api/applications/${id}`);
    console.log("[applications.getApplicationById] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[applications.getApplicationById] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const createApplication = async (appData) => {
  try {
    console.log("[applications.createApplication] Creating application:", appData);
    const res = await apiClient.post("/api/applications/", appData);
    console.log("[applications.createApplication] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[applications.createApplication] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const updateApplication = async (id, appData) => {
  try {
    console.log("[applications.updateApplication] Updating application:", id, appData);
    const res = await apiClient.put(`/api/applications/${id}`, appData);
    console.log("[applications.updateApplication] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[applications.updateApplication] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const deleteApplication = async (id) => {
  try {
    console.log("[applications.deleteApplication] Deleting application:", id);
    const res = await apiClient.delete(`/api/applications/${id}`);
    console.log("[applications.deleteApplication] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[applications.deleteApplication] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const getApplicationStats = async () => {
  try {
    console.log("[applications.getApplicationStats] Calling /api/applications/stats/summary");
    const res = await apiClient.get("/api/applications/stats/summary");
    console.log("[applications.getApplicationStats] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[applications.getApplicationStats] Error:", error?.response?.status, error?.message);
    throw error;
  }
};
