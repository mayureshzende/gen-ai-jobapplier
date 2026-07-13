import {
  uploadCv,
  getAllInterviewReports,
  getInterviewReportById,
  generatePdf,
} from "../services/interviewai.service";
import { useCallback, useContext, useEffect, useRef } from "react";
import { InterviewContext } from "../state/InterviewContext";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { loading, setLoading, report, setReport, reports, setReports } = context;
  const mountedRef = useRef(true);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const getReports = useCallback(async () => {
    try {
      setLoading(true);
      const reportsres = await getAllInterviewReports();
      if (mountedRef.current) {
        setReports(reportsres?.reports);
      }
    } catch (error) {
      console.error("error fetching reports ", error);
      if (mountedRef.current) {
        setLoading(false);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [setLoading, setReports]);

  const getReportbyId = async (id) => {
    try {
      setLoading(true);
      const report = await getInterviewReportById(id);
      if (mountedRef.current) {
        setReport(report?.interviewReport);
      }
    } catch (error) {
      console.error("error fetching report ", error);
      if (mountedRef.current) {
        setLoading(false);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const uploadCvandGetReport = async (resume, jobDescription, profileSummary) => {
    try {
      setLoading(true);
      const uploadCvRes = await uploadCv(resume, jobDescription, profileSummary);

      if (mountedRef.current) {
        if (uploadCvRes?.aiResponse) {
          // Backend returns { success, message, aiResponse: reportDoc }
          setReport(uploadCvRes.aiResponse);
          return uploadCvRes.aiResponse; // Return the actual report for navigation
        } else if (uploadCvRes?._id) {
          // Fallback: response is the report directly
          setReport(uploadCvRes);
          return uploadCvRes;
        } else {
          throw new Error('Invalid response format from server');
        }
      }
      return uploadCvRes?.aiResponse || uploadCvRes;
    } catch (error) {
      console.error("error while uploading resume", error);
      if (mountedRef.current) {
        setLoading(false);
      }
      throw error;
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const generatePDFforReportId = async (id) => {
    try {
      setLoading(true);
      const pdf = await generatePdf(id);
      const url = window.URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("error generating the report ", error);
      if (mountedRef.current) {
        setLoading(false);
      }
      throw error;
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (hasFetchedRef.current || reports !== null) return;
    hasFetchedRef.current = true;
    getReports();
  }, [reports, getReports]);

  return {
    loading,
    report,
    reports,
    generatePDFforReportId,
    uploadCvandGetReport,
    getReportbyId,
    getReports,
  };
};
