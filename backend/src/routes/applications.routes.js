import { Router } from "express";
import authUserMiddleware from "../middleware/auth.middleware.js";
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getApplicationStats,
} from "../controller/applications.controller.js";

const router = Router();

// All routes require authentication
router.use(authUserMiddleware);

// CRUD routes
router.post("/", createApplication);
router.get("/", getApplications);
router.get("/stats/summary", getApplicationStats);
router.get("/:id", getApplicationById);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
