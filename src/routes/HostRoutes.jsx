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
    key="/host-home-page"
    path="/host-home-page"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <HostHomePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/host/add-event"
    path="/host/add-event"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <HostAddEventPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/host/change-password"
    path="/host/change-password"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <ChangePasswordHost />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/host/profile"
    path="/host/profile"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <HostProfilePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/host/edit-profile"
    path="/host/edit-profile"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <EditHostProfilePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/host/events"
    path="/host/events"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <HostEventManagementPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/host/events-edit/:eventId"
    path="/host/events-edit/:eventId"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <EditEventPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/become-host"
    path="/become-host"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <BecomeHostPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/host/event/:eventId/advance-payment"
    path="/host/event/:eventId/advance-payment"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <HostAdvancePaymentPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/host/events-summary/:eventId"
    path="/host/events-summary/:eventId"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <HostEventAnalytics />
      </ProtectedRoute>
    }
  />,
];

export default HostRoutes;
