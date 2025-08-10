import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import UserHomePage from "../pages/userPages/UserHomePage";
import UserEvents from "../components/UserComponents/UserEvent";
import UserEventDetailPage from "../pages/userPages/UserEventDetailPage";
import UserProfilePage from "../pages/userPages/UserProfilePage";
import EditUserProfilePage from "../pages/userPages/EditUserProfilePage";
import UserTicketSeatCountSelectionPage from "../pages/userPages/UserTicketSeatCountSelectionPage";
import UserTicketSeatSelectionPage from "../pages/userPages/UserTicketSeatSelectionPage";
import Checkout from "../components/UserComponents/Payment/checkout";
import PaymentSuccess from "../components/UserComponents/Payment/PaymentSuccess";
import UserBookingsPage from "../pages/userPages/userBookingsPage";
import UserSearchResult from "../pages/userPages/UserSearchResultPage";
import TicketInfoPage from "../pages/userPages/TicketInfo";
import CheckoutWithoutSeatPage from "../pages/userPages/CheckoutWithoutSeatPage";
import UserPaymentSuccess from "../pages/userPages/UserPaymentSuccess";
import CategoryBasedEvents from "../pages/userPages/CategoryBasedEvents";
import BookingDetailsPage from "../components/UserComponents/Bookings/BookingDetailsPage";
import UserWalletPage from "../pages/userPages/UserWalletPage";
import UserChangePasswordPage from "../pages/userPages/UserChangePasswordPage";
import UserBookingDetailsPage from "../pages/userPages/UserBookingDetailsPage";
import NotificationPage from "@/pages/generalPages/NotificationPage";
import UserTermsConditionsPage from "@/pages/userPages/UserTerms&ConditionsPage";

const allowedRoles = ["user", "host"];

const UserRoutes = [
  <Route
    key="/user-home-page"
    path="/user-home-page"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <UserHomePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/events"
    path="/user/events"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <UserEvents />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/your-event/:id"
    path="/your-event/:id"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <UserEventDetailPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/change-password"
    path="/user/change-password"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <UserChangePasswordPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/profile"
    path="/user/profile"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <UserProfilePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/edit-profile"
    path="/user/edit-profile"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <EditUserProfilePage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/event/:eventId/select-seat-counts"
    path="/user/event/:eventId/select-seat-counts"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <UserTicketSeatCountSelectionPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/event/:eventId/select-seats"
    path="/user/event/:eventId/select-seats"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <UserTicketSeatSelectionPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/event/:eventId/checkout"
    path="/user/event/:eventId/checkout"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <Checkout />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/event/:eventId/payment-success"
    path="/user/event/:eventId/payment-success"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <PaymentSuccess />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/bookings"
    path="/user/bookings"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <UserBookingsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/search-results"
    path="/search-results"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <UserSearchResult />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/event/:id/ticket-info"
    path="/user/event/:id/ticket-info"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <TicketInfoPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/event/:eventId/checkout-without-seat"
    path="/user/event/:eventId/checkout-without-seat"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <CheckoutWithoutSeatPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/event/:eventId/user-payment-success"
    path="/user/event/:eventId/payment-success"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <UserPaymentSuccess />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/category/:categoryName"
    path="/user/category/:categoryName"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <CategoryBasedEvents />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/booking-details/:id"
    path="/booking-details/:id"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <UserBookingDetailsPage />
      </ProtectedRoute>
    }
  />,
  <Route
    key="/user/wallet"
    path="/user/wallet"
    element={
      <ProtectedRoute allowedRoles={allowedRoles}>
        <UserWalletPage />
      </ProtectedRoute>
    }
  />,

  <Route
  key="/user/notifications"
  path="/user/notifications"
  element={
    <ProtectedRoute allowedRoles={["user", "host"]}>
      <NotificationPage />
    </ProtectedRoute>
  }
/>,

  <Route
    key="/Terms&Conditions"
    path="/Terms&Conditions"
    element={<UserTermsConditionsPage/>}
  />,
];

export default UserRoutes;
