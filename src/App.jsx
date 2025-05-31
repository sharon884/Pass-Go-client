import React from "react";
import "./App.css";
import { Toaster } from 'sonner';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/generalPages/Signup";
import OtpPage from "./pages/generalPages/OTP";
import LandingPage from "./pages/generalPages/LandingPage";
import UserHomePage from "./pages/userPages/UserHomePage";
import HostHomePage from "./pages/hostPages/HostHomePage";
import Login from "./pages/generalPages/Login";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import checkAuthAndLoadUserProfile from "./utils/CheckAuthAndLoadProfil";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchHostProfile } from "./features/auth/authThunk";
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
import UserTicketSelectionPage from "./pages/userPages/UserTicketSelectionPage";
import Checkout from "./components/UserComponents/Payment/checkout";
import PaymentSuccess from "./components/UserComponents/Payment/PaymentSuccess";
import UserBookingsPage from "./pages/userPages/userBookingsPage";


function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   checkAuthAndLoadUserProfile(dispatch);
  //   dispatch(fetchHostProfile());
  // }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
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
              <Login />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/login"
          element={
            <ProtectedRoute restrictTo="auth">
              {" "}
              <Login />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/userHomePage"
          element={
            <ProtectedRoute restrictTo="protected" allowedRoles={["user"]}>
              {" "}
              <UserHomePage />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/hostHomePage"
          element={
            <ProtectedRoute restrictTo="protected" allowedRoles={["host"]}>
              {" "}
              <HostHomePage />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute restrictTo="protected" allowedRoles={["admin"]}>
              {" "}
              <AdminDashboard />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/hostaddevent"
          element={
            <ProtectedRoute restrictTo="protected" allowedRoles={["host"]}>
              {" "}
              <HostAddEventPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route
          path="/userEvent"
          element={
            <ProtectedRoute restrictTo="protected" allowedRoles={["user"]}>
              {" "}
              <UserEvents />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/yourEvent/:id"
          element={
            <ProtectedRoute restrictTo="protected" allowedRoles={["user"]}>
              {" "}
              <UserEventDetailPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/Change-Password-User"
          element={
            <ProtectedRoute restrictTo="protected" allowedRoles={["user"]}>
              <UserChangePasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/Change-Password-Host"
          element={
            <ProtectedRoute restrictTo="protected">
              <ChangePasswordHost />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/user/User-Profile" element={<UserProfilePage/> } /> 
        <Route path="/user/Edit-Profile-User" element={<EditUserProfilePage/> } /> 
        <Route path="/host/Host-Profile" element={<HostProfilePage/> } /> 
        <Route path="/host/Edit-Profile-Host" element={<EditHostProfilePage/> } />
        <Route path="/Host-Events" element={<HostEventManagementPage/>} />  
        <Route path="/Host/Events/Edit/:eventId" element={<EditEvent/>} />
        <Route path="/Event/:eventId/Select-Seat-Counts" element={<UserTicketSeatCountSelectionPage/>} />
        <Route path="/Event/:eventId/Select-Seats" element={<UserTicketSelectionPage/> } />
        <Route path="/Event/:eventId/Checkout" element={<Checkout/> } />
         <Route path="/Event/:eventId/PaymentSuccess" element={<PaymentSuccess/>} />
          <Route path="/user/bookings" element={<UserBookingsPage/>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000} // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // or "dark"
      />
    </>
  );
}

export default App;
