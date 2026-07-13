import profileModel from "../models/profile.model.js";
import { createProfileSchema, updateProfileSchema } from "../services/validationSchemas.js";

/**
 * @GET /api/profile
 * @description Get user's profile or create default if doesn't exist
 * @access Private
 */
export const getProfile = async (req, res) => {
  try {
    let profile = await profileModel.findOne({ user: req.user.id });

    if (!profile) {
      profile = await profileModel.create({
        user: req.user.id,
        summary: "",
        skills: [],
        experience: [],
        education: [],
        certifications: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      profile,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch profile",
    });
  }
};

/**
 * @POST /api/profile
 * @description Create or update user's profile (upsert)
 * @access Private
 */
export const upsertProfile = async (req, res) => {
  try {
    const validation = createProfileSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.errors,
      });
    }

    const profile = await profileModel.findOneAndUpdate(
      { user: req.user.id },
      {
        user: req.user.id,
        ...validation.data,
      },
      { upsert: true, new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      profile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};

/**
 * @PUT /api/profile/summary
 * @description Update profile summary
 * @access Private
 */
export const updateSummary = async (req, res) => {
  try {
    const { summary } = req.body;

    if (typeof summary !== "string") {
      return res.status(400).json({
        success: false,
        message: "Summary must be a string",
      });
    }

    const profile = await profileModel.findOneAndUpdate(
      { user: req.user.id },
      { summary },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Summary updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Error updating summary:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update summary",
    });
  }
};

/**
 * @PUT /api/profile/skills
 * @description Update profile skills
 * @access Private
 */
export const updateSkills = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: "Skills must be an array",
      });
    }

    const profile = await profileModel.findOneAndUpdate(
      { user: req.user.id },
      { skills: skills.filter((s) => typeof s === "string") },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Skills updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Error updating skills:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update skills",
    });
  }
};

/**
 * @POST /api/profile/experience
 * @description Add a new experience entry
 * @access Private
 */
export const addExperience = async (req, res) => {
  try {
    const { role, company, startDate, endDate, currentlyWorking, description, bullets } = req.body;

    if (!role || !company) {
      return res.status(400).json({
        success: false,
        message: "Role and company are required",
      });
    }

    const profile = await profileModel.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: {
          experience: {
            role,
            company,
            startDate,
            endDate,
            currentlyWorking,
            description,
            bullets,
          },
        },
      },
      { upsert: true, new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Experience added successfully",
      profile,
    });
  } catch (error) {
    console.error("Error adding experience:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add experience",
    });
  }
};

/**
 * @PUT /api/profile/experience/:expId
 * @description Update an experience entry
 * @access Private
 */
export const updateExperience = async (req, res) => {
  try {
    const { expId } = req.params;
    const updateData = req.body;

    const profile = await profileModel.findOneAndUpdate(
      { user: req.user.id, "experience._id": expId },
      {
        $set: {
          "experience.$": {
            _id: expId,
            ...updateData,
          },
        },
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Error updating experience:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update experience",
    });
  }
};

/**
 * @DELETE /api/profile/experience/:expId
 * @description Delete an experience entry
 * @access Private
 */
export const deleteExperience = async (req, res) => {
  try {
    const { expId } = req.params;

    const profile = await profileModel.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { experience: { _id: expId } } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
      profile,
    });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete experience",
    });
  }
};

/**
 * @POST /api/profile/certifications
 * @description Add a new certification
 * @access Private
 */
export const addCertification = async (req, res) => {
  try {
    const { name, issuer, issueDate, expirationDate, credentialUrl } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Certification name is required",
      });
    }

    const profile = await profileModel.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: {
          certifications: {
            name,
            issuer,
            issueDate,
            expirationDate,
            credentialUrl,
          },
        },
      },
      { upsert: true, new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Certification added successfully",
      profile,
    });
  } catch (error) {
    console.error("Error adding certification:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add certification",
    });
  }
};

/**
 * @DELETE /api/profile/certifications/:certId
 * @description Delete a certification
 * @access Private
 */
export const deleteCertification = async (req, res) => {
  try {
    const { certId } = req.params;

    const profile = await profileModel.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { certifications: { _id: certId } } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Certification deleted successfully",
      profile,
    });
  } catch (error) {
    console.error("Error deleting certification:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete certification",
    });
  }
};
