import apiClient from "../../../lib/apiClient";

export const getProfile = async () => {
  try {
    console.log("[profile.getProfile] Calling /api/profile/");
    const res = await apiClient.get("/api/profile/");
    console.log("[profile.getProfile] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[profile.getProfile] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const updateSummary = async (summary) => {
  try {
    console.log("[profile.updateSummary] Updating summary");
    const res = await apiClient.put("/api/profile/summary", { summary });
    console.log("[profile.updateSummary] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[profile.updateSummary] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const updateSkills = async (skills) => {
  try {
    console.log("[profile.updateSkills] Updating skills:", skills);
    const res = await apiClient.put("/api/profile/skills", { skills });
    console.log("[profile.updateSkills] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[profile.updateSkills] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const addExperience = async (experience) => {
  try {
    console.log("[profile.addExperience] Adding experience:", experience);
    const res = await apiClient.post("/api/profile/experience", experience);
    console.log("[profile.addExperience] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[profile.addExperience] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const updateExperience = async (expId, experience) => {
  try {
    console.log("[profile.updateExperience] Updating experience:", expId, experience);
    const res = await apiClient.put(`/api/profile/experience/${expId}`, experience);
    console.log("[profile.updateExperience] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[profile.updateExperience] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const deleteExperience = async (expId) => {
  try {
    console.log("[profile.deleteExperience] Deleting experience:", expId);
    const res = await apiClient.delete(`/api/profile/experience/${expId}`);
    console.log("[profile.deleteExperience] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[profile.deleteExperience] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const reorderExperience = async (expId, direction) => {
  try {
    console.log("[profile.reorderExperience] Reordering experience:", expId, "direction:", direction);
    const res = await apiClient.put(`/api/profile/experience/${expId}/reorder`, { direction });
    console.log("[profile.reorderExperience] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[profile.reorderExperience] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const addCertification = async (certification) => {
  try {
    console.log("[profile.addCertification] Adding certification:", certification);
    const res = await apiClient.post("/api/profile/certifications", certification);
    console.log("[profile.addCertification] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[profile.addCertification] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const deleteCertification = async (certId) => {
  try {
    console.log("[profile.deleteCertification] Deleting certification:", certId);
    const res = await apiClient.delete(`/api/profile/certifications/${certId}`);
    console.log("[profile.deleteCertification] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[profile.deleteCertification] Error:", error?.response?.status, error?.message);
    throw error;
  }
};
