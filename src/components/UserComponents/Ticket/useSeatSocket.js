import { useEffect } from "react";
import { socket } from "../../../utils/socket/socket";
import { toast } from "sonner";

const useSeatSocket = (eventId, seats, setSeats) => {
  useEffect(() => {
    socket.emit("join-event-room", eventId);
    console.log("joined event room", eventId);

    const handleSeatLocked = ({ seats: lockedSeatIds, seatNumbers, lockExpiresAt }) => {
      toast.info(`Seats ${seatNumbers} have been locked by another user.`, {
        duration: 5000,
        icon: "-lock",
      });

      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          lockedSeatIds.includes(seat._id)
            ? { ...seat, status: "locked", lockExpiresAt }
            : seat
        )
      );
    };

    const handleSeatUnlocked = ({ seats: unlockedSeatIds }) => {
      toast.info(`Seats ${unlockedSeatIds} are now available again.`, {
        duration: 5000,
        icon: "-lock",
      });

      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          unlockedSeatIds.includes(seat._id) && seat.status === "locked"
            ? { ...seat, status: "available", lockExpiresAt: null }
            : seat
        )
      );
    };

    socket.on("seat-locked", handleSeatLocked);
    socket.on("seat-unlocked", handleSeatUnlocked);

    return () => {
      socket.emit("leave-event-room", eventId);
      socket.off("seat-locked", handleSeatLocked);
      socket.off("seat-unlocked", handleSeatUnlocked);
    };
  }, [eventId, seats ]);
};

export default useSeatSocket;

