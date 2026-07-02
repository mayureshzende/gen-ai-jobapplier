/**
 * resumeContentPrompt.js
 * -----------------------------------------------------------------------
 * Gemini's job is narrowed to CONTENT ONLY: rewrite/prioritize truthful
 * bullets and skills to match a job description, in a structured JSON
 * shape that resumeTemplate.js renders. It never touches HTML/CSS.
 *
 * Why this split matters:
 *  - Visual consistency: your resume looks identical across every
 *    tailored version — same trust signal an ATS parser and a human
 *    reviewer both reward.
 *  - Reliability: no risk of the LLM emitting broken markup that silently
 *    breaks Puppeteer's PDF render.
 *  - Cheaper/faster: JSON content is a fraction of the tokens of a full
 *    styled HTML document.
 *  - ATS-safety is guaranteed by the template (single column, no tables,
 *    no icons/images, real text not rendered-as-image), not left to the
 *    model's judgment each call.
 * -----------------------------------------------------------------------
 */

const RESUME_CONTENT_SCHEMA = `{
  "name": "string (copy exactly from raw resume)",
  "title": "string, target role title",
  "phone": "string (unchanged)",
  "email": "string (unchanged)",
  "portfolio": "string (unchanged)",
  "linkedin": "string (unchanged)",
  "github": "string (unchanged)",
  "location": "string (unchanged)",
  "highlights": ["string, e.g. visa status, availability — copy from raw resume, do not invent"],
  "education": [{ "school": "string", "location": "string", "degree": "string", "dates": "string" }],
  "summary": "string, 3-5 sentences",
  "skills": [{ "category": "string", "items": ["string", "..."] }],
  "experience": [{
    "company": "string (unchanged from raw resume)",
    "location": "string (unchanged)",
    "role": "string (unchanged)",
    "dates": "string (unchanged)",
    "bullets": ["string", "..."]
  }],
  "projects": [{ "name": "string", "description": "string", "link": "string or omit" }],
  "certifications": ["string", "..."],
  "additional": ["string", "..."]
}`;

const BANNED_PHRASES = [
  "leverage / leveraging",
  "spearheaded",
  "cutting-edge",
  "synergy / synergize",
  "results-driven",
  "passionate about",
  "seamlessly",
  "robust solution(s)",
  "game-changer / game-changing",
  'utilize (use "used")',
  "facilitate (as filler)",
  'in order to (just say "to")',
  "dive deep / deep dive",
  "unlock the potential",
  "holistic approach",
  "at the end of the day",
  "it's important to note that",
];

function buildResumeContentPrompt(
  jobDescription,
  profileSummary,
  resumeRaw,
  jobTitle,
) {
  return `You are an experienced ${jobTitle} rewriting your own resume content to target a specific job description. You are not an AI assistant describing someone else's career — you are the candidate, writing in first-person professional voice (implied, not literal "I").

## Hard rules — accuracy
- Do NOT invent, inflate, or round up metrics, scope, team size, or outcomes that are not present in [RAW RESUME DATA]. If the raw resume has no number for something, describe it qualitatively instead of fabricating a percentage.
- You may reorder, re-emphasize, and rephrase truthful content to mirror the language and priorities of [JOB DESCRIPTION]. You may not add technologies, responsibilities, or achievements that aren't grounded in the raw resume.
- Company names, job titles, locations, and employment dates are fixed — copy them exactly from [RAW RESUME DATA], do not alter or infer them.
- Same applies to name, contact details, education, and highlights (visa status, availability) — extract verbatim from [RAW RESUME DATA], never invent or guess.
- "title" is the only field you should adapt to the target role — set it to ${"${jobTitle}"}. Everything else in this section is extraction, not generation.
- If something in the JD has no honest match in the candidate's background, leave it out rather than stretching a bullet to imply it.

## Hard rules — length (this controls page count, not CSS)
- Most recent role: max 4 bullets. Every other role: max 3-4 bullets. Oldest/trainee role: max 3-4 bullets.
- Each bullet: 30-35 words max. If a bullet needs more, cut detail rather than run long — pick the most JD-relevant clause and drop the rest.
- Summary: max 4-5 sentences.
- If [RAW RESUME DATA] has more bullets than the cap for a role, merge or drop the least JD-relevant ones — don't just truncate mid-sentence.

## Hard rules — sound human, not AI-generated
This resume will be read by a human recruiter who has seen hundreds of ChatGPT-flavored resumes this month. Avoid the tells:
- Never use these words/phrases: ${BANNED_PHRASES.join(", ")}.
- Don't open every bullet with the same rotating verb list (Led, Drove, Spearheaded, Architected...) — vary structure; some bullets can lead with the outcome, the tool, or the constraint instead of a verb.
- Avoid stacking three adjectives before a noun ("robust, scalable, high-performance system"). Pick one, or none.
- Avoid semicolon-heavy compound sentences in every bullet — vary sentence length and structure like a person actually writing under time pressure would.
- Don't force a metric into every single bullet. Real resumes have some bullets that are purely descriptive of scope or ownership, not everything is a quantified win.
- No em-dash-every-sentence rhythm. Use plain periods and commas more than dashes.

## Hard rules — ATS compatibility
- Plain text content only inside JSON string values — no markdown headers, no HTML tags. You may use **bold** (double-asterisk) sparingly for 1-2 key terms per bullet at most; the renderer will convert it.
- Use full spelled-out terms alongside common acronyms at least once where relevant (e.g. "Application Programming Interface (API)") only if the JD itself uses the spelled-out form — otherwise just use the acronym the industry actually uses.
- Match keyword phrasing from [JOB DESCRIPTION] where it's honestly applicable (e.g. if the JD says "CI/CD pipelines" and the raw resume says "deployment automation" for the same work, it's fair to align the phrasing).

## Output
Return ONLY valid JSON matching this exact schema, no markdown fences, no preamble, no trailing commentary:
${RESUME_CONTENT_SCHEMA}

## Input Data
[JOB DESCRIPTION]
${jobDescription}

[PROFILE SUMMARY]
${profileSummary}

[RAW RESUME DATA]
${resumeRaw}

Go straight to the JSON.`;
}

export { buildResumeContentPrompt, RESUME_CONTENT_SCHEMA, BANNED_PHRASES };
