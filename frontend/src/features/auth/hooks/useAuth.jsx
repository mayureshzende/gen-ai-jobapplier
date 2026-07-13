import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../state/AuthContext";
import {
  getMe,
  login,
  logout,
  register,
} from "../services/Auth.api.service.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setuser, loading, setloading } = context;
  const hasRunRef = useRef(false);
  const mountedRef = useRef(true);

  console.log("[useAuth] Current state - loading:", loading, "user:", user);

  useEffect(() => {
    console.log("[useAuth] Cleanup effect mounted");
    return () => {
      console.log("[useAuth] Cleanup effect - unmounting");
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    console.log("[useAuth] Auth init effect - hasRunRef:", hasRunRef.current);
    if (hasRunRef.current) {
      console.log("[useAuth] Already ran, skipping");
      return;
    }
    hasRunRef.current = true;

    const getMeUser = async () => {
      console.log("[useAuth] getMeUser - Starting getMe call");
      try {
        console.log("[useAuth] getMeUser - Setting loading to true");
        setloading(true);
        const userres = await getMe();
        console.log("[useAuth] getMeUser - Got response:", userres);
        if (mountedRef.current) {
          // Extract user object from response
          const userData = userres?.user || userres;
          console.log("[useAuth] getMeUser - Setting user:", userData);
          setuser(userData);
        } else {
          console.log("[useAuth] getMeUser - Component unmounted, not setting user");
        }
      } catch (error) {
        console.error("[useAuth] Auth check error:", error?.response?.status, error?.message);
        // User not logged in or session expired
        console.log("[useAuth] getMeUser - Error caught, user will stay null");
      } finally {
        if (mountedRef.current) {
          console.log("[useAuth] getMeUser - Setting loading to false");
          setloading(false);
        } else {
          console.log("[useAuth] getMeUser - Component unmounted, not setting loading");
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
