import React from "react";
import { Route } from "react-router-dom";
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
  <Route key="/host-home-page" path="/host-home-page" element={<HostHomePage />} />,
  <Route key="/host/add-event" path="/host/add-event" element={<HostAddEventPage />} />,
  <Route key="/host/change-password" path="/host/change-password" element={<ChangePasswordHost />} />,
  <Route key="/host/profile" path="/host/profile" element={<HostProfilePage />} />,
  <Route key="/host/edit-profile" path="/host/edit-profile" element={<EditHostProfilePage />} />,
  <Route key="/host/events" path="/host/events" element={<HostEventManagementPage />} />,
  <Route key="/host/events-edit/:eventId" path="/host/events-edit/:eventId" element={<EditEventPage />} />,
  <Route key="/become-host" path="/become-host" element={<BecomeHostPage />} />,
  <Route key="/host/event/:eventId/advance-payment" path="/host/event/:eventId/advance-payment" element={<HostAdvancePaymentPage />} />,
  <Route key="/host/events-summary/:eventId" path="/host/events-summary/:eventId" element={<HostEventAnalytics />} />,
];

export default HostRoutes;
