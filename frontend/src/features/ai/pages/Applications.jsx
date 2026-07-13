import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApplications } from '../hooks/useApplications';
import { useProfile } from '../hooks/useProfile';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import FormField from '../../../components/ui/FormField';
import SegmentedControl from '../../../components/ui/SegmentedControl';
import { formatDateShort } from '../../../lib/dateUtils';

const AddApplication = () => {
  const navigate = useNavigate();
  const { addApplication } = useApplications();
  const { profile } = useProfile();
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    salary: '',
    status: 'Applied',
    source: 'LinkedIn',
    jobDescription: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSourceChange = (value) => {
    setFormData(prev => ({ ...prev, source: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.role.trim()) {
      newErrors.role = 'Job role is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log("[AddApplication] Submitting form:", formData);
      const result = await addApplication(formData);
      console.log("[AddApplication] Application created:", result._id);
      navigate('/dashboard');
    } catch (err) {
      console.error("[AddApplication] Error:", err.message);
      setErrors({ submit: err?.response?.data?.message || err.message || 'Failed to save application' });
    }
  };

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">
        <h6 className="text-accent text-xs font-semibold uppercase mb-2">Applications</h6>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Add New Application</h2>
        <p className="text-text-secondary text-sm mb-6 sm:mb-8">Track a new job application to get AI-powered interview preparation.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* LEFT COLUMN - Form */}
          <div className="col-span-1 lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.submit && (
            <div className="text-xs text-status-rejected bg-status-rejected/10 p-3 rounded-md">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FormField label="Company" htmlFor="company" required error={errors.company}>
              <Input
                id="company"
                name="company"
                placeholder="Google"
                value={formData.company}
                onChange={handleChange}
                invalid={!!errors.company}
              />
            </FormField>
            <FormField label="Role" htmlFor="role" required error={errors.role}>
              <Input
                id="role"
                name="role"
                placeholder="Senior Frontend Engineer"
                value={formData.role}
                onChange={handleChange}
                invalid={!!errors.role}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FormField label="Location" htmlFor="location" required error={errors.location}>
              <Input
                id="location"
                name="location"
                placeholder="San Francisco, CA"
                value={formData.location}
                onChange={handleChange}
                invalid={!!errors.location}
              />
            </FormField>
            <FormField label="Salary Range" htmlFor="salary">
              <Input
                id="salary"
                name="salary"
                placeholder="$150k - $200k"
                value={formData.salary}
                onChange={handleChange}
              />
            </FormField>
          </div>

          <FormField label="Status" htmlFor="status">
            <Select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="Saved">Saved</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </Select>
          </FormField>

          <div>
            <label className="text-xs font-medium text-text-secondary block mb-3">Source</label>
            <SegmentedControl
              options={[
                { label: 'LinkedIn', value: 'LinkedIn' },
                { label: 'Indeed', value: 'Indeed' },
                { label: 'Referral', value: 'Referral' },
                { label: 'Other', value: 'Other' },
              ]}
              value={formData.source}
              onChange={handleSourceChange}
              name="source"
            />
          </div>

          <FormField label="Job Description" htmlFor="jobDescription" required error={errors.jobDescription}>
            <Textarea
              id="jobDescription"
              name="jobDescription"
              placeholder="Paste the full job description here..."
              value={formData.jobDescription}
              onChange={handleChange}
              rows={8}
              invalid={!!errors.jobDescription}
            />
          </FormField>

          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Application
            </Button>
          </div>
        </form>
          </div>

          {/* RIGHT COLUMN - Your Experience */}
          <div className="col-span-1">
            <div className="bg-surface/60 rounded-lg p-4 sm:p-5 border border-divider lg:sticky lg:top-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-accent mb-4">Your Experience</h3>

              {profile && profile.experience && profile.experience.length > 0 ? (
                <div className="space-y-3">
                  {profile.experience.map((exp, idx) => (
                    <div key={exp._id} className="pb-3 border-b border-divider last:border-b-0 last:pb-0">
                      <div className="text-xs font-semibold text-text">{exp.role}</div>
                      <div className="text-xs text-accent">{exp.company}</div>
                      {exp.startDate && (
                        <div className="text-xs text-text-secondary mt-1">
                          {formatDateShort(exp.startDate)}
                          {exp.endDate && ` - ${formatDateShort(exp.endDate)}`}
                          {exp.currentlyWorking && ' (Present)'}
                        </div>
                      )}
                      {exp.description && (
                        <p className="text-xs text-text-secondary leading-relaxed mt-2">{exp.description.substring(0, 100)}...</p>
                      )}
                    </div>
                  ))}

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/profile')}
                    className="w-full mt-4"
                  >
                    Edit Experience
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-xs text-text-secondary mb-3">No experience added yet</p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/profile')}
                    className="w-full"
                  >
                    Add Experience
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddApplication;