import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/generalPages/Signup";
import OtpPage from "./pages/generalPages/OTP";
import LandingPage from "./components/generalComponents/landing";
import UserHomePage from "./pages/userPages/UserHomePage";
import HostHomePage from "./pages/hostPages/HostHomePage";
import Login from "./pages/generalPages/Login";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
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
import EditEventPage from "./pages/hostPages/EditEventPage";
import UserTicketSeatCountSelectionPage from "./pages/userPages/UserTicketSeatCountSelectionPage";
import UserTicketSelectionPage from "./pages/userPages/UserTicketSeatSelectionPage";
import Checkout from "./components/UserComponents/Payment/checkout";
import PaymentSuccess from "./components/UserComponents/Payment/PaymentSuccess";
import UserBookingsPage from "./pages/userPages/userBookingsPage";
import UserSearchResultPage from "./pages/userPages/UserSearchResultPage";
import AdminEventApprovePage from "./pages/adminPages/AdminEventApprovePage";
import WelcomPage from "./pages/generalPages/WelcomPage";
import BecomeHostPage from "./pages/hostPages/BecomeHostPage";
import HostPendingRequstPage from "./pages/adminPages/HostPendingRequstPage";
import HostAdvancePayment from "./components/HostComponets/HostAdvancePayment/HostAdvancePayment";
import HostAdvancePaymentPage from "./pages/hostPages/HostAdvancePaymentPage";
import TicketInfo from "./pages/userPages/TicketInfo";
import CheckoutWithoutSeat from "./components/UserComponents/FreeTicket/CheckoutWithoutSeat";
import CategoryEvents from "./components/UserComponents/CategoryEvents";
import CategoryBasedEvents from "./pages/userPages/CategoryBasedEvents";
import CheckoutWithoutSeatPage from "./pages/userPages/CheckoutWithoutSeatPage";
import UserPaymentSuccess from "./pages/userPages/UserPaymentSuccess";
import HostEventAnalytics from "./components/HostComponets/HostBookings";
import BookingDetailsPage from "./components/UserComponents/Bookings/BookingDetailsPage";

function AppRoutes() {
  return (
    <Routes>
      {/* General Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<OtpPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/welcome-page" element={<WelcomPage />} />

      {/* Admin Routes */}
      <Route path="/admin-login" element={<Login />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route
        path="/admin/events/approval"
        element={<AdminEventApprovePage />}
      />
      <Route
        path="/admin/verify-host-request"
        element={<HostPendingRequstPage />}
      />

      {/* User Routes */}
      <Route path="/user-home-page" element={<UserHomePage />} />
      <Route path="/user/events" element={<UserEvents />} />
      <Route path="/your-event/:id" element={<UserEventDetailPage />} />
      <Route
        path="/user/change-password"
        element={<UserChangePasswordPage />}
      />
      <Route path="/user/profile" element={<UserProfilePage />} />
      <Route path="/user/edit-profile" element={<EditUserProfilePage />} />
      <Route
        path="/user/event/:eventId/select-seat-counts"
        element={<UserTicketSeatCountSelectionPage />}
      />
      <Route
        path="/user/event/:eventId/select-seats"
        element={<UserTicketSelectionPage />}
      />
      <Route path="/user/event/:eventId/checkout" element={<Checkout />} />
      <Route
        path="/user/event/:eventId/payment-success"
        element={<PaymentSuccess />}
      />
      <Route path="/user/bookings" element={<UserBookingsPage />} />
      <Route path="/search-results" element={<UserSearchResultPage />} />
      <Route path="/user/event/:id/ticket-info" element={<TicketInfo/>} />

      <Route
        path="/user/event/:eventId/checkout-without-seat"
        element={<CheckoutWithoutSeatPage/>}
      />

      <Route
        path="/user/event/:eventId/payment-success"
        element={<UserPaymentSuccess/>}
      />
      
      <Route path ="/user/category/:categoryName" element={<CategoryBasedEvents/> } />
      <Route path="/booking-details/:id" element={<BookingDetailsPage/>} />





      {/* Host Routes */}
      <Route path="/host-home-page" element={<HostHomePage />} />
      <Route path="/host/add-event" element={<HostAddEventPage />} />
      <Route path="/host/change-password" element={<ChangePasswordHost />} />
      <Route path="/host/profile" element={<HostProfilePage />} />
      <Route path="/host/edit-profile" element={<EditHostProfilePage />} />
      <Route path="/host/events" element={<HostEventManagementPage />} />
      <Route path="/host/events-edit/:eventId" element={<EditEventPage />} />
      <Route path="/become-host" element={<BecomeHostPage />} />
      <Route
        path="/host/event/:eventId/advance-payment"
        element={<HostAdvancePaymentPage />}
      />
      <Route path="/host/events-summary/:eventId" element= {<HostEventAnalytics/> } />
    </Routes>
  );
}

export default AppRoutes;
