import React, { lazy } from "react"; // ADDED lazy
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// LAZY LOADED PAGES
const UserHomePage = lazy(() => import("../pages/userPages/UserHomePage"));
const UserEvents = lazy(() => import("../components/UserComponents/UserEvent"));
const UserEventDetailPage = lazy(() => import("../pages/userPages/UserEventDetailPage"));
const UserProfilePage = lazy(() => import("../pages/userPages/UserProfilePage"));
const EditUserProfilePage = lazy(() => import("../pages/userPages/EditUserProfilePage"));
const UserTicketSeatCountSelectionPage = lazy(() => import("../pages/userPages/UserTicketSeatCountSelectionPage"));
const UserTicketSeatSelectionPage = lazy(() => import("../pages/userPages/UserTicketSeatSelectionPage"));
const Checkout = lazy(() => import("../components/UserComponents/Payment/checkout"));
const PaymentSuccess = lazy(() => import("../components/UserComponents/Payment/PaymentSuccess"));
const UserBookingsPage = lazy(() => import("../pages/userPages/userBookingsPage"));
const UserSearchResult = lazy(() => import("../pages/userPages/UserSearchResultPage"));
const TicketInfoPage = lazy(() => import("../pages/userPages/TicketInfo"));
const CheckoutWithoutSeatPage = lazy(() => import("../pages/userPages/CheckoutWithoutSeatPage"));
const UserPaymentSuccess = lazy(() => import("../pages/userPages/UserPaymentSuccess"));
const CategoryBasedEvents = lazy(() => import("../pages/userPages/CategoryBasedEvents"));
const UserBookingDetailsPage = lazy(() => import("../pages/userPages/UserBookingDetailsPage"));
const UserWalletPage = lazy(() => import("../pages/userPages/UserWalletPage"));
const UserChangePasswordPage = lazy(() => import("../pages/userPages/UserChangePasswordPage"));
const NotificationPage = lazy(() => import("@/pages/generalPages/NotificationPage"));
const UserTermsConditionsPage = lazy(() => import("@/pages/userPages/UserTerms&ConditionsPage"));

const allowedRoles = ["user", "host"];

const UserRoutes = [
  <Route
    key="/user/home"
    path="/user/home"
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
    key="/user/profile/edit"
    path="/user/profile/edit"
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
    key="/user/search"
    path="/user/search"
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
    key="/user/terms"
    path="/user/terms"
    element={<UserTermsConditionsPage/>}
  />,
];

export default UserRoutes;