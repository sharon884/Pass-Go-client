// src/routes/HostRoutes.jsx

import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Host components/pages
import HostHomePage from "../pages/hostPages/HostHomePage";
import HostAddEventPage from "../pages/hostPages/HostAddEventPage";
import ChangePasswordHost from "../components/HostComponets/ChangePasswordHost";
import HostProfilePage from "../pages/hostPages/HostProfilePage";
import EditHostProfilePage from "../pages/hostPages/EditHostProfilePage";
import HostEventManagementPage from "../pages/hostPages/HostEventManagementPage";
import EditEventPage from "../pages/hostPages/EditEventPage";
import BecomeHostPage from "../pages/hostPages/BecomeHostPage";
import HostAdvancePaymentPage from "../pages/hostPages/HostAdvancePaymentPage";
import HostEventAnalytics from "../components/HostComponets/HostBookings";

const HostRoutes = [
  <Route
    key="host-protected-routes"
    element={<ProtectedRoute allowedRoles={["host"]}><React.Fragment /></ProtectedRoute>}
  >
    <Route path="/host-home-page" element={<HostHomePage />} />
    <Route path="/host/add-event" element={<HostAddEventPage />} />
    <Route path="/host/change-password" element={<ChangePasswordHost />} />
    <Route path="/host/profile" element={<HostProfilePage />} />
    <Route path="/host/edit-profile" element={<EditHostProfilePage />} />
    <Route path="/host/events" element={<HostEventManagementPage />} />
    <Route path="/host/events-edit/:eventId" element={<EditEventPage />} />
    <Route path="/become-host" element={<BecomeHostPage />} />
    <Route path="/host/event/:eventId/advance-payment" element={<HostAdvancePaymentPage />} />
    <Route path="/host/events-summary/:eventId" element={<HostEventAnalytics />} />
  </Route>
];

export default HostRoutes;
