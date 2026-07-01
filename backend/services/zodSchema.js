import { z } from "zod";

export const technicalQuestionZodSchema = z.object({
  question: z.string(),
  answer: z.string(), // Preserved original capital 'A'
  intention: z.string(),
});

// 2. Behavioral Questions Schema
export const behavioralQuestionZodSchema = z.object({
  question: z.string(),
  answer: z.string(),
  intention: z.string(),
});

// 3. Skill Gaps Schema
export const skillGapZodSchema = z.object({
  skill: z.string(),
  severity: z.enum(["low", "medium", "high"]),
});

// 4. Preparation Plan Schema
export const preparationPlanZodSchema = z.object({
  focus: z.string(),
  days: z.number(),
  plan: z.string(),
});

// 5. Main Interview Report Schema
export const interviewReportZodSchema = z.object({
  jobTitle: z.string({
    required_error: "Job Title is required",
  }),
  profileSummary: z.string({
    required_error: "Profile Summary is required",
  }),
  jobDescription: z.string({
    required_error: "Job Description is required",
  }),
  matchScore: z.number().min(0).max(100),

  // Array structures are inherently required/initialized as empty arrays by Mongoose
  technicalQuestions: z.array(technicalQuestionZodSchema),
  behavioralQuestions: z.array(behavioralQuestionZodSchema),
  skillGaps: z.array(skillGapZodSchema),
  preparationPlan: z.array(preparationPlanZodSchema),
});

// Re-using your exact sub-schemas
const workExperienceZodSchema = z.object({
  company: z.string({ required_error: "Company name is required" }),
  position: z.string({ required_error: "Job title/position is required" }),
  location: z.string().optional(),
  startDate: z.string({ required_error: "Start date is required" }),
  endDate: z.string({ required_error: "End date or 'Present' is required" }),
  highlights: z
    .array(z.string())
    .min(1, "Provide at least one bullet point detailing achievements"),
});

const projectZodSchema = z.object({
  name: z.string({ required_error: "Project name is required" }),
  description: z.string({ required_error: "Project description is required" }),
  techStack: z.array(z.string()).min(1, "List at least one technology used"),
  url: z.string().url().optional().or(z.literal("")),
});

const educationZodSchema = z.object({
  institution: z.string({ required_error: "Institution name is required" }),
  degree: z.string({ required_error: "Degree/Certification is required" }),
  location: z.string().optional(),
  graduationDate: z.string({ required_error: "Graduation date is required" }),
});

const resumeSkillsZodSchema = z.object({
  languages: z.array(z.string()).min(1, "List at least one language"),
  frameworks: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  softSkills: z.array(z.string()).optional(),
});

// The master wrapper schema you pass to Gemini's config
export const geminiPdfHtmlSchema = z.object({
  // 1. The layout engine string that Puppeteer reads
  html: z.string({ required_error: "HTML payload string is required" }),

  // 2. The data structure used to generate that HTML (Allows saving data separately to your database)
  tailoredData: z.object({
    jobTitle: z.string(),
    professionalSummary: z.string(),
    workExperience: z.array(workExperienceZodSchema),
    projects: z.array(projectZodSchema),
    education: z.array(educationZodSchema),
    skills: resumeSkillsZodSchema,
  }),
});
