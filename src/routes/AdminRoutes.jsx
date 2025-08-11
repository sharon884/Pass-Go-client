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
import AdminEventListing from "@/components/AdminComponents/EventManagement/AdminEventListing";
import AdminEventDetails from "@/components/AdminComponents/EventManagement/AdminEventDetails";
import NotificationPage from "@/pages/generalPages/NotificationPage";

// Admin-only access
const allowedRoles = ["admin"];

const AdminRoutes = [
  // 🔓 Public Route
  <Route key="/admin/login" path="/admin/login" element={<Login />} />,

  // 🔐 Protected Routes
  <Route
    key="/admin/dashboard"
    path="/admin/dashboard"
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
    key="/admin/hosts/pending"
    path="/admin/hosts/pending"
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
  />,

  
  <Route key="/admin/event-lisiting"
  path="/admin/events"
  element={
    <ProtectedRoute allowedRoles={allowedRoles}>
      <AdminEventListing/>
    </ProtectedRoute>
  }
  />,

<Route key="/admin/event-management/details/:eventId"
  path="/admin/event-management/details/:eventId"
  element={
    <ProtectedRoute allowedRoles={allowedRoles}>
      <AdminEventDetails/>
    </ProtectedRoute>
  }
  />,

  
<Route
  key="/admin/notifications"
  path="/admin/notifications"
  element={
    <ProtectedRoute allowedRoles={allowedRoles}>
      <NotificationPage />
    </ProtectedRoute>
  }
  />,
  
];

export default AdminRoutes;
