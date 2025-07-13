import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserBookings } from "../../../services/user/userBookingsServices";
import {
  cancelFreeTicket,
  cancelPaidTickets,
} from "../../../services/user/userCancelTicketServices";
import { toast } from "sonner";
import html2canvas from "html2canvas";


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


  const handleDownloadTicket = async (idx) => {
  const element = document.getElementById(`ticket-${idx}`);
  if (!element) return;

  const canvas = await html2canvas(element);
  const dataURL = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `ticket-${idx + 1}.png`;
  link.click();
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
{booking.eticketUrl?.length > 0 && (
  <div className="mt-6">
    <h3 className="font-semibold text-lg mb-2">🎫 Your E-Tickets</h3>
    {booking.eticketUrl.map((url, idx) => (
 <div
  key={idx}
  id={`ticket-${idx}`}
  style={{
    backgroundColor: "#ffffff", // white background
    color: "#000000",           // black text
    padding: "16px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    marginBottom: "20px",
    width: "fit-content"
  }}
>
 <img
  src={url}
  alt="QR Code"
  crossOrigin="anonymous"
  width="150"
  height="150"
/>
  <p><strong>Event:</strong> {booking.event?.title}</p>
  <p><strong>Name:</strong> {booking.user?.name || "You"}</p>
  <p><strong>Email:</strong> {booking.user?.email || "Your Email"}</p>
  <p><strong>Category:</strong> {booking.category}</p>
  <p><strong>Date:</strong> {new Date(booking.event?.date).toLocaleDateString()}</p>
  <p><strong>Time:</strong> {booking.event?.time}</p>

  <button
    onClick={() => handleDownloadTicket(idx)}
    style={{
      marginTop: "10px",
      backgroundColor: "#2563eb", // blue
      color: "#fff",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      border: "none",
    }}
  >
    Download Ticket
  </button>
</div>


    ))}
  </div>
)}




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
