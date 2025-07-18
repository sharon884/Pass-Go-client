// src/routes/AdminRoutes.jsx

import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Pages
import Login from "../pages/generalPages/Login";
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import AdminEventApprovePage from "../pages/adminPages/AdminEventApprovePage";
import HostPendingRequestPage from "../pages/adminPages/HostPendingRequstPage";
import AdminWallet from "../components/AdminComponents/wallet/AdminWallet";

// Admin-only access
const allowedRoles = ["admin"];

const AdminRoutes = [
  // 🔓 Public Route
  <Route key="/admin-login" path="/admin-login" element={<Login />} />,

  // 🔐 Protected Routes
  <Route
    key="/admin-dashboard"
    path="/admin-dashboard"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/admin/events/approval"
    path="/admin/events/approval"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <AdminEventApprovePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/admin/verify-host-request"
    path="/admin/verify-host-request"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <HostPendingRequestPage />
      </ProtectedRoute>
    }
  />,

  <Route key="/admin/wallet"
  path="/admin/wallet"
  element={
    <ProtectedRoute allowedRoles={allowedRoles}>
      <AdminWallet/>
    </ProtectedRoute>
  }
  />
];

export default AdminRoutes;
