import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/generalPages/Signup";
import OtpPage from "./pages/generalPages/OTP";
import LandingPage from "./components/generalComponents/landing";
import UserHomePage from "./pages/userPages/UserHomePage";
import HostHomePage from "./pages/hostPages/HostHomePage";
import Login from "./pages/generalPages/Login";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoutes";
import HostAddEventPage from "./pages/hostPages/HostAddEventPage";
import ForgetPassword from "./pages/generalPages/ForgetPassword";
import UserEvents from "./components/UserComponents/UserEvent";
import UserEventDetailPage from "./pages/userPages/UserEventDetailPage";
import UserChangePasswordPage from "./pages/userPages/UserChangePasswordPage";
import ChangePasswordHost from "./components/HostComponets/ChangePasswordHost";
import UserProfilePage from "./pages/userPages/UserProfilePage";
import EditUserProfilePage from "./pages/userPages/EditUserProfilePage";
import HostProfilePage from "./pages/hostPages/HostProfilePage";
import EditHostProfilePage from "./pages/hostPages/EditHostProfilePage";
import HostEventManagementPage from "./pages/hostPages/HostEventManagementPage";
import EditEvent from "./components/HostComponets/EditEvent/EditEvent";
import UserTicketSeatCountSelectionPage from "./pages/userPages/UserTicketSeatCountSelectionPage";
import UserTicketSelectionPage from "./pages/userPages/UserTicketSeatSelectionPage";
import Checkout from "./components/UserComponents/Payment/checkout";
import PaymentSuccess from "./components/UserComponents/Payment/PaymentSuccess";
import UserBookingsPage from "./pages/userPages/userBookingsPage";
import UserSearchResultPage from "./pages/userPages/UserSearchResultPage";
import EditEventPage from "./pages/hostPages/EditEventPage";
import AdminEventApprovePage from "./pages/adminPages/AdminEventApprovePage";
import WelcomPage from "./pages/generalPages/WelcomPage";


function AppRoutes() {
  return (


   
    <Routes>
      {/* GeneralRoutes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/signup"
        element={
          <ProtectedRoute restrictTo="auth">
            {" "}
            <Signup />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <ProtectedRoute restrictTo="auth">
            {" "}
            <OtpPage />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute restrictTo="auth">
            {" "}
            <Login />{" "}
          </ProtectedRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/welcome-page" element={<WelcomPage/>} />

      {/* Admin Related Routes */}
      <Route
        path="/admin-login"
        element={
          <ProtectedRoute restrictTo="auth">
            {" "}
            <Login />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute restrictTo="protected" allowedRoles={["admin"]}>
            {" "}
            <AdminDashboard />{" "}
          </ProtectedRoute>
        }
      />

      <Route path="/admin/events/approval" element={<AdminEventApprovePage/> } />

      {/* User Related Routes  */}
      <Route
        path="/user-home-page"
        element={
          <ProtectedRoute restrictTo="protected" allowedRoles={["user"]}>
            {" "}
            <UserHomePage />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/events"
        element={
          <ProtectedRoute restrictTo="protected" allowedRoles={["user"]}>
            {" "}
            <UserEvents />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/your-event/:id"
        element={
          <ProtectedRoute restrictTo="protected" allowedRoles={["user"]}>
            {" "}
            <UserEventDetailPage />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/change-password"
        element={
          <ProtectedRoute restrictTo="protected" allowedRoles={["user"]}>
            {" "}
            <UserChangePasswordPage />{" "}
          </ProtectedRoute>
        }
      />

      <Route path="/user/profile" element={ <UserProfilePage/> } /> 
      <Route path="/user/edit-profile" element={ <EditUserProfilePage/> } />
      <Route path="/user/event/:eventId/select-seat-counts" element={ <UserTicketSeatCountSelectionPage/> } />
      <Route path="/user/event/:eventId/select-seats" element={ <UserTicketSelectionPage/> } />
      <Route path="/user/event/:eventId/checkout" element={ <Checkout/> } /> 
      <Route path="/user/event/:eventId/payment-success" element={ <PaymentSuccess/> } />
      <Route path="/user/bookings" element={ <UserBookingsPage/> } /> 
      <Route path="/search-results" element={<UserSearchResultPage/>} />



      {/* Host  Related Routes */}
      <Route
        path="/host-home-page"
        element={
          <ProtectedRoute restrictTo="protected" allowedRoles={["host"]}>
            {" "}
            <HostHomePage />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/add-event"
        element={
          <ProtectedRoute restrictTo="protected" allowedRoles={["host"]}>
            {" "}
            <HostAddEventPage />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/host/change-password"
        element={
          <ProtectedRoute restrictTo="protected" allowedRoles={["host"]}>
            {" "}
            <ChangePasswordHost />{" "}
          </ProtectedRoute>
        }
      />
      <Route path="/host/profile" element={ <HostProfilePage/> } /> 
      <Route path="/host/edit-profile" element={ <EditHostProfilePage/> } /> 
      <Route path="/host/events" element={ <HostEventManagementPage/> } /> 
      <Route path="/host/events-edit/:eventId" element={ <EditEventPage/> } /> 
      
    </Routes>
   
  );
};

export default AppRoutes;
