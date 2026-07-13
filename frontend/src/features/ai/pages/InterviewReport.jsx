import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useInterview } from '../hooks/useInterview';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Tag from '../../../components/ui/Tag';
import PageSkeleton from '../../../components/ui/PageSkeleton';
import { tintStyle, SEVERITY_META, scoreMeta } from '../../../lib/statusMeta';
import { formatDateLong } from '../../../lib/dateUtils';

const InterviewReport = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { loading, getReportbyId, report, generatePDFforReportId } = useInterview();
  const [resumeOpen, setResumeOpen] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(interviewId ? '' : 'No report ID provided');

  console.log("[InterviewReport] Mount - interviewId:", interviewId, "loading:", loading, "report:", report?._id);

  useEffect(() => {
    console.log("[InterviewReport] useEffect - interviewId:", interviewId, "report:", report?._id);
    if (!interviewId) {
      console.log("[InterviewReport] No interviewId, skipping fetch");
      return;
    }
    console.log("[InterviewReport] Fetching report for id:", interviewId);
    getReportbyId(interviewId).catch((err) => {
      console.error("[InterviewReport] Error fetching report:", err);
      setError(err?.message || 'Failed to load report');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId]);

  const handleDownloadPDF = async () => {
    if (!interviewId) {
      console.error("[InterviewReport] Cannot download: report ID missing");
      return;
    }
    setDownloading(true);
    try {
      console.log("[InterviewReport] Starting PDF download");
      await generatePDFforReportId(interviewId);
      console.log("[InterviewReport] PDF downloaded successfully");
    } catch (err) {
      console.error("[InterviewReport] PDF download error:", err?.message);
      // Show a notification but don't hide the report
      alert(`Failed to download PDF: ${err?.message || 'Network error. Please try again.'}`);
    } finally {
      setDownloading(false);
    }
  };

  const reportDate = useMemo(() => {
    if (!report?.createdAt) return formatDateLong(new Date());
    return formatDateLong(report.createdAt);
  }, [report]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Unable to Load Report</h2>
          <p className="text-text-secondary mb-6">{error}</p>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Report Not Found</h2>
          <p className="text-text-secondary mb-6">The interview report you requested does not exist.</p>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">{report?.jobTitle || 'Interview Report'}</h1>
            <p className="text-xs sm:text-sm text-text-secondary">
              {report?.companyName && <span>{report.companyName} • </span>}
              Generated {reportDate}
            </p>
          </div>
          <div className="text-right w-full sm:w-auto">
            <div className="text-2xl sm:text-4xl font-bold mb-2" style={{ color: `var(${report?.matchScore ? scoreMeta(report.matchScore) : 'var(--color-text)'})` }}>
              {report?.matchScore || 0}%
            </div>
            <Button variant="primary" onClick={handleDownloadPDF} disabled={downloading} size="sm">
              {downloading ? 'Preparing...' : 'Download Resume'}
            </Button>
          </div>
        </div>

        {/* Profile & Job Description */}
        {(report?.profileSummary || report?.jobDescription) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {report?.profileSummary && (
              <Card elevation="sm">
                <Card.Kicker>Profile Summary Used</Card.Kicker>
                <Card.Body className="text-xs mt-2">{report.profileSummary}</Card.Body>
              </Card>
            )}
            {report?.jobDescription && (
              <Card elevation="sm">
                <Card.Kicker>Job Description</Card.Kicker>
                <Card.Body className="text-xs mt-2">{report.jobDescription.substring(0, 300)}...</Card.Body>
              </Card>
            )}
          </div>
        )}

        {/* Generated Resume */}
        {report?.resume && (
          <div className="mb-6 sm:mb-8">
            <button
              onClick={() => setResumeOpen(!resumeOpen)}
              className="flex items-center gap-2 font-semibold text-xs sm:text-sm mb-3 sm:mb-4 text-text hover:text-accent transition-colors"
            >
              <span>{resumeOpen ? '▼' : '▶'}</span>
              Generated Resume
            </button>
            {resumeOpen && (
              <Card elevation="sm">
                <pre className="text-xs whitespace-pre-wrap font-mono overflow-auto">{report.resume.substring(0, 500)}...</pre>
              </Card>
            )}
          </div>
        )}

        {/* Skill Gaps */}
        {report.skillGaps && report.skillGaps.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="font-semibold text-sm mb-3 sm:mb-4">Skill Gaps</h3>
            <div className="flex flex-wrap gap-2">
              {report.skillGaps.map((gap, i) => (
                <Tag
                  key={i}
                  variant="status"
                  style={tintStyle(SEVERITY_META[gap.severity])}
                >
                  {gap.skill} · {gap.severity}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {/* Preparation Plan */}
        {report.preparationPlan && report.preparationPlan.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="font-semibold text-sm mb-3 sm:mb-4">Preparation Plan</h3>
            <div className="space-y-2 sm:space-y-3">
              {report.preparationPlan.map((item, i) => (
                <div key={i} className="border border-divider rounded-md p-3 sm:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4">
                    <div>
                      <div className="text-lg sm:text-2xl font-bold text-accent">{item.days}d</div>
                    </div>
                    <div className="col-span-1 sm:col-span-3">
                      <div className="font-semibold text-xs sm:text-sm">{item.focus}</div>
                      <div className="text-xs text-text-secondary mt-1">{item.plan}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Questions */}
        {report.technicalQuestions && report.technicalQuestions.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="font-semibold text-sm mb-3 sm:mb-4">Technical Questions</h3>
            <div className="space-y-2 sm:space-y-4">
              {report.technicalQuestions.map((q, i) => (
                <Card key={i} elevation="sm">
                  <div className="font-semibold text-xs sm:text-sm mb-2 text-accent">Q{i + 1}: {q.question}</div>
                  <div className="text-xs sm:text-sm mb-2 sm:mb-3">
                    <div className="font-medium text-xs text-text-secondary mb-1">Answer:</div>
                    <div className="text-xs">{q.answer}</div>
                  </div>
                  <div className="text-xs text-text-secondary border-t border-divider pt-2">
                    <div className="font-medium mb-1">Why we ask:</div>
                    {q.intention}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Behavioral Questions */}
        {report.behavioralQuestions && report.behavioralQuestions.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="font-semibold text-sm mb-3 sm:mb-4">Behavioral Questions</h3>
            <div className="space-y-2 sm:space-y-4">
              {report.behavioralQuestions.map((q, i) => (
                <Card key={i} elevation="sm">
                  <div className="font-semibold text-xs sm:text-sm mb-2 text-accent">Q{i + 1}: {q.question}</div>
                  <div className="text-xs sm:text-sm mb-2 sm:mb-3">
                    <div className="font-medium text-xs text-text-secondary mb-1">Answer:</div>
                    <div className="text-xs">{q.answer}</div>
                  </div>
                  <div className="text-xs text-text-secondary border-t border-divider pt-2">
                    <div className="font-medium mb-1">Why we ask:</div>
                    {q.intention}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewReport;
