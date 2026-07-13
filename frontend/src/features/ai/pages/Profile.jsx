import { useState } from 'react';
import Button from '../../../components/ui/Button';
import Textarea from '../../../components/ui/Textarea';
import Tag from '../../../components/ui/Tag';
import Card from '../../../components/ui/Card';

const Profile = () => {
  const [editingSection, setEditingSection] = useState(null);
  const [profile, setProfile] = useState({
    summary: 'Experienced full-stack developer with 5+ years of experience building scalable web applications.',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
    experience: [
      {
        role: 'Senior Frontend Engineer',
        company: 'Tech Corp',
        dates: '2021 - Present',
        bullets: ['Led migration to React', 'Improved performance by 40%', 'Mentored junior developers'],
      },
      {
        role: 'Full Stack Developer',
        company: 'StartUp Inc',
        dates: '2019 - 2021',
        bullets: ['Built core features', 'Implemented CI/CD pipeline', 'Managed database migrations'],
      },
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect', year: '2023' },
      { name: 'Google Cloud Professional', year: '2022' },
    ],
  });

  const [tempData, setTempData] = useState(profile);
  const [errors, setErrors] = useState({});

  const handleEditStart = (section) => {
    setEditingSection(section);
    setTempData(profile);
    setErrors({});
  };

  const validateEdit = (section, data) => {
    const newErrors = {};

    if (section === 'summary') {
      if (!data.summary.trim()) {
        newErrors.summary = 'Summary cannot be empty';
      }
    } else if (section === 'skills') {
      const skills = data.skills.filter(s => s.trim());
      if (skills.length === 0) {
        newErrors.skills = 'At least one skill is required';
      }
    }

    return newErrors;
  };

  const handleEditSave = () => {
    const newErrors = validateEdit(editingSection, tempData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingSection === 'skills') {
      setProfile({
        ...tempData,
        skills: tempData.skills.filter(s => s.trim()),
      });
    } else {
      setProfile(tempData);
    }
    setEditingSection(null);
    setErrors({});
  };

  const handleEditCancel = () => {
    setEditingSection(null);
    setErrors({});
  };

  return (
    <div className="px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Master Profile</h2>

        <div className="grid grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">Summary</h3>
                <Button variant="ghost" size="sm" onClick={() => handleEditStart('summary')}>
                  Edit
                </Button>
              </div>
              {editingSection === 'summary' ? (
                <div className="space-y-2">
                  <Textarea
                    value={tempData.summary}
                    onChange={(e) => {
                      setTempData({ ...tempData, summary: e.target.value });
                      if (errors.summary) setErrors({});
                    }}
                    rows={4}
                    invalid={!!errors.summary}
                  />
                  {errors.summary && <div className="text-xs text-status-rejected">{errors.summary}</div>}
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleEditSave}>Save</Button>
                    <Button size="sm" variant="secondary" onClick={handleEditCancel}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-text-secondary">{profile.summary}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">Skills</h3>
                <Button variant="ghost" size="sm" onClick={() => handleEditStart('skills')}>
                  Edit
                </Button>
              </div>
              {editingSection === 'skills' ? (
                <div className="space-y-2">
                  <Textarea
                    value={tempData.skills.join(', ')}
                    onChange={(e) => {
                      setTempData({ ...tempData, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) });
                      if (errors.skills) setErrors({});
                    }}
                    rows={3}
                    placeholder="Comma-separated skills"
                    invalid={!!errors.skills}
                  />
                  {errors.skills && <div className="text-xs text-status-rejected">{errors.skills}</div>}
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleEditSave}>Save</Button>
                    <Button size="sm" variant="secondary" onClick={handleEditCancel}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map(skill => (
                    <Tag key={skill} variant="neutral" size="sm">{skill}</Tag>
                  ))}
                </div>
              )}
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">Certifications</h3>
              </div>
              <div className="space-y-1">
                {profile.certifications.map((cert, i) => (
                  <div key={i} className="text-sm">
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-xs text-text-secondary">{cert.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-3 space-y-6">
            {/* Experience */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Experience</h3>
                <Button variant="ghost" size="sm">+ Add Role</Button>
              </div>
              <div className="space-y-4">
                {profile.experience.map((job, i) => (
                  <Card key={i} elevation="sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Card.Title className="text-base">{job.role}</Card.Title>
                        <Card.Body className="text-sm">{job.company}</Card.Body>
                      </div>
                      <span className="text-xs text-text-secondary">{job.dates}</span>
                    </div>
                    <ul className="text-sm text-text-secondary space-y-1 ml-4">
                      {job.bullets.map((bullet, j) => (
                        <li key={j}>• {bullet}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="font-semibold mb-4">Achievements</h3>
              <ul className="text-sm space-y-2">
                <li>• Increased platform performance by 40% through React optimization</li>
                <li>• Led team of 5 engineers on critical infrastructure migration</li>
                <li>• Open source contributor with 1000+ GitHub stars</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
