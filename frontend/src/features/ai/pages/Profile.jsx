import { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../../auth/hooks/useAuth';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import FormField from '../../../components/ui/FormField';
import Card from '../../../components/ui/Card';
import PageSkeleton from '../../../components/ui/PageSkeleton';
import { formatDateShort, dateToMonthYear, monthYearToDate } from '../../../lib/dateUtils';

const Profile = () => {
  const { user, handleUpdateUserInfo } = useAuth();
  const { profile, loading, error, updateSummary, updateSkills, addExperience, deleteExperience, reorderExperience, addCertification, deleteCertification } = useProfile();
  const [editingSection, setEditingSection] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  if (loading) return <PageSkeleton />;

  if (error) {
    return (
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Profile</h2>
          <p className="text-text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) return <PageSkeleton />;

  const handleEditStart = (section, data) => {
    setEditingSection(section);
    setTempData(JSON.parse(JSON.stringify(data)));
    setErrors({});
  };

  const handleEditCancel = () => {
    setEditingSection(null);
    setTempData(null);
    setErrors({});
  };

  const validateAndSaveSummary = async () => {
    const newErrors = {};
    if (!tempData.summary.trim()) {
      newErrors.summary = 'Summary cannot be empty';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      await updateSummary(tempData.summary);
      setEditingSection(null);
      setTempData(null);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSaving(false);
    }
  };

  const validateAndSaveSkills = async () => {
    const newErrors = {};
    const skills = tempData.skills.filter(s => s.trim());
    if (skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      await updateSkills(skills);
      setEditingSection(null);
      setTempData(null);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleAddExperience = async () => {
    const newErrors = {};
    if (!tempData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    if (!tempData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      await addExperience(tempData);
      setEditingSection(null);
      setTempData(null);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleAddCertification = async () => {
    const newErrors = {};
    if (!tempData.name.trim()) {
      newErrors.name = 'Certification name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      await addCertification(tempData);
      setEditingSection(null);
      setTempData(null);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSaving(false);
    }
  };

  const validateAndSaveUserInfo = async () => {
    console.log("[Profile] validateAndSaveUserInfo - Starting");
    setSaving(true);
    setErrors({});
    try {
      console.log("[Profile] validateAndSaveUserInfo - Starting update");
      const result = await handleUpdateUserInfo({
        firstName: tempData.firstName,
        middleName: tempData.middleName,
        lastName: tempData.lastName,
      });
      console.log("[Profile] validateAndSaveUserInfo - Update successful:", result);
      console.log("[Profile] validateAndSaveUserInfo - Clearing form state");
      setEditingSection(null);
      setTempData(null);
      setErrors({});
      console.log("[Profile] validateAndSaveUserInfo - Form state cleared");
    } catch (err) {
      console.error("[Profile] validateAndSaveUserInfo - Error:", err?.message || err);
      const errorMsg = err?.response?.data?.message || err?.message || 'Failed to update information';
      console.log("[Profile] validateAndSaveUserInfo - Setting error:", errorMsg);
      setErrors({ submit: errorMsg });
    } finally {
      console.log("[Profile] validateAndSaveUserInfo - Finally block, setting saving to false");
      setSaving(false);
      console.log("[Profile] validateAndSaveUserInfo - Complete");
    }
  };

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
            {[user?.firstName, user?.middleName, user?.lastName].filter(Boolean).join(' ') || user?.username || 'Profile'}
          </h1>
          <p className="text-text-secondary">Professional Profile & Resume</p>
        </div>

        {/* Personal Information Card */}
        <div className="mb-6 sm:mb-8 bg-surface/50 border border-divider rounded-lg p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
            <h3 className="text-sm font-bold uppercase tracking-wide text-accent">Personal Information</h3>
            {editingSection !== 'personal-info' && (
              <button
                onClick={() => handleEditStart('personal-info', {
                  firstName: user?.firstName || '',
                  middleName: user?.middleName || '',
                  lastName: user?.lastName || '',
                })}
                className="text-xs text-accent hover:text-accent/80 transition-colors"
              >
                Edit
              </button>
            )}
          </div>

          {editingSection === 'personal-info' ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField label="First Name" htmlFor="firstName">
                  <Input
                    id="firstName"
                    placeholder="Jane"
                    value={tempData.firstName}
                    onChange={(e) => setTempData({ ...tempData, firstName: e.target.value })}
                  />
                </FormField>
                <FormField label="Middle Name" htmlFor="middleName">
                  <Input
                    id="middleName"
                    placeholder="Marie"
                    value={tempData.middleName}
                    onChange={(e) => setTempData({ ...tempData, middleName: e.target.value })}
                  />
                </FormField>
                <FormField label="Last Name" htmlFor="lastName">
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={tempData.lastName}
                    onChange={(e) => setTempData({ ...tempData, lastName: e.target.value })}
                  />
                </FormField>
              </div>
              {errors.submit && <div className="text-xs text-status-rejected">{errors.submit}</div>}
              <div className="flex gap-2 justify-end">
                <Button variant="secondary" size="sm" onClick={handleEditCancel} disabled={saving}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={validateAndSaveUserInfo} disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              <div>
                <div className="text-xs text-text-secondary font-medium mb-1">First Name</div>
                <div className="text-sm text-text">{user?.firstName || '—'}</div>
              </div>
              <div>
                <div className="text-xs text-text-secondary font-medium mb-1">Middle Name</div>
                <div className="text-sm text-text">{user?.middleName || '—'}</div>
              </div>
              <div>
                <div className="text-xs text-text-secondary font-medium mb-1">Last Name</div>
                <div className="text-sm text-text">{user?.lastName || '—'}</div>
              </div>
            </div>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* LEFT COLUMN */}
          <div className="col-span-1 space-y-4 sm:space-y-6">
            {/* Professional Summary */}
            <div className="bg-surface/60 rounded-lg p-4 sm:p-5 border border-divider">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wide text-accent">Professional Summary</h3>
                {editingSection !== 'summary' && (
                  <button
                    onClick={() => handleEditStart('summary', { summary: profile.summary })}
                    className="text-xs text-accent hover:text-accent/80 transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {editingSection === 'summary' ? (
                <div className="space-y-3">
                  <Textarea
                    id="summary"
                    placeholder="Describe your professional background..."
                    value={tempData.summary}
                    onChange={(e) => setTempData({ ...tempData, summary: e.target.value })}
                    rows={4}
                    invalid={!!errors.summary}
                  />
                  {errors.summary && <div className="text-xs text-status-rejected">{errors.summary}</div>}
                  {errors.submit && <div className="text-xs text-status-rejected">{errors.submit}</div>}
                  <div className="flex gap-2 justify-end">
                    <Button variant="secondary" size="sm" onClick={handleEditCancel} disabled={saving}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" onClick={validateAndSaveSummary} disabled={saving}>
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-xs leading-relaxed text-text">
                  {profile.summary || <span className="italic text-text-secondary">Add a professional summary to highlight your background.</span>}
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="bg-surface/60 rounded-lg p-4 sm:p-5 border border-divider">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wide text-accent">Skills</h3>
                {editingSection !== 'skills' && (
                  <button
                    onClick={() => handleEditStart('skills', { skills: profile.skills || [] })}
                    className="text-xs text-accent hover:text-accent/80 transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {editingSection === 'skills' ? (
                <div className="space-y-2">
                  <div className="space-y-2">
                    {tempData.skills.map((skill, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          placeholder="Enter a skill"
                          value={skill}
                          onChange={(e) => {
                            const newSkills = [...tempData.skills];
                            newSkills[idx] = e.target.value;
                            setTempData({ ...tempData, skills: newSkills });
                          }}
                          invalid={!!errors.skills}
                          className="text-xs"
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            const newSkills = tempData.skills.filter((_, i) => i !== idx);
                            setTempData({ ...tempData, skills: newSkills });
                          }}
                          disabled={saving}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setTempData({ ...tempData, skills: [...tempData.skills, ''] })}
                    disabled={saving}
                    className="w-full"
                  >
                    + Add Skill
                  </Button>
                  {errors.submit && <div className="text-xs text-status-rejected">{errors.submit}</div>}
                  <div className="flex gap-2 justify-end">
                    <Button variant="secondary" size="sm" onClick={handleEditCancel} disabled={saving}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" onClick={validateAndSaveSkills} disabled={saving}>
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-accent/15 text-accent rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs italic text-text-secondary">Add skills to showcase your expertise.</span>
                  )}
                </div>
              )}
            </div>

            {/* Certifications */}
            <div className="bg-surface/60 rounded-lg p-4 sm:p-5 border border-divider">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wide text-accent">Certifications</h3>
                {editingSection !== 'cert-add' && (
                  <button
                    onClick={() => handleEditStart('cert-add', { name: '', issuer: '' })}
                    className="text-xs text-accent hover:text-accent/80 transition-colors"
                  >
                    + Add
                  </button>
                )}
              </div>

              {editingSection === 'cert-add' ? (
                <div className="space-y-3">
                  <FormField label="Certification Name" htmlFor="certName" error={errors.name}>
                    <Input
                      id="certName"
                      placeholder="AWS Certified Solutions Architect"
                      value={tempData.name}
                      onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                      invalid={!!errors.name}
                    />
                  </FormField>
                  <FormField label="Issuer" htmlFor="issuer">
                    <Input
                      id="issuer"
                      placeholder="Amazon Web Services"
                      value={tempData.issuer}
                      onChange={(e) => setTempData({ ...tempData, issuer: e.target.value })}
                    />
                  </FormField>
                  {errors.submit && <div className="text-xs text-status-rejected">{errors.submit}</div>}
                  <div className="flex gap-2 justify-end">
                    <Button variant="secondary" size="sm" onClick={handleEditCancel} disabled={saving}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleAddCertification} disabled={saving}>
                      {saving ? 'Adding...' : 'Add'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {profile.certifications && profile.certifications.length > 0 ? (
                    profile.certifications.map((cert) => (
                      <div key={cert._id} className="bg-surface/40 rounded-lg p-3 border border-divider hover:border-accent/50 transition-colors flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-text">{cert.name}</div>
                          {cert.issuer && <div className="text-xs text-text-secondary">{cert.issuer}</div>}
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => deleteCertification(cert._id)}
                          title="Delete this certification"
                          style={{ color: 'var(--status-rejected)', borderColor: 'var(--status-rejected)' }}
                        >
                          🗑️ Delete
                        </Button>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs italic text-text-secondary">Add certifications to validate your expertise.</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-1 lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Work Experience */}
            <div className="bg-surface/60 rounded-lg p-4 sm:p-5 border border-divider">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-accent">Work Experience</h3>
                {editingSection !== 'experience-add' && (
                  <button
                    onClick={() => handleEditStart('experience-add', { role: '', company: '', startDate: '', endDate: '', currentlyWorking: false, description: '' })}
                    className="text-xs text-accent hover:text-accent/80 transition-colors"
                  >
                    + Add
                  </button>
                )}
              </div>

              {editingSection === 'experience-add' ? (
                <div className="space-y-3 border-t border-divider pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField label="Job Title" htmlFor="role" error={errors.role}>
                      <Input
                        id="role"
                        placeholder="Senior Frontend Engineer"
                        value={tempData.role}
                        onChange={(e) => setTempData({ ...tempData, role: e.target.value })}
                        invalid={!!errors.role}
                      />
                    </FormField>
                    <FormField label="Company" htmlFor="company" error={errors.company}>
                      <Input
                        id="company"
                        placeholder="Tech Corp"
                        value={tempData.company}
                        onChange={(e) => setTempData({ ...tempData, company: e.target.value })}
                        invalid={!!errors.company}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField label="Start Date (Month & Year)" htmlFor="startDate">
                      <Input
                        id="startDate"
                        type="month"
                        value={dateToMonthYear(tempData.startDate)}
                        onChange={(e) => setTempData({ ...tempData, startDate: monthYearToDate(e.target.value) })}
                      />
                    </FormField>
                    <FormField label="End Date (Month & Year)" htmlFor="endDate">
                      <Input
                        id="endDate"
                        type="month"
                        value={dateToMonthYear(tempData.endDate)}
                        onChange={(e) => setTempData({ ...tempData, endDate: monthYearToDate(e.target.value) })}
                        disabled={tempData.currentlyWorking}
                      />
                    </FormField>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="currentlyWorking"
                      checked={tempData.currentlyWorking}
                      onChange={(e) => setTempData({ ...tempData, currentlyWorking: e.target.checked, endDate: e.target.checked ? '' : tempData.endDate })}
                      className="rounded"
                    />
                    <label htmlFor="currentlyWorking" className="text-xs font-medium text-text">
                      I currently work here
                    </label>
                  </div>

                  <FormField label="About This Role (Optional)" htmlFor="description">
                    <Textarea
                      id="description"
                      placeholder="Describe your responsibilities, achievements, and impact..."
                      value={tempData.description}
                      onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
                      rows={3}
                    />
                  </FormField>

                  {errors.submit && <div className="text-xs text-status-rejected">{errors.submit}</div>}
                  <div className="flex gap-2 justify-end">
                    <Button variant="secondary" size="sm" onClick={handleEditCancel} disabled={saving}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleAddExperience} disabled={saving}>
                      {saving ? 'Adding...' : 'Add Experience'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {profile.experience && profile.experience.length > 0 ? (
                    profile.experience.map((exp, idx) => (
                      <div key={exp._id} className="bg-surface/40 rounded-lg p-4 border border-divider hover:border-accent/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="text-sm font-bold text-text">{exp.role}</div>
                            <div className="text-xs text-accent">{exp.company}</div>
                            {exp.startDate && (
                              <div className="text-xs text-text-secondary mt-1">
                                {formatDateShort(exp.startDate)}
                                {exp.endDate && ` - ${formatDateShort(exp.endDate)}`}
                                {exp.currentlyWorking && ' (Present)'}
                              </div>
                            )}
                          </div>
                        </div>

                        {exp.description && (
                          <p className="text-xs text-text-secondary leading-relaxed mb-4 pb-4 border-b border-divider">{exp.description}</p>
                        )}

                        {/* Action Buttons - Always Visible and Prominent */}
                        <div className="flex gap-2 flex-wrap">
                          {idx > 0 && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => reorderExperience(exp._id, 'up')}
                              title="Move up in list"
                              className="text-sm"
                            >
                              ⬆️ Move Up
                            </Button>
                          )}
                          {idx < profile.experience.length - 1 && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => reorderExperience(exp._id, 'down')}
                              title="Move down in list"
                              className="text-sm"
                            >
                              ⬇️ Move Down
                            </Button>
                          )}
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => deleteExperience(exp._id)}
                            title="Delete this experience"
                            className="text-sm ml-auto"
                            style={{ color: 'var(--status-rejected)', borderColor: 'var(--status-rejected)' }}
                          >
                            🗑️ Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs italic text-text-secondary">Add your work experience to show your professional background.</span>
                  )}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            {(profile.skills?.length > 0 || profile.experience?.length > 0 || profile.certifications?.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-accent/10 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-accent">{profile.skills?.length || 0}</div>
                  <div className="text-xs text-text-secondary">Skills</div>
                </div>
                <div className="bg-status-interview/10 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-status-interview">{profile.experience?.length || 0}</div>
                  <div className="text-xs text-text-secondary">Experiences</div>
                </div>
                <div className="bg-status-offer/10 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-status-offer">{profile.certifications?.length || 0}</div>
                  <div className="text-xs text-text-secondary">Certifications</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
