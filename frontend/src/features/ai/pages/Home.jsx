import { useState } from 'react';
import { useApplications } from '../../applications/hooks/useApplications';
import { useInterview } from '../hooks/useInterview';
import { Link } from 'react-router';
import Card from '../../../components/ui/Card';
import Tag from '../../../components/ui/Tag';
import SegmentedControl from '../../../components/ui/SegmentedControl';
import { STATUS_ORDER, STATUS_META, tintStyle, scoreMeta } from '../../../lib/statusMeta';

const Dashboard = () => {
  console.log("[Dashboard] Mounting");
  const { applications } = useApplications();
  const { reports } = useInterview();
  const [view, setView] = useState('kanban');
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverStatus, setDragOverStatus] = useState(null);
  const { updateApplicationStatus } = useApplications();

  console.log("[Dashboard] Rendering - applications:", applications?.length, "reports:", reports?.length);

  const stats = [
    { label: 'Total Applications', value: applications.length },
    {
      label: 'Response Rate',
      value: applications.length > 0 ? Math.round(((applications.filter(a => a.status !== 'Saved').length / applications.length) * 100)) : 0,
      suffix: '%',
    },
    { label: 'Interviews Scheduled', value: applications.filter(a => a.status === 'Interview').length },
    { label: 'Offers', value: applications.filter(a => a.status === 'Offer').length },
    { label: 'Reports Generated', value: reports?.length || 0 },
  ];

  const getApplicationsByStatus = (status) => applications.filter(a => a.status === status);

  const handleDragStart = (id) => setDraggedId(id);
  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverStatus(null);
  };
  const handleDropOnStatus = (status) => {
    if (draggedId) {
      updateApplicationStatus(draggedId, status);
      handleDragEnd();
    }
  };

  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Bar */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface/90 border border-divider rounded-md p-4 text-center">
              <div className="text-xs text-text-secondary font-medium mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-text">
                {stat.value}
                {stat.suffix}
              </div>
            </div>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Applications</h2>
          <SegmentedControl options={[{ label: 'Kanban', value: 'kanban' }, { label: 'Table', value: 'table' }]} value={view} onChange={setView} />
        </div>

        {/* Empty State */}
        {applications.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📧</div>
            <h3 className="text-lg font-semibold mb-2">No applications yet</h3>
            <p className="text-text-secondary mb-4">Start tracking your job applications to get insights and AI-powered interview prep.</p>
            <Link to="/applications" className="inline-block px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors">
              Add your first application
            </Link>
          </div>
        ) : view === 'kanban' ? (
          <div className="grid grid-cols-5 gap-4">
            {STATUS_ORDER.map((status) => {
              const apps = getApplicationsByStatus(status);
              return (
                <div
                  key={status}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverStatus(status);
                  }}
                  onDragLeave={() => setDragOverStatus(null)}
                  onDrop={() => handleDropOnStatus(status)}
                  className={`bg-surface/60 rounded-md p-4 min-h-[500px] ${dragOverStatus === status ? 'bg-surface/80 ring-2 ring-accent' : ''}`}
                >
                  <div className="font-semibold text-sm mb-4">
                    {STATUS_META[status].label}
                    <span className="float-right text-xs text-text-secondary">{apps.length}</span>
                  </div>
                  <div className="space-y-3">
                    {apps.length === 0 ? (
                      <div className="text-xs text-text-secondary text-center py-8">No applications</div>
                    ) : (
                      apps.map((app) => (
                        <div
                          key={app.id}
                          draggable
                          onDragStart={() => handleDragStart(app.id)}
                          onDragEnd={handleDragEnd}
                          className={`block cursor-grab active:cursor-grabbing opacity-100 hover:shadow-md transition-all ${draggedId === app.id ? 'opacity-50' : ''}`}
                        >
                          <Card elevation="sm">
                            <Card.Kicker>{app.company}</Card.Kicker>
                            <Card.Title className="text-sm">{app.role}</Card.Title>
                            <Card.Body className="text-xs">{app.location}</Card.Body>
                            <Card.Meta className="justify-between mt-2">
                              <span>{new Date(app.appliedDate).toLocaleDateString()}</span>
                              {app.matchScore && (
                                <span style={scoreMeta(app.matchScore) ? { color: `var(${scoreMeta(app.matchScore)})` } : {}}>
                                  {app.matchScore}%
                                </span>
                              )}
                            </Card.Meta>
                          </Card>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border border-divider rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface/60 border-b border-divider">
                <tr>
                  <th className="text-left px-4 py-2 text-xs font-semibold">Company</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold">Role</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold">Location</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold">Applied</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold">Status</th>
                  <th className="text-left px-4 py-2 text-xs font-semibold">Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-surface/40 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium">{app.company}</td>
                    <td className="px-4 py-3 text-sm">{app.role}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{app.location}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{new Date(app.appliedDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <Tag variant="status" style={tintStyle(STATUS_META[app.status].dotVar)}>
                        {app.status}
                      </Tag>
                    </td>
                    <td className="px-4 py-3 text-sm">{app.matchScore ? `${app.matchScore}%` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
