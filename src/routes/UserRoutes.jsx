import React from "react";
import { Route } from "react-router-dom";
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
import UserChangePasswordPage from "../pages/userPages/UserChangePasswordPage"; // You missed importing this

const UserRoutes = [
  <Route key="/user-home-page" path="/user-home-page" element={<UserHomePage />} />,
  <Route key="/user/events" path="/user/events" element={<UserEvents />} />,
  <Route key="/your-event/:id" path="/your-event/:id" element={<UserEventDetailPage />} />,
  <Route key="/user/change-password" path="/user/change-password" element={<UserChangePasswordPage />} />,
  <Route key="/user/profile" path="/user/profile" element={<UserProfilePage />} />,
  <Route key="/user/edit-profile" path="/user/edit-profile" element={<EditUserProfilePage />} />,
  <Route key="/user/event/:eventId/select-seat-counts" path="/user/event/:eventId/select-seat-counts" element={<UserTicketSeatCountSelectionPage />} />,
  <Route key="/user/event/:eventId/select-seats" path="/user/event/:eventId/select-seats" element={<UserTicketSeatSelectionPage />} />,
  <Route key="/user/event/:eventId/checkout" path="/user/event/:eventId/checkout" element={<Checkout />} />,
  <Route key="/user/event/:eventId/payment-success" path="/user/event/:eventId/payment-success" element={<PaymentSuccess />} />,
  <Route key="/user/bookings" path="/user/bookings" element={<UserBookingsPage />} />,
  <Route key="/search-results" path="/search-results" element={<UserSearchResult />} />,
  <Route key="/user/event/:id/ticket-info" path="/user/event/:id/ticket-info" element={<TicketInfoPage />} />,
  <Route key="/user/event/:eventId/checkout-without-seat" path="/user/event/:eventId/checkout-without-seat" element={<CheckoutWithoutSeatPage />} />,
  <Route key="/user/event/:eventId/user-payment-success" path="/user/event/:eventId/payment-success" element={<UserPaymentSuccess />} />,
  <Route key="/user/category/:categoryName" path="/user/category/:categoryName" element={<CategoryBasedEvents />} />,
  <Route key="/booking-details/:id" path="/booking-details/:id" element={<BookingDetailsPage />} />,
  <Route key="/user/wallet" path="/user/wallet" element={<UserWalletPage />} />,
];

export default UserRoutes;
