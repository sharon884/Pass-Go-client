import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  getAllSeatsForEvent,
  lockSeats,
  unlockSeats,
} from "../../services/user/userTickerServices";
import { socket } from "../../utils/socket/socket";

function TicketSeatSelectionComponent() {
  const { eventId } = useParams();
  const location = useLocation();
  const seatCount = location.state?.seatCount || 1;

  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seatData = await getAllSeatsForEvent(eventId);
        setSeats(seatData);
        socket.emit("join-event-room", eventId);
        console.log("joined event room", eventId);
      } catch (error) {
        toast.error(error.message || "Error loading seats");
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();

    socket.on("connect", () => {
      console.log("socket connected in the seat slection component");
    });

    const handleSeatLocked = ({ seats: lockedSeatIds, seatNumbers, lockExpiresAt }) => {
      console.log("seat locked", lockedSeatIds, seatNumbers, lockExpiresAt);

      if (lockedSeatIds > 0) {
        const lockedSeatNumbers = seats
          .filter((seat) => lockedSeatIds.includes(seat._id))
          .map((seat) => seat.seatNumber)
          .join(", ");

          const displaySeatNumbers = seatNumbers || seats .filter((seat) => lockedSeatIds.includes(seat._id)).map((seat) => seat.seatNumber).join(", ");
        toast.info(
          `Seats ${displaySeatNumbers} have been locked by another user.`,
          {
            duration: 5000,
            icon: "-lock",
          }
        );
      }
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          lockedSeatIds.includes(seat._id)
            ? { ...seat, status: "locked", lockExpiresAt }
            : seat
        )
      );

      const unlockTimeout = new Date(lockExpiresAt).getTime() - Date.now();
      setTimeout(() => {
        setSeats((prevSeats) =>
          prevSeats.map((seat) =>
            lockedSeatIds.includes(seat._id) && seat.status === "locked"
              ? { ...seat, status: "available", lockExpiresAt: null }
              : seat
          )
        );

        if (lockedSeatIds.length > 0) {
          const unlockedSeatNumbers = seats
            .filter((seat) => lockedSeatIds.includes(seat._id))
            .map((seat) => seat.seatNumber)
            .join(", ");
          toast.info(`Seats ${unlockedSeatNumbers} are now available again.`, {
            duration: 5000,
            icon: "-lock",
          });
        }
      }, unlockTimeout);
    };

    socket.on("seat-locked", handleSeatLocked);

    return () => {
      socket.emit("leave-event-room", eventId);
      socket.off("seat-locked", handleSeatLocked);
    };
  }, [eventId]);

  useEffect(() => {
    const handleSeatUnlocked = ({ seats: unlockedSeatIds }) => {
      console.log("seat unlocked", unlockedSeatIds);

      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          unlockedSeatIds.includes(seat._id) && seat.status === "locked"
            ? { ...seat, status: "available", lockExpiresAt: null }
            : seat
        )
      );

      const unlockedSeatNumbers = seats
        .filter((seat) => unlockedSeatIds.includes(seat._id))
        .map((seat) => seat.seatNumber)
        .join(", ");

      toast.info(`Seats ${unlockedSeatNumbers} are now available again.`, {
        icon: "-lock",
      });

      return prevSeats.map(( seat ) => 
        unlockedSeatIds.includes(seat._id) && seat.status === "locked"
          ? { ...seat, status: "available", lockExpiresAt: null }
          : seat
      );
    };

    socket.on("seat-unlocked", handleSeatUnlocked);

    return () => {
      socket.off("seat-unlocked", handleSeatUnlocked);
    };


  }, [seats]);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((n) => n + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSeatClick = (seatId, status) => {
    if (status !== "available") return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
    } else {
      if (selectedSeats.length < seatCount) {
        setSelectedSeats((prev) => [...prev, seatId]);
      } else {
        toast.warning(`You can select only ${seatCount} seats(s)`);
      }
    }
  };

  const handleConfirmSelection = async () => {
    try {
      const response = await lockSeats(eventId, selectedSeats);
      const selectedseatNumbers = seats.filter(seat => selectedSeats.includes(seat._id)).map(seat => seat.seatNumber).join(", "); 

      toast.success(`Seats ${selectedseatNumbers} locked successfully!`,{
        duration : 5000,
            icon : "-lock",
      });
      console.log("Lock expires at : ", response.lockExpiresAt);
      socket.emit("lock-seats", {
        eventId,
        seats: selectedSeats,
        lockExpiresAt: response.lockExpiresAt,
      });

      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          selectedSeats.includes(seat._id)
            ? {
                ...seat,
                status: "locked",
                lockExpiresAt: response.lockExpiresAt,
              }
            : seat
        )
      );
    } catch (error) {
      toast.error(error.message);
    }
  };
   
  useEffect(() => {
    const handleBeforeUnload = () => {
      if ( selectedSeats.length >  0) {
        socket.emit("unlock-seats", {
          eventId,
          seats : selectedSeats,
        })
      }
    }
         // unlock Tab close or refresh
    window.addEventListener("beforeUnload", handleBeforeUnload);

    // also unlock if navigating to a different route (unmount);
    return () => {
      handleBeforeUnload();
      window.addEventListener("beforeUnload", handleBeforeUnload);
    }
  }, [ selectedSeats, eventId]);

  useEffect(() => {
    return () => {
      unlockSeats(eventId, selectedSeats);
    }
  },[eventId, selectedSeats]);

  if (loading) return <div>Loading seat map...</div>;
  return (
    <div>
      <h2>Select{seatCount} Seat(s)</h2>
      {seats.map((seat) => (
        <div
          key={seat._id}
          onClick={() => handleSeatClick(seat._id, seat.status)}
          style={{
            padding: "8px",
            margin: "4px",
            border: "1px solid gray",
            backgroundColor:
              seat.status === "booked"
                ? "red"
                : seat.status === "locked"
                ? "orange"
                : selectedSeats.includes(seat._id)
                ? "green"
                : "white",
            cursor: seat.status === "available" ? "pointer" : "not-allowed",
          }}
        >
          {seat.seatNumber}
          {seat.status === "locked" && seat.lockExpiresAt && (
            <div>
              {Math.max(
                0,
                Math.floor(
                  (new Date(seat.lockExpiresAt).getTime() - Date.now()) / 1000
                )
              )}
              s Left
            </div>
          )}
        </div>
      ))}
      <div style={{ marginTop: "16px" }}>
        {selectedSeats.length === seatCount && (
          <button onClick={handleConfirmSelection}> Confirm Selection </button>
        )}
      </div>
    </div>
  );
}

export default TicketSeatSelectionComponent;
