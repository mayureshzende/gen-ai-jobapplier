import "dotenv/config";
import puppeteer from "puppeteer";
import { GoogleGenAI } from "@google/genai";
import { interviewReportPrompt } from "./interviewReportPromt.js";
import { pdfGenerationPrompt } from "./pdfGenerationPrompt.js";
import { z } from "zod";
import { geminiPdfHtmlSchema, interviewReportZodSchema } from "./zodSchema.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateInterviewReport = async ({
  resume,
  jobDescription,
  profileSummary,
}) => {
  try {
    const interaction = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      // Provide the context to the model via contents
      contents: interviewReportPrompt({
        resume,
        jobDescription,
        profileSummary,
      }),
      config: {
        responseMimeType: "application/json",
        responseSchema: z.toJSONSchema(interviewReportZodSchema),
      },
    });

    // The output is guaranteed to be a stringified valid JSON object matching schema
    const reportJson = JSON.parse(interaction.text);
    return reportJson;
  } catch (err) {
    console.error("error while generating the report", err);
  }
};

const generateResumePDF = async (resumeJsonContent) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    if (!resumeJsonContent.html) {
      console.log("error in the ", resumeJsonContent);
      throw new Error("The AI response did not contain an 'html' property.");
    }
    // Set content directly from Gemini's output
    await page.setContent(resumeJsonContent.html, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true, // Crucial for CSS backgrounds/colors to show up
      margin: {
        top: "2mm", // Try 0mm to see if the "odd space" goes away
        bottom: "2mm",
        left: "3mm",
        right: "3mm",
      },
    });

    await browser.close();

    // 5. Send back the PDF stream or buffer
    // res.contentType("application/pdf");
    return pdfBuffer;
  } catch (err) {
    console.error("error in generating the pdf", err);
  }
};

const generatePDF = async (interviewReport) => {
  try {
    const { resume, jobTitle, profileSummary, jobDescription } =
      interviewReport;

    const generatePDFContentJson = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // model: "gemini-3.5-flash",
      contents: pdfGenerationPrompt(
        jobDescription,
        profileSummary,
        resume,
        jobTitle,
      ),
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: z.toJSONSchema(geminiPdfHtmlSchema),
      },
    });
    console.log("the response of json is -> ", generatePDFContentJson.text);
    const jsonContent =
      typeof generatePDFContentJson.text === "string"
        ? JSON.parse(generatePDFContentJson.text)
        : generatePDFContentJson.text;

    const validatedJson = geminiPdfHtmlSchema.parse(jsonContent);
    const pdfBuffer = await generateResumePDF(validatedJson);
    return pdfBuffer;
  } catch (err) {
    console.error("error generating the PDF", err);
  }
};
export { generateInterviewReport, generatePDF };
