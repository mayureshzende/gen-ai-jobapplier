import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../state/AuthContext";
import {
  getMe,
  login,
  logout,
  register,
} from "../services/Auth.api.service.js";

// Global state to prevent multiple simultaneous requests
let isInitializing = false;

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setuser, loading, setloading } = context;
  const mountedRef = useRef(true);

  console.log("[useAuth] Current state - loading:", loading, "user:", user?.username);

  useEffect(() => {
    console.log("[useAuth] Mount effect");
    return () => {
      console.log("[useAuth] Unmount effect");
      mountedRef.current = false;
    };
  }, []);

  // Only run once on initial mount of the entire app
  useEffect(() => {
    console.log("[useAuth] Init effect - isInitializing:", isInitializing, "user:", user?.username);

    // If already initializing or user is already set, don't run again
    if (isInitializing || user) {
      console.log("[useAuth] Skipping init - either already initializing or user already set");
      return;
    }

    isInitializing = true;
    console.log("[useAuth] Starting getMeUser");

    const getMeUser = async () => {
      try {
        console.log("[useAuth] getMeUser - Setting loading to true");
        setloading(true);
        const userres = await getMe();
        console.log("[useAuth] getMeUser - Got response:", userres?.user);
        if (mountedRef.current) {
          const userData = userres?.user || userres;
          console.log("[useAuth] getMeUser - Setting user:", userData?.username);
          setuser(userData);
        } else {
          console.log("[useAuth] getMeUser - Component unmounted, skipping state update");
        }
      } catch (error) {
        console.error("[useAuth] getMeUser failed:", error?.response?.status, error?.message);
        // User not logged in or session expired
        if (mountedRef.current) {
          console.log("[useAuth] getMeUser - Error, keeping user as null");
        }
      } finally {
        isInitializing = false;
        if (mountedRef.current) {
          console.log("[useAuth] getMeUser - Setting loading to false");
          setloading(false);
        }
      }
    };

    getMeUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = async ({
    username,
    email,
    password,
    confirmpassword,
  }) => {
    try {
      setloading(true);
      const registeruser = await register({
        username,
        email,
        password,
        confirmpassword,
      });
      return registeruser;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      if (mountedRef.current) {
        setloading(false);
      }
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      setloading(true);
      const loginuser = await login({ username, password });

      // Fetch user details after successful login
      if (loginuser?.success && mountedRef.current) {
        try {
          const userDetails = await getMe();
          if (mountedRef.current) {
            setuser(userDetails?.user || userDetails);
          }
        } catch (err) {
          console.error("Failed to fetch user details:", err);
        }
      }

      return loginuser;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      if (mountedRef.current) {
        setloading(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const logoutuser = await logout();
      if (mountedRef.current) {
        setuser(null);
      }
      return logoutuser;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      if (mountedRef.current) {
        setloading(false);
      }
    }
  };

  return { user, loading, handleLogin, handleLogout, handleRegister };
};
