// src/routes/HostRoutes.jsx

import React, { lazy } from "react"; // ADDED lazy
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// LAZY LOADED PAGES
const HostHomePage = lazy(() => import("../pages/hostPages/HostHomePage"));
const HostAddEventPage = lazy(() => import("../pages/hostPages/HostAddEventPage"));
const ChangePassword = lazy(() => import("@/components/UserComponents/ChangePassword"));
const HostProfilePage = lazy(() => import("../pages/hostPages/HostProfilePage"));
const EditHostProfilePage = lazy(() => import("../pages/hostPages/EditHostProfilePage"));
const HostEventManagementPage = lazy(() => import("../pages/hostPages/HostEventManagementPage"));
const BecomeHostPage = lazy(() => import("../pages/hostPages/BecomeHostPage"));
const HostAdvancePaymentPage = lazy(() => import("../pages/hostPages/HostAdvancePaymentPage"));
const HostEventAnalytics = lazy(() => import("../components/HostComponets/HostBookings"));
const HostWalletPage = lazy(() => import("../pages/hostPages/HostWalletPage"));
const NotificationPage = lazy(() => import("@/pages/generalPages/NotificationPage"));
const HostTermsConditionsPage = lazy(() => import("@/pages/hostPages/HostTerms&ConditionsPage"));
const HostEditEventPage = lazy(() => import("@/pages/hostPages/HostEditEventPage"));

// Cleaned up unused direct imports (ChangePasswordHost, HostWallet, HostTermsAndConditions)

const HostRoutes = [
  <Route
    key="/host"
    path="/host"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <HostHomePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/host/add"
    path="/host/add"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <HostAddEventPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/host/password"
    path="/host/password"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <ChangePassword />
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
    key="/host/profile/edit"
    path="/host/profile/edit"
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
        <HostEditEventPage/>
      </ProtectedRoute>
    }
  />,
  <Route
    key="/become-host"
    path="/become-host"
    element={
      <ProtectedRoute allowedRoles={["user", "host"]}>
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

  <Route
    key="/host/wallet"
    path="/host/wallet"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <HostWalletPage />
      </ProtectedRoute>
    }
  />,

  <Route
    key="/host/notifications"
    path="/host/notifications"
    element={
      <ProtectedRoute allowedRoles={["host"]}>
        <NotificationPage />
      </ProtectedRoute>
    }
  />,

  <Route
    key="/host/terms"
    path="/host/terms"
    element={<HostTermsConditionsPage />}
  />,
];

export default HostRoutes;