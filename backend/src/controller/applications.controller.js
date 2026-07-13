import applicationModel from "../models/application.model.js";
import { createApplicationSchema, updateApplicationSchema } from "../services/validationSchemas.js";
import { z } from "zod";

/**
 * @POST /api/applications
 * @description Create a new job application
 * @access Private
 */
export const createApplication = async (req, res) => {
  try {
    const validation = createApplicationSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.errors,
      });
    }

    const application = await applicationModel.create({
      user: req.user.id,
      ...validation.data,
    });

    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      application,
    });
  } catch (error) {
    console.error("Error creating application:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create application",
    });
  }
};

/**
 * @GET /api/applications
 * @description Get all applications for the authenticated user
 * @access Private
 */
export const getApplications = async (req, res) => {
  try {
    const applications = await applicationModel
      .find({ user: req.user.id })
      .populate("interviewReport", "jobTitle matchScore createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Applications retrieved successfully",
      applications,
      count: applications.length,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch applications",
    });
  }
};

/**
 * @GET /api/applications/:id
 * @description Get a specific application by ID
 * @access Private
 */
export const getApplicationById = async (req, res) => {
  try {
    const application = await applicationModel
      .findOne({ _id: req.params.id, user: req.user.id })
      .populate("interviewReport");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application retrieved successfully",
      application,
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch application",
    });
  }
};

/**
 * @PUT /api/applications/:id
 * @description Update a specific application
 * @access Private
 */
export const updateApplication = async (req, res) => {
  try {
    const validation = updateApplicationSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.errors,
      });
    }

    const application = await applicationModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      validation.data,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application,
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update application",
    });
  }
};

/**
 * @DELETE /api/applications/:id
 * @description Delete a specific application
 * @access Private
 */
export const deleteApplication = async (req, res) => {
  try {
    const application = await applicationModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete application",
    });
  }
};

/**
 * @GET /api/applications/stats/summary
 * @description Get application statistics
 * @access Private
 */
export const getApplicationStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await applicationModel.find({ user: userId });

    const stats = {
      total: applications.length,
      saved: applications.filter((a) => a.status === "Saved").length,
      applied: applications.filter((a) => a.status === "Applied").length,
      interview: applications.filter((a) => a.status === "Interview").length,
      offer: applications.filter((a) => a.status === "Offer").length,
      rejected: applications.filter((a) => a.status === "Rejected").length,
      responseRate: applications.length > 0
        ? Math.round(
            ((applications.length - applications.filter((a) => a.status === "Saved").length) /
              applications.length) *
              100
          )
        : 0,
      avgMatchScore:
        applications.filter((a) => a.matchScore).length > 0
          ? Math.round(
              applications
                .filter((a) => a.matchScore)
                .reduce((sum, a) => sum + a.matchScore, 0) /
                applications.filter((a) => a.matchScore).length
            )
          : 0,
    };

    return res.status(200).json({
      success: true,
      message: "Statistics retrieved successfully",
      stats,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch statistics",
    });
  }
};
