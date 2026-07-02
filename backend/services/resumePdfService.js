/**
 * resumePdfService.js
 * -----------------------------------------------------------------------
 * Renders resume content JSON -> HTML (via resumeTemplate) -> PDF buffer.
 *
 * Fixes vs. the original version:
 *  - Throws on failure instead of swallowing the error and returning
 *    undefined (the original caught the error, logged it, and returned
 *    nothing — callers had no way to detect failure).
 *  - Waits on document.fonts.ready so text doesn't render with fallback
 *    metrics before webfonts finish loading (only matters if you add
 *    @font-face / Google Fonts later — the default stack here is system
 *    fonts so this is mostly a no-op, but it's cheap insurance).
 *  - Launch flags added for headless server/container environments
 *    (no-sandbox is required in most Docker/CI setups; harmless locally).
 *  - Reuses a single browser instance across calls if one is passed in,
 *    so you're not paying Chromium cold-start cost per resume in a
 *    batch/job-search-scale workflow.
 * -----------------------------------------------------------------------
 */

import puppeteer from "puppeteer";
import { buildResumeHTML } from "./resumeTemplate.js";

async function launchBrowser() {
  return puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--font-render-hinting=none", // more consistent PDF text rendering
    ],
  });
}

/**
 * generateResumePDF(resumeData, options?) -> Buffer
 *
 * @param {object} resumeData  Structured resume content (see resumeTemplate.js
 *                              for the expected shape). NOT raw HTML.
 * @param {object} [options]
 * @param {import('puppeteer').Browser} [options.browser]  Reuse an existing
 *        browser instance (recommended if generating many resumes in a
 *        batch, e.g. one per job application).
 */
async function generateResumePDF(resumeData, options = {}) {
  if (!resumeData || typeof resumeData !== "object") {
    throw new Error(
      "generateResumePDF: resumeData must be an object, not raw HTML.",
    );
  }

  const ownsBrowser = !options.browser;
  const browser = options.browser || (await launchBrowser());
  let page;

  try {
    page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123 }); // A4 @ 96dpi — matches print layout width
    await page.emulateMediaType("print");

    const html = buildResumeHTML(resumeData);
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    // Cheap safety net in case fonts are added later.
    await page.evaluateHandle("document.fonts.ready");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true, // respects @page size; margins below are what actually apply
      margin: { top: "10mm", bottom: "12mm", left: "11mm", right: "11mm" },
    });

    return pdfBuffer;
  } finally {
    if (page) await page.close();
    if (ownsBrowser) await browser.close();
  }
}

export { generateResumePDF, launchBrowser };
