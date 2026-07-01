import { Router } from "express";
import authUserMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/file.middleware.js";
import {
  generatePDFFromId,
  getAllInterviewReports,
  getInterviewReportbyId,
  handleFileUploadandGenerateReport,
} from "../controller/interview.controller.js";

const interviewRouter = Router();

/***
 * @route POST /api/interview/uploadcv
 * @description this is to get the user pdf from the user
 * @access private
 */
interviewRouter.post(
  "/uploadcv",
  authUserMiddleware,
  upload.single("resume"),
  handleFileUploadandGenerateReport,
);

/**
 * @route GET /api/interview/:interviewReportId
 * @description get the specific interview report based on the id passed from the frontend
 * @access private
 */
interviewRouter.get(
  "/:interviewReportId",
  authUserMiddleware,
  getInterviewReportbyId,
);

/**
 * @route GET /api/interview/
 * @description Get all the reports generated in the past for the user
 * @access private
 */
interviewRouter.get("/", authUserMiddleware, getAllInterviewReports);

/**
 * @route GET /api/interview/pdf/:interviewId
 * @description generate the pdf from the provided interview id
 * @access private
 */
interviewRouter.get(
  "/generatepdf/:interviewId",
  authUserMiddleware,
  generatePDFFromId,
);

export default interviewRouter;
