import { Router } from "express";
import authUserMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/file.middleware.js";
import {
  generatePDFFromId,
  getAllInterviewReports,
  getInterviewReportbyId,
  handleFileUploadandGenerateReport,
  deleteInterviewReport,
} from "../controller/interview.controller.js";

const interviewRouter = Router();

// All routes require authentication
interviewRouter.use(authUserMiddleware);

/**
 * @POST /api/interview/uploadcv
 * @description Generate interview report from resume upload
 * @access Private
 */
interviewRouter.post(
  "/uploadcv",
  upload.single("resume"),
  handleFileUploadandGenerateReport
);

/**
 * @GET /api/interview/
 * @description Get all interview reports for the user
 * @access Private
 */
interviewRouter.get("/", getAllInterviewReports);

/**
 * @GET /api/interview/generatepdf/:interviewId
 * @description Generate PDF from interview report
 * @access Private
 * @note Must come before /:id to avoid route conflict
 */
interviewRouter.get("/generatepdf/:interviewId", generatePDFFromId);

/**
 * @GET /api/interview/:interviewReportId
 * @description Get a specific interview report
 * @access Private
 */
interviewRouter.get("/:interviewReportId", getInterviewReportbyId);

/**
 * @DELETE /api/interview/:interviewId
 * @description Delete an interview report
 * @access Private
 */
interviewRouter.delete("/:interviewId", deleteInterviewReport);

export default interviewRouter;
