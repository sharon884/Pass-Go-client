// src/routes/AdminRoutes.jsx

import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Pages
import Login from "../pages/generalPages/Login";
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import AdminEventApprovePage from "../pages/adminPages/AdminEventApprovePage";
import HostPendingRequestPage from "../pages/adminPages/HostPendingRequstPage";

// Only admins should access protected admin routes
const allowedRoles = ["admin"];

const AdminRoutes = [
  // Public Route for Admin login
  <Route key="/admin-login" path="/admin-login" element={<Login />} />,

  // Protected Routes
  <Route
    key="admin-protected-routes"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <React.Fragment />
      </ProtectedRoute>
    }
  >
    <Route path="/admin-dashboard" element={<AdminDashboard />} />
    <Route path="/admin/events/approval" element={<AdminEventApprovePage />} />
    <Route path="/admin/verify-host-request" element={<HostPendingRequestPage />} />
  </Route>
];

export default AdminRoutes;
