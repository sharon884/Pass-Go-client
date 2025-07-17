// src/components/auth/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const localAuth = localStorage.getItem("isAuthenticated") === "true";
  const localRole = localStorage.getItem("role");

  const role = user?.role || localRole;
  const isLoggedIn = isAuthenticated || localAuth;

  if (!isLoggedIn || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
