import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ( { children, restrictTo, allowedRoles }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const role = localStorage.getItem("role");

    if ( restrictTo === "auth" && isAuthenticated ) {
        const redirectMap = {
            user : "/user-home-page",
            host : "/host-home-page",
            admin : "/admin-dashboard",
        }
        return <Navigate to={redirectMap[role] || "/"} replace />;
    }

    if ( restrictTo === "protected" && !isAuthenticated ) {
        return <Navigate to="/login" replace />;
    }

    if ( allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace/> ;
    }

    return children;
};

export default ProtectedRoute;