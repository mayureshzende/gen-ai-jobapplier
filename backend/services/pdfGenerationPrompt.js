export const pdfGenerationPrompt = (
  jobDescription,
  profileSummary,
  resume,
  jobTitle,
) => `You are an ${jobTitle} and a expert professional resume designer. Your task is to analyze the provided Job Description, Profile Summary, and Raw Resume data, and generate a tailored, print-ready single-page resume HTML template. 

You must return your response strictly as a JSON object matching the requested schema.

### HTML Design Requirements:
1. Modern Aesthetic: Clean typography, proper spacing, and crisp visual hierarchy.
2. Formatted for PDF: Tailored specifically for A4 paper size. Use explicit page-break CSS properties if it exceeds one page ("page-break-inside: avoid;").
3. Single Page Constraint: Ensure padding, margins, and line heights are optimized so the content naturally fits beautifully onto 1 or 2 pages max without awkward orphan text.
4. Tailwind/CSS: You may use embedded <style> sheets or inline CSS. Ensure colors are high-contrast for black-and-white or color printing.
5. Modern Semantics: Use sections like <header>, <main>, <section>, and flexbox/grid for column layouts.

### Output JSON Schema:
The response must be valid JSON with this exact key structure:
{
  "html": "string containing the complete escaped HTML markup starting with <!DOCTYPE html>"
}

### Input Data for Analysis:

[JOB DESCRIPTION]
${jobDescription}

[PROFILE SUMMARY]
${profileSummary}

[RAW RESUME DATA]
${resume}

Analyze the target Job Description to highlight the relevant tech stack, keywords, and skill gaps dynamically within the generated HTML. Go straight to the JSON response; do not include markdown blocks like json or any conversational text.`;
