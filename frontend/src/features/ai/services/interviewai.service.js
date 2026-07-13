import apiClient from "../../../lib/apiClient";

export const uploadCv = async (resumePDF, jobDescription, profileSummary) => {
  try {
    const formData = new FormData();
    formData.append("resume", resumePDF);
    formData.append("jobDescription", jobDescription);
    formData.append("profileSummary", profileSummary);

    // Don't set Content-Type header - let axios/browser handle it
    // Setting it manually breaks multipart form data with boundary
    const res = await apiClient.post("/api/interview/uploadcv", formData);
    return res.data;
  } catch (error) {
    console.error("error uploading cv", error?.message);
    throw error;
  }
};

export const getInterviewReportById = async (id) => {
  try {
    const res = await apiClient.get(`/api/interview/${id}`);
    return res.data;
  } catch (error) {
    console.error("error fetching the report", error?.message);
    throw error;
  }
};

export const getAllInterviewReports = async () => {
  try {
    console.log("[interviewai.getAllInterviewReports] Calling /api/interview/");
    const res = await apiClient.get("/api/interview/");
    console.log("[interviewai.getAllInterviewReports] Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("[interviewai.getAllInterviewReports] Error:", error?.response?.status, error?.message);
    throw error;
  }
};

export const generatePdf = async (id) => {
  try {
    const res = await apiClient.get(`/api/interview/generatepdf/${id}`, {
      responseType: 'blob',
    });
    return res.data;
  } catch (error) {
    console.error("error generating pdf", error?.message);
    throw error;
  }
};
