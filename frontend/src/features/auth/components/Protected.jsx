import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  console.log("user is ", user);
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Protected;
