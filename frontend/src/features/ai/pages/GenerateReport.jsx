import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useInterview } from '../hooks/useInterview';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import FormField from '../../../components/ui/FormField';
import Tag from '../../../components/ui/Tag';
import Card from '../../../components/ui/Card';
import PageSkeleton from '../../../components/ui/PageSkeleton';

const GenerateReport = () => {
  const navigate = useNavigate();
  const { uploadCvandGetReport, loading, reports } = useInterview();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');

  const canGenerate = jobDescription.trim() && (resumeFile || selfDescription.trim());

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setResumeFile(null);
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file');
      setResumeFile(null);
      return;
    }

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setError('File size must be under 50MB');
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canGenerate) return;

    try {
      setError('');
      const profileSummary = selfDescription || resumeFile?.name;

      if (!resumeFile && !selfDescription.trim()) {
        setError('Please provide either a resume or self-description');
        return;
      }

      if (!jobDescription.trim()) {
        setError('Please provide a job description');
        return;
      }

      const result = await uploadCvandGetReport(resumeFile, jobDescription, profileSummary);

      if (result && result._id) {
        // Report was saved successfully, navigate to it
        navigate(`/interview/${result._id}`);
      } else if (result?.aiResponse && result.aiResponse._id) {
        // Fallback in case response shape is nested
        navigate(`/interview/${result.aiResponse._id}`);
      } else {
        setError('Report generated but could not navigate. Please try refreshing.');
      }
    } catch (err) {
      console.error('Error generating report:', err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Failed to generate report. Please try again.'
      );
    }
  };

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <div className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Generate Interview Strategy</h2>

        <div className="grid grid-cols-2 gap-8">
          {/* Left: Input Form */}
          <div className="space-y-6">
            <FormField label="Job Description" htmlFor="jd" required hint={`${jobDescription.length} / 5000 chars`}>
              <Textarea
                id="jd"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value.slice(0, 5000))}
                rows={6}
                maxLength={5000}
              />
            </FormField>

            <FormField label="Company Name (Optional)" htmlFor="company">
              <Input id="company" placeholder="Google" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </FormField>

            <div className="border-2 border-dashed border-divider rounded-lg p-6 text-center cursor-pointer hover:border-accent transition-colors">
              <input
                type="file"
                id="resume"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="resume" className="cursor-pointer block">
                <div className="text-4xl mb-2">📄</div>
                <div className="font-medium text-sm">{resumeFile ? resumeFile.name : 'Upload Resume (PDF)'}</div>
                <div className="text-xs text-text-secondary mt-1">or drag and drop</div>
              </label>
            </div>

            <div className="text-center text-xs text-text-secondary">OR</div>

            <FormField label="Quick Description" htmlFor="self" hint="Describe your experience briefly">
              <Textarea
                id="self"
                placeholder="Tell us about your professional background..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                rows={4}
              />
            </FormField>

            {error && <div className="text-xs text-status-rejected bg-status-rejected/10 p-3 rounded-md">{error}</div>}

            <Button
              variant="primary"
              className="w-full"
              onClick={handleSubmit}
              disabled={!canGenerate || loading}
            >
              {loading ? 'Generating...' : 'Generate My Interview Strategy'}
            </Button>
          </div>

          {/* Right: Recent Reports */}
          <div>
            <h3 className="font-semibold mb-4">My Recent Interview Plans</h3>
            <div className="space-y-3">
              {!reports || reports.length === 0 ? (
                <div className="text-sm text-text-secondary text-center py-8">No reports yet</div>
              ) : (
                reports.map((report) => (
                  <Card
                    key={report._id}
                    interactive
                    as="a"
                    href={`/interview/${report._id}`}
                    onClick={() => navigate(`/interview/${report._id}`)}
                  >
                    <Card.Title className="text-sm">{report.jobTitle}</Card.Title>
                    <Card.Meta className="text-xs mt-2">
                      <span>Generated {new Date(report.createdAt).toLocaleDateString()}</span>
                      <Tag variant="status" style={{ backgroundColor: `var(${report.matchScore >= 80 ? '--status-offer' : report.matchScore >= 60 ? '--status-interview' : '--status-rejected'})`, color: 'white' }}>
                        {report.matchScore}%
                      </Tag>
                    </Card.Meta>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
