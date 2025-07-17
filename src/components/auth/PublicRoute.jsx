// src/components/auth/PublicRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const localAuth = localStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated || localAuth) {
    return <Navigate to="/welcome-page" replace />; 
  }

  return children;
};

export default PublicRoute;
