import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEventTicketInfo,
  bookFreeTicket,
  lockPaidTickets,
} from "../../../services/user/userTickerServices";
import ConfirmModal from "../FreeTicket/ConfirmModal";
import { socket } from "../../../utils/socket/socket";
import { toast } from "sonner";

const TicketInfo = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  const [ticketData, setTicketData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [isLocked, setIsLocked] = useState(false);
  const [lockedCategory, setLockedCategory] = useState(null);
  const [lockExpiresAt, setLockExpiresAt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    fetchInfo();
    socket.emit("join-event-room", eventId);

    socket.on("free_ticket_booked", ({ category }) => {
      setTicketData((prev) => {
        const updated = { ...prev };
        updated.ticketStats[category].available -= 1;
        return updated;
      });
    });

    return () => {
      socket.emit("leave-event-room", eventId);
      socket.off("free_ticket_booked");
    };
  }, [eventId]);

  useEffect(() => {
    if (!lockExpiresAt) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const timeRemaining = lockExpiresAt - now;

      if (timeRemaining > 0) {
        setTimeLeft(Math.floor(timeRemaining / 1000));
      } else {
        setIsLocked(false);
        setLockedCategory(null);
        setLockExpiresAt(null);
        toast.warning("Ticket lock expired");
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lockExpiresAt]);

  const fetchInfo = async () => {
    try {
      const data = await getEventTicketInfo(eventId);
      setTicketData(data);
    } catch (err) {
      console.error("Error fetching ticket info:", err);
      toast.error("Failed to fetch ticket info");
    }
  };

  const handleBookClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleConfirmBooking = async () => {
    try {
      await bookFreeTicket(eventId, selectedCategory);
      socket.emit("free_ticket_booked", { category: selectedCategory, eventId });

      setTicketData((prev) => ({
        ...prev,
        userHasTicket: true,
        ticketStats: {
          ...prev.ticketStats,
          [selectedCategory]: {
            ...prev.ticketStats[selectedCategory],
            available: prev.ticketStats[selectedCategory].available - 1,
          },
        },
      }));

      toast.success("Free ticket booked successfully");
      setShowModal(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
    }
  };

  const handlePaidBookClick = (cat) => {
    setSelectedCategory(cat);
    setSelectedQuantity(1);
    setShowModal(true);
  };

  const handleConfirmLock = async () => {
    try {
      const res = await lockPaidTickets(eventId, selectedCategory, selectedQuantity);
      setIsLocked(true);
      setLockedCategory(selectedCategory);
      setLockExpiresAt(res.expiresAt);
      setShowModal(false);
      toast.success("Tickets locked for 5 minutes. Proceed to payment.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to lock tickets");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!ticketData) return <p>Loading ticket info...</p>;

  const { type, seatSelection, ticketStats, userHasTicket } = ticketData;

  if (type === "free") {
    return (
      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-bold">Free Ticket</h2>
        {["VIP", "general"].map((cat) => (
          <div key={cat} className="mt-3">
            <p className="font-medium">{cat}</p>
            <p>Available: {ticketStats[cat]?.available}</p>
            <button
              className="mt-1 px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
              onClick={() => handleBookClick(cat)}
              disabled={userHasTicket || ticketStats[cat]?.available <= 0}
            >
              {userHasTicket ? "Already Booked" : `Book ${cat}`}
            </button>
          </div>
        ))}

        <ConfirmModal
          open={showModal}
          category={selectedCategory}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmBooking}
        />
      </div>
    );
  }

  if (type === "paid_stage_without_seats") {
    return (
      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-bold mb-2">Choose Your Ticket</h2>

        {["VIP", "general"].map((cat) =>
          ticketStats[cat]?.available > 0 ? (
            <div key={cat} className="mt-4">
              <p className="font-medium">{cat}</p>
              <p>Available: {ticketStats[cat].available}</p>

              <label className="block text-sm mt-2">
                Quantity:
                <select
                  className="ml-2 border p-1"
                  value={selectedCategory === cat ? selectedQuantity : 1}
                  onChange={(e) => {
                    setSelectedCategory(cat);
                    setSelectedQuantity(Number(e.target.value));
                  }}
                  disabled={lockedCategory && lockedCategory !== cat}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>

              <button
                className="mt-2 px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
                onClick={() => handlePaidBookClick(cat)}
                disabled={isLocked || ticketStats[cat].available < selectedQuantity}
              >
                {isLocked && lockedCategory === cat ? "Locked" : `Book ${cat} Tickets`}
              </button>
            </div>
          ) : null
        )}

        {isLocked && (
          <div className="mt-5 p-3 bg-yellow-100 border border-yellow-400 rounded">
            <p className="text-sm text-yellow-800">
              🎟️ Your {lockedCategory} tickets are locked for 5 minutes.
              <br />⏱️ Time left: {formatTime(timeLeft)}
            </p>
            <button
              onClick={() =>
                navigate(`/user/event/${eventId}/checkout-without-seat`, {
                  state: {
                    category: lockedCategory,
                    quantity: selectedQuantity,
                    lockExpiresAt,
                  },
                })
              }
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Proceed to Payment
            </button>
          </div>
        )}

        <ConfirmModal
          open={showModal}
          category={selectedCategory}
          quantity={selectedQuantity}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmLock}
        />
      </div>
    );
  }

  return seatSelection ? (
    <p className="text-sm italic">Seat selection is handled in the seat layout page.</p>
  ) : null;
};

export default TicketInfo;
