import { useContext, useEffect } from "react";
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

  useEffect(() => {
    const getMeUser = async () => {
      try {
        setloading(true);
        const userres = await getMe();
        console.log("user response is ", userres);
        setuser(userres);
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    };
    getMeUser();
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
      return registeruser.data;
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      setloading(true);
      const loginuser = await login({ username, password });
      return loginuser.data;
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const logoutuser = await logout();
      return logoutuser.data;
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  return { user, loading, handleLogin, handleLogout, handleRegister };
};
