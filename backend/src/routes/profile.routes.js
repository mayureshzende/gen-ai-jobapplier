import { Router } from "express";
import authUserMiddleware from "../middleware/auth.middleware.js";
import {
  getProfile,
  upsertProfile,
  updateSummary,
  updateSkills,
  addExperience,
  updateExperience,
  deleteExperience,
  addCertification,
  deleteCertification,
} from "../controller/profile.controller.js";

const router = Router();

// All routes require authentication
router.use(authUserMiddleware);

// Profile routes
router.get("/", getProfile);
router.post("/", upsertProfile);
router.put("/summary", updateSummary);
router.put("/skills", updateSkills);

// Experience routes
router.post("/experience", addExperience);
router.put("/experience/:expId", updateExperience);
router.delete("/experience/:expId", deleteExperience);

// Certification routes
router.post("/certifications", addCertification);
router.delete("/certifications/:certId", deleteCertification);

export default router;
