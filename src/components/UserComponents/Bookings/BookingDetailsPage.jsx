import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserBookings } from "../../../services/user/userBookingsServices";
import {
  cancelFreeTicket,
  cancelPaidTickets,
} from "../../../services/user/userCancelTicketServices";
import { toast } from "sonner";

const BookingDetailsPage = () => {
  const { id } = useParams(); // Booking ID
  const location = useLocation(); // Get bookingType from state
  const navigate = useNavigate();
  const bookingType = location.state?.bookingType;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const { orders, tickets } = await getUserBookings();
        let found = null;

        if (bookingType === "order") {
          found = orders.find((o) => o._id === id);
        } else if (bookingType === "ticket") {
          found = tickets.find((t) => t._id === id);
        }

        setBooking(found);
      } catch (error) {
        console.error("Failed to fetch booking:", error);
        toast.error("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id, bookingType]);

  const handleCancel = async () => {
    if (!booking || cancelling) return;

    const confirmCancel = window.confirm("Are you sure you want to cancel this ticket?");
    if (!confirmCancel) return;

    setCancelling(true);

    try {
      if (bookingType === "ticket") {
        await cancelFreeTicket(booking._id);
        toast.success("Free ticket cancelled successfully.");
      } else if (bookingType === "order") {
        await cancelPaidTickets([booking._id]);
        toast.success("Paid ticket refund requested.");
      }

      // Update booking status locally
      setBooking((prev) => ({ ...prev, status: "cancelled" }));

      setTimeout(() => {
        navigate("/bookings");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Failed to cancel ticket.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <div className="p-6">Loading booking details...</div>;

  if (!booking) return (
    <div className="p-6 text-red-500">Booking not found.</div>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{booking.event?.title}</h1>

      <div className="space-y-2 text-gray-700">
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Booking Type:</strong> {bookingType}</p>
        {booking.amount !== undefined && (
          <p><strong>Amount Paid:</strong> ₹{booking.amount}</p>
        )}
        <p><strong>Category:</strong> {booking.category}</p>
        <p><strong>Location:</strong> {booking.event?.location}</p>
        <p><strong>Date:</strong> {new Date(booking.event?.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {booking.event?.time}</p>
      </div>

      {booking.status !== "cancelled" && (
        <button
          onClick={handleCancel}
          className={`mt-6 px-4 py-2 rounded text-white ${cancelling ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}
          disabled={cancelling}
        >
          {cancelling ? "Cancelling..." : "Cancel Ticket"}
        </button>
      )}

      {booking.status === "cancelled" && (
        <p className="mt-4 text-green-600 font-semibold">
          This ticket has been cancelled.
        </p>
      )}
    </div>
  );
};

export default BookingDetailsPage;
