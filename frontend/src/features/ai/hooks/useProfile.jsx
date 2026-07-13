import { useCallback, useEffect, useRef, useState } from 'react';
import * as profileService from '../services/profile.service';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const getProfile = useCallback(async () => {
    console.log("[useProfile] getProfile - Starting fetch");
    setLoading(true);
    setError(null);
    try {
      const res = await profileService.getProfile();
      if (mountedRef.current) {
        setProfile(res.profile);
        console.log("[useProfile] getProfile - Loaded profile");
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useProfile] getProfile - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message || 'Failed to fetch profile');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const updateSummary = useCallback(async (summary) => {
    console.log("[useProfile] updateSummary - Updating");
    try {
      const res = await profileService.updateSummary(summary);
      if (mountedRef.current) {
        setProfile(res.profile);
        console.log("[useProfile] updateSummary - Updated");
        return res.profile;
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useProfile] updateSummary - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message);
      }
      throw err;
    }
  }, []);

  const updateSkills = useCallback(async (skills) => {
    console.log("[useProfile] updateSkills - Updating");
    try {
      const res = await profileService.updateSkills(skills);
      if (mountedRef.current) {
        setProfile(res.profile);
        console.log("[useProfile] updateSkills - Updated");
        return res.profile;
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useProfile] updateSkills - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message);
      }
      throw err;
    }
  }, []);

  const addExperience = useCallback(async (experience) => {
    console.log("[useProfile] addExperience - Adding");
    try {
      const res = await profileService.addExperience(experience);
      if (mountedRef.current) {
        setProfile(res.profile);
        console.log("[useProfile] addExperience - Added");
        return res.profile;
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useProfile] addExperience - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message);
      }
      throw err;
    }
  }, []);

  const updateExperience = useCallback(async (expId, experience) => {
    console.log("[useProfile] updateExperience - Updating");
    try {
      const res = await profileService.updateExperience(expId, experience);
      if (mountedRef.current) {
        setProfile(res.profile);
        console.log("[useProfile] updateExperience - Updated");
        return res.profile;
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useProfile] updateExperience - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message);
      }
      throw err;
    }
  }, []);

  const deleteExperience = useCallback(async (expId) => {
    console.log("[useProfile] deleteExperience - Deleting");
    try {
      const res = await profileService.deleteExperience(expId);
      if (mountedRef.current) {
        setProfile(res.profile);
        console.log("[useProfile] deleteExperience - Deleted");
        return res.profile;
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useProfile] deleteExperience - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message);
      }
      throw err;
    }
  }, []);

  const reorderExperience = useCallback(async (expId, direction) => {
    console.log("[useProfile] reorderExperience - Moving", direction);
    try {
      const res = await profileService.reorderExperience(expId, direction);
      if (mountedRef.current) {
        setProfile(res.profile);
        console.log("[useProfile] reorderExperience - Moved");
        return res.profile;
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useProfile] reorderExperience - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message);
      }
      throw err;
    }
  }, []);

  const addCertification = useCallback(async (certification) => {
    console.log("[useProfile] addCertification - Adding");
    try {
      const res = await profileService.addCertification(certification);
      if (mountedRef.current) {
        setProfile(res.profile);
        console.log("[useProfile] addCertification - Added");
        return res.profile;
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useProfile] addCertification - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message);
      }
      throw err;
    }
  }, []);

  const deleteCertification = useCallback(async (certId) => {
    console.log("[useProfile] deleteCertification - Deleting");
    try {
      const res = await profileService.deleteCertification(certId);
      if (mountedRef.current) {
        setProfile(res.profile);
        console.log("[useProfile] deleteCertification - Deleted");
        return res.profile;
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("[useProfile] deleteCertification - Error:", err?.message);
        setError(err?.response?.data?.message || err?.message);
      }
      throw err;
    }
  }, []);

  useEffect(() => {
    console.log("[useProfile] Mount effect");
    getProfile();
  }, [getProfile]);

  console.log("[useProfile] Current state - loading:", loading, "profile:", profile?._id);

  return {
    profile,
    loading,
    error,
    getProfile,
    updateSummary,
    updateSkills,
    addExperience,
    updateExperience,
    deleteExperience,
    reorderExperience,
    addCertification,
    deleteCertification,
  };
};
