import { createContext, useState, useEffect } from 'react';
import { SEED_APPLICATIONS } from '../data/seedApplications';

const ApplicationsContext = createContext();

const ApplicationsContextProvider = ({ children }) => {
  const [applications, setApplications] = useState(() => {
    try {
      const stored = localStorage.getItem('mock_applications');
      return stored ? JSON.parse(stored) : SEED_APPLICATIONS;
    } catch (e) {
      console.error('Error loading applications from localStorage:', e);
      return SEED_APPLICATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mock_applications', JSON.stringify(applications));
    } catch (e) {
      console.error('Error saving applications to localStorage:', e);
    }
  }, [applications]);

  const addApplication = (appData) => {
    const newApp = {
      id: crypto.randomUUID(),
      appliedDate: new Date().toISOString(),
      matchScore: null,
      ...appData,
    };
    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  const updateApplicationStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const removeApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        addApplication,
        updateApplicationStatus,
        removeApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export { ApplicationsContext, ApplicationsContextProvider };
