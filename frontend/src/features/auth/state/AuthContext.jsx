import { createContext, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(false);

  const value = useMemo(() => {
    return { user, setuser, loading, setloading };
  }, [user, loading, setuser, setloading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
