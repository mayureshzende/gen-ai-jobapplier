import { useState, useEffect } from 'react';
import { useApplications } from '../hooks/useApplications';
import { useInterview } from '../hooks/useInterview';
import { Link } from 'react-router';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Tag from '../../../components/ui/Tag';
import SegmentedControl from '../../../components/ui/SegmentedControl';
import { STATUS_ORDER, STATUS_META, tintStyle, scoreMeta } from '../../../lib/statusMeta';
import { formatDateLong } from '../../../lib/dateUtils';

const Dashboard = () => {
  console.log("[Dashboard] Mounting");
  const { applications, loading, updateApplicationStatus } = useApplications();
  const { reports } = useInterview();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [view, setView] = useState(window.innerWidth < 768 ? 'table' : 'kanban');
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverStatus, setDragOverStatus] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      if (isNowMobile && view === 'kanban') {
        setView('table');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [view]);

  console.log("[Dashboard] Rendering - applications:", applications?.length, "reports:", reports?.length, "loading:", loading);

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
    <div className="px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface/90 border border-divider rounded-md p-3 sm:p-4 text-center">
              <div className="text-xs text-text-secondary font-medium mb-2">{stat.label}</div>
              <div className="text-2xl sm:text-3xl font-bold text-text">
                {stat.value}
                {stat.suffix}
              </div>
            </div>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-bold">Applications</h2>
          <SegmentedControl
            options={isMobile ? [{ label: 'Table', value: 'table' }] : [{ label: 'Kanban', value: 'kanban' }, { label: 'Table', value: 'table' }]}
            value={view}
            onChange={setView}
          />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
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
                  className={`bg-surface/60 rounded-md p-3 sm:p-4 min-h-[400px] sm:min-h-[500px] ${dragOverStatus === status ? 'bg-surface/80 ring-2 ring-accent' : ''}`}
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
                          key={app._id}
                          draggable
                          onDragStart={() => handleDragStart(app._id)}
                          onDragEnd={handleDragEnd}
                          onClick={() => {
                            if (app.interviewReport?._id) {
                              navigate(`/interview/${app.interviewReport._id}`);
                            } else {
                              navigate('/generatereport');
                            }
                          }}
                          className={`block opacity-100 hover:shadow-md transition-all cursor-pointer ${draggedId === app._id ? 'opacity-50 cursor-grab' : 'cursor-grab active:cursor-grabbing'}`}
                        >
                          <Card elevation="sm">
                            <Card.Kicker>{app.company}</Card.Kicker>
                            <Card.Title className="text-sm">{app.role}</Card.Title>
                            <Card.Body className="text-xs">{app.location}</Card.Body>
                            <Card.Meta className="justify-between mt-2">
                              <span>{formatDateLong(app.appliedDate)}</span>
                              <div className="flex items-center gap-2">
                                {app.matchScore && (
                                  <span style={scoreMeta(app.matchScore) ? { color: `var(${scoreMeta(app.matchScore)})` } : {}}>
                                    {app.matchScore}%
                                  </span>
                                )}
                                {app.interviewReport?._id && (
                                  <span className="text-xs bg-status-offer/20 text-status-offer px-2 py-0.5 rounded">
                                    📋
                                  </span>
                                )}
                              </div>
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
          <div className="border border-divider rounded-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface/60 border-b border-divider">
                <tr>
                  <th className="text-left px-2 sm:px-4 py-2 text-xs font-semibold">Company</th>
                  <th className="text-left px-2 sm:px-4 py-2 text-xs font-semibold hidden sm:table-cell">Role</th>
                  <th className="text-left px-2 sm:px-4 py-2 text-xs font-semibold hidden md:table-cell">Location</th>
                  <th className="text-left px-2 sm:px-4 py-2 text-xs font-semibold hidden lg:table-cell">Applied</th>
                  <th className="text-left px-2 sm:px-4 py-2 text-xs font-semibold">Status</th>
                  <th className="text-left px-2 sm:px-4 py-2 text-xs font-semibold hidden md:table-cell">Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider">
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    onClick={() => {
                      if (app.interviewReport?._id) {
                        navigate(`/interview/${app.interviewReport._id}`);
                      } else {
                        navigate('/generatereport');
                      }
                    }}
                    className="hover:bg-surface/40 transition-colors cursor-pointer"
                  >
                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium">
                      <div>{app.company}</div>
                      <div className="text-xs text-text-secondary sm:hidden">{app.role}</div>
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm hidden sm:table-cell">{app.role}</td>
                    <td className="px-2 sm:px-4 py-2 text-xs text-text-secondary hidden md:table-cell">{app.location}</td>
                    <td className="px-2 sm:px-4 py-2 text-xs text-text-secondary hidden lg:table-cell">{formatDateLong(app.appliedDate)}</td>
                    <td className="px-2 sm:px-4 py-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Tag variant="status" style={tintStyle(STATUS_META[app.status].dotVar)}>
                          {app.status}
                        </Tag>
                        {app.interviewReport?._id && (
                          <span className="text-xs bg-status-offer/20 text-status-offer px-1.5 sm:px-2 py-0.5 sm:py-1 rounded hidden sm:inline-block">
                            📋
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm hidden md:table-cell">{app.matchScore ? `${app.matchScore}%` : '—'}</td>
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
