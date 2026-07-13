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

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const getMeUser = async () => {
      try {
        setloading(true);
        const userres = await getMe();
        if (mountedRef.current) {
          // Extract user object from response
          setuser(userres?.user || userres);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        // User not logged in or session expired
      } finally {
        if (mountedRef.current) {
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
