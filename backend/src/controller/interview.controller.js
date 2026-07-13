import { PDFParse } from "pdf-parse";
import {
  generateInterviewReport,
  generatePDF,
} from "../../services/ai.services.js";
import interviewReportModel from "../models/interviewReport.model.js";
import { getTodaysDate } from "../../utils/date.utils.js";

/**
 * @POST /api/interview/uploadcv
 * @description Generate interview report from resume and job description
 * @access Private
 */
const handleFileUploadandGenerateReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const { profileSummary, jobDescription } = req.body;

    if (!profileSummary || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Profile summary and job description are required",
      });
    }

    // Parse PDF
    let resumeText;
    try {
      const resumeFileContents = await new PDFParse({
        data: Uint16Array.from(req.file.buffer),
      }).getText();
      resumeText = resumeFileContents.text;
    } catch (parseError) {
      console.error("Error parsing PDF:", parseError);
      return res.status(400).json({
        success: false,
        message: "Failed to parse resume PDF. Please ensure it's a valid PDF file",
      });
    }

    // Generate AI report
    const interviewReportByAI = await generateInterviewReport({
      resume: resumeText,
      jobDescription,
      profileSummary,
    });

    // Save to database
    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      jobDescription,
      profileSummary,
      ...interviewReportByAI,
    });

    return res.status(201).json({
      success: true,
      message: "Interview report generated successfully",
      aiResponse: interviewReport,
    });
  } catch (err) {
    console.error("Error generating interview report:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to generate interview report. Please try again later",
    });
  }
};

/**
 * @GET /api/interview/:interviewReportId
 * @description Get a specific interview report
 * @access Private
 */
const getInterviewReportbyId = async (req, res) => {
  try {
    const { interviewReportId } = req.params;

    const interviewReport = await interviewReportModel.findOne({
      _id: interviewReportId,
      user: req.user.id,
    });

    if (!interviewReport) {
      return res.status(404).json({
        success: false,
        message: "Interview report not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview report retrieved successfully",
      interviewReport,
    });
  } catch (err) {
    console.error("Error fetching interview report:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch interview report",
    });
  }
};

/**
 * @GET /api/interview/
 * @description Get all interview reports for the user
 * @access Private
 */
const getAllInterviewReports = async (req, res) => {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: req.user.id })
      .select(
        "-technicalQuestions -behavioralQuestions -skillGaps -preparationPlan -user -resume -jobDescription -__v"
      )
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Interview reports retrieved successfully",
      reports: interviewReports,
    });
  } catch (err) {
    console.error("Error fetching interview reports:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch interview reports",
    });
  }
};

/**
 * @GET /api/interview/generatepdf/:interviewId
 * @description Generate and download PDF resume from interview report
 * @access Private
 */
const generatePDFFromId = async (req, res) => {
  try {
    const { interviewId } = req.params;
    console.log("[generatePDFFromId] Starting PDF generation for id:", interviewId);

    const foundInterviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!foundInterviewReport) {
      console.log("[generatePDFFromId] Report not found for id:", interviewId);
      return res.status(404).json({
        success: false,
        message: "Interview report not found",
      });
    }

    console.log("[generatePDFFromId] Found report, generating PDF...");
    const generatedPdf = await generatePDF(foundInterviewReport);

    if (!generatedPdf || generatedPdf.length === 0) {
      console.error("[generatePDFFromId] PDF generation returned empty:", generatedPdf);
      return res.status(500).json({
        success: false,
        message: "PDF generation failed - empty result",
      });
    }

    console.log("[generatePDFFromId] PDF generated successfully, size:", generatedPdf.length);
    const dateStamp = getTodaysDate();
    const formattedJobTitle = foundInterviewReport.jobTitle.replace(/\s+/g, "_");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${req.user.username}_${formattedJobTitle}_${dateStamp}.pdf`
    );
    res.setHeader("Content-Length", generatedPdf.length);
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    console.log("[generatePDFFromId] Sending PDF response");
    return res.end(generatedPdf);
  } catch (error) {
    console.error("[generatePDFFromId] Error generating PDF:", error?.message);
    console.error("[generatePDFFromId] Error stack:", error?.stack);
    return res.status(500).json({
      success: false,
      message: "Failed to generate PDF: " + error?.message,
    });
  }
};

/**
 * @DELETE /api/interview/:interviewId
 * @description Delete an interview report
 * @access Private
 */
const deleteInterviewReport = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const result = await interviewReportModel.deleteOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Interview report not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview report deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting interview report:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete interview report",
    });
  }
};

export {
  handleFileUploadandGenerateReport,
  getInterviewReportbyId,
  getAllInterviewReports,
  generatePDFFromId,
  deleteInterviewReport,
};
