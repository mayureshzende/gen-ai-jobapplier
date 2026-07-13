import "dotenv/config";
import puppeteer from "puppeteer";
import { GoogleGenAI } from "@google/genai";
import { interviewReportPrompt } from "./interviewReportPromt.js";
import { buildResumeContentPrompt } from "./pdfGenerationPrompt.js";
import { z } from "zod";
import { interviewReportZodSchema } from "./zodSchema.js";
import { generateResumePDF } from "./resumePdfService.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateInterviewReport = async ({
  resume,
  jobDescription,
  profileSummary,
}) => {
  try {
    console.log("[generateInterviewReport] Starting AI report generation");
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
    console.log("[generateInterviewReport] Report generated successfully");
    return reportJson;
  } catch (err) {
    console.error("[generateInterviewReport] Error generating report:", err?.message);
    throw err;
  }
};

// const generateResumePDF = async (resumeJsonContent) => {
//   try {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     if (!resumeJsonContent.html) {
//       console.log("error in the ", resumeJsonContent);
//       throw new Error("The AI response did not contain an 'html' property.");
//     }
//     // Set content directly from Gemini's output
//     await page.setContent(resumeJsonContent.html, {
//       waitUntil: "networkidle0",
//     });

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true, // Crucial for CSS backgrounds/colors to show up
//       margin: {
//         top: "0mm", // Try 0mm to see if the "odd space" goes away
//         bottom: "0mm",
//         left: "0mm",
//         right: "0mm",
//       },
//     });

//     await browser.close();

//     // 5. Send back the PDF stream or buffer
//     // res.contentType("application/pdf");
//     return pdfBuffer;
//   } catch (err) {
//     console.error("error in generating the pdf", err);
//   }
// };

const generatePDF = async (interviewReport) => {
  try {
    console.log("[generatePDF] Starting PDF generation");
    const { resume, jobTitle, profileSummary, jobDescription } =
      interviewReport;
    const prompt = buildResumeContentPrompt(
      jobDescription,
      profileSummary,
      resume,
      jobTitle,
    );
    console.log("[generatePDF] Generated prompt, calling Gemini API");
    const generatePDFContentJson = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        //   responseJsonSchema: z.toJSONSchema(geminiPdfHtmlSchema),
      },
    });
    console.log("[generatePDF] Received Gemini response, parsing JSON");
    const jsonContent =
      typeof generatePDFContentJson.text === "string"
        ? JSON.parse(generatePDFContentJson.text)
        : generatePDFContentJson.text;

    // const validatedJson = geminiPdfHtmlSchema.parse(jsonContent);

    // const resumeData = {
    //   ...jsonContent, // summary, skills, experience, projects, certifications, additional
    // };

    console.log("[generatePDF] Calling generateResumePDF");
    const pdfBuffer = await generateResumePDF(jsonContent);
    console.log("[generatePDF] PDF generated successfully, size:", pdfBuffer?.length);
    return pdfBuffer;
  } catch (err) {
    console.error("[generatePDF] Error generating PDF:", err?.message);
    console.error("[generatePDF] Error details:", err);
    throw err;
  }
};
export { generateInterviewReport, generatePDF };
