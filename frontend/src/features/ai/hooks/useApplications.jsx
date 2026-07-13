import { useCallback, useEffect, useRef, useState } from 'react';
import * as applicationsService from '../services/applications.service';

export const useApplications = () => {
  const [applications, setApplications] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const getApplications = useCallback(async () => {
    console.log("[useApplications] getApplications - Starting fetch");
    setLoading(true);
    setError(null);
    try {
      const res = await applicationsService.getApplications();
      if (mountedRef.current) {
        setApplications(res.applications || []);
        console.log("[useApplications] getApplications - Set applications:", res.applications?.length);
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useApplications] getApplications - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message || 'Failed to fetch applications');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const addApplication = useCallback(async (appData) => {
    console.log("[useApplications] addApplication - Creating:", appData);
    try {
      const res = await applicationsService.createApplication(appData);
      if (mountedRef.current) {
        const newApp = res.application;
        setApplications((prev) => [newApp, ...(prev || [])]);
        console.log("[useApplications] addApplication - Added:", newApp._id);
        return newApp;
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useApplications] addApplication - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message || 'Failed to create application');
      }
      throw err;
    }
  }, []);

  const updateApplicationStatus = useCallback(async (id, status) => {
    console.log("[useApplications] updateApplicationStatus - Updating:", id, "to", status);
    try {
      const res = await applicationsService.updateApplication(id, { status });
      if (mountedRef.current) {
        setApplications((prev) =>
          prev?.map((app) => (app._id === id ? { ...app, status } : app)) || []
        );
        console.log("[useApplications] updateApplicationStatus - Updated:", id);
        return res.application;
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useApplications] updateApplicationStatus - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message || 'Failed to update application');
      }
      throw err;
    }
  }, []);

  const deleteApplication = useCallback(async (id) => {
    console.log("[useApplications] deleteApplication - Deleting:", id);
    try {
      await applicationsService.deleteApplication(id);
      if (mountedRef.current) {
        setApplications((prev) => prev?.filter((app) => app._id !== id) || []);
        console.log("[useApplications] deleteApplication - Deleted:", id);
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useApplications] deleteApplication - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message || 'Failed to delete application');
      }
      throw err;
    }
  }, []);

  const getStats = useCallback(async () => {
    console.log("[useApplications] getStats - Fetching stats");
    try {
      const res = await applicationsService.getApplicationStats();
      console.log("[useApplications] getStats - Got stats:", res.stats);
      return res.stats;
    } catch (err) {
      console.error("[useApplications] getStats - Error:", err?.message);
      throw err;
    }
  }, []);

  useEffect(() => {
    console.log("[useApplications] Mount effect");
    getApplications();

    return () => {
      console.log("[useApplications] Unmount effect");
    };
  }, [getApplications]);

  console.log("[useApplications] Current state - loading:", loading, "applications:", applications?.length);

  return {
    applications: applications || [],
    loading,
    error,
    addApplication,
    updateApplicationStatus,
    deleteApplication,
    getStats,
    getApplications,
  };
};
