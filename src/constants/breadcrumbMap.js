const breadcrumbMap = {
  // General
  "/": "Home",
  "/login": "Login",
  "/signup": "Signup",
  "/otp": "Verify OTP",
  "/reset-password": "Forgot Password",
  "/welcome": "Welcome",

  // User Routes
  "/user/home": "User Home",
  "/user": "User", // ⬅️ Add this for root grouping
  "/user/profile": "Profile",
  "/user/profile/edit": "Edit Profile",
  "/user/bookings": "My Bookings",
  "/user/wallet": "My Wallet",
  "/user/notifications": "Notifications",
  "/user/tickets": "My Tickets", // ⬅️ optional parent
  "/user/tickets/free/:ticketId": "Free Ticket",
  "/user/tickets/paid/:ticketId": "Paid Ticket",
  "/user/event": "Events", // ⬅️ new intermediate path
  "/user/event/:eventId": "Event Info",
  "/user/event/:eventId/checkout": "Checkout",
  "/user/event/:eventId/success": "Booking Success",

  // Host Routes
  "/host": "Host Home",
  "/host": "Host",
  "/host/profile": "Host Profile",
  "/host/profile/edit": "Edit Host Profile",
  "/host/events": "Event Management",
  "/host/add": "Add Event",
  "/host/events/edit/:eventId": "Edit Event",
  "/host/wallet": "Host Wallet",
  "/host/earnings": "Earnings",
  "/host/bookings": "Bookings",
  "/host/bookings/:eventId": "Event Bookings",
  "/host/event": "Host Events", // intermediate
  "/host/event/:eventId/view": "Event View",
  "/host/event/:eventId/checkin": "Check-in",
  "/host/notifications": "Notifications",

  // Admin Routes
  "/admin/dashboard": "Admin Dashboard",
  "/admin": "Admin",
  "/admin/events": "Events",
  "/admin/events/approval": "Approve Events",
  "/admin/event-listing": "Event Listing",
  "/admin/event-summary": "Event Summary",
  "/admin/event-management": "Event Management",
  "/admin/event-management/details/:eventId": "Event Info",
  "/admin/events/summary/:eventId": "Booking Summary",
  "/admin/users": "User List",
  "/admin/hosts": "Host List",
  "/admin/hosts/pending": "Verify Hosts",
  "/admin/transactions": "Transaction Logs",
  "/admin/refunds": "Refund Logs",
  "/admin/wallet": "Admin Wallet",
  "/admin/notifications": "Notifications",

  // Public Event Access
  "/your-event": "Event",
  "/your-event/:id": "Event Details",
};

export default breadcrumbMap;
