import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApplications } from '../../applications/hooks/useApplications';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import FormField from '../../../components/ui/FormField';
import SegmentedControl from '../../../components/ui/SegmentedControl';

const AddApplication = () => {
  const navigate = useNavigate();
  const { addApplication } = useApplications();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      addApplication(formData);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to save application' });
    }
  };

  return (
    <div className="px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <h6 className="text-accent text-xs font-semibold uppercase mb-2">Applications</h6>
        <h2 className="text-2xl font-bold mb-2">Add New Application</h2>
        <p className="text-text-secondary text-sm mb-8">Track a new job application to get AI-powered interview preparation.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.submit && (
            <div className="text-xs text-status-rejected bg-status-rejected/10 p-3 rounded-md">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
};

export default AddApplication;