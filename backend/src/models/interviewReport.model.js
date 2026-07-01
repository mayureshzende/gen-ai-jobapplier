import mongoose from "mongoose";
const technicalQuestionsSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    intention: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const behavioralQuestionsSechema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    intention: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const skillGapsSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
  },
  { _id: false },
);

const preparationPlanSchema = new mongoose.Schema({
  focus: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
});
const interviewReportSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, "Job Title is required"],
    },
    profileSummary: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: [true, "Job Description is required"],
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    resume: {
      type: String,
      required: true,
    },
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSechema],
    skillGaps: [skillGapsSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = mongoose.model(
  "InterviewModel",
  interviewReportSchema,
);

export default interviewReportModel;
