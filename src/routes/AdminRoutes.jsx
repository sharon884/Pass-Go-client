import React from "react";
import { Route } from "react-router-dom";
import Login from "../pages/generalPages/Login";
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import AdminEventApprovePage from "../pages/adminPages/AdminEventApprovePage";
import HostPendingRequestPage from "../pages/adminPages/HostPendingRequstPage";

const AdminRoutes = [
  <Route key="/admin-login" path="/admin-login" element={<Login />} />,
  <Route key="/admin-dashboard" path="/admin-dashboard" element={<AdminDashboard />} />,
  <Route key="/admin/events/approval" path="/admin/events/approval" element={<AdminEventApprovePage />} />,
  <Route key="/admin/verify-host-request" path="/admin/verify-host-request" element={<HostPendingRequestPage />} />,
];

export default AdminRoutes;
