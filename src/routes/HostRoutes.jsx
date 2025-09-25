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
import HostWalletPage from "../pages/hostPages/HostWalletPage";
import HostWallet from "../components/HostComponets/Wallet/HostWallet";
import NotificationPage from "@/pages/generalPages/NotificationPage";
import ChangePassword from "@/components/UserComponents/ChangePassword";
import HostTermsAndConditions from "@/components/generalComponents/Terms&conditions/HostTerms&conditions";
import HostTermsConditionsPage from "@/pages/hostPages/HostTerms&ConditionsPage";
import HostEditEventPage from "@/pages/hostPages/HostEditEventPage";

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
