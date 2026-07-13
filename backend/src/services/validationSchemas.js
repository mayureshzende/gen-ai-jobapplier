import { z } from "zod";

// Application validation
export const createApplicationSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Job role is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().optional(),
  status: z.enum(["Saved", "Applied", "Interview", "Offer", "Rejected"]).default("Saved"),
  source: z.enum(["LinkedIn", "Indeed", "Referral", "Other"]).default("LinkedIn"),
  jobDescription: z.string().min(1, "Job description is required"),
});

export const updateApplicationSchema = createApplicationSchema.partial();

// Profile validation
export const createProfileSchema = z.object({
  summary: z.string().max(1000).optional(),
  skills: z.array(z.string()).optional(),
  experience: z.array(
    z.object({
      role: z.string().min(1),
      company: z.string().min(1),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      currentlyWorking: z.boolean().optional(),
      description: z.string().optional(),
      bullets: z.array(z.string()).optional(),
    })
  ).optional(),
  education: z.array(
    z.object({
      school: z.string().optional(),
      degree: z.string().optional(),
      fieldOfStudy: z.string().optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    })
  ).optional(),
  certifications: z.array(
    z.object({
      name: z.string().optional(),
      issuer: z.string().optional(),
      issueDate: z.date().optional(),
      expirationDate: z.date().optional(),
      credentialUrl: z.string().url().optional(),
    })
  ).optional(),
});

export const updateProfileSchema = createProfileSchema.partial();
