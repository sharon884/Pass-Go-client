// seat unlocking automatically when a user go back form the seat selection compoent after selecting a seat
import { useEffect , useRef } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { unlockSeats } from "../services/user/userTickerServices";
import { socket } from "../utils/socket/socket";
import { toast } from "sonner";


  const useUnlockOnLeave = (eventId, selectedSeats, shouldUnlock = true) => {
  const selectedSeatsRef = useRef(selectedSeats);
  const shouldUnlockRef = useRef(shouldUnlock);

  useEffect(() => {
    selectedSeatsRef.current = selectedSeats;
    shouldUnlockRef.current = shouldUnlock;
  }, [selectedSeats, shouldUnlock]);

  const unlockSeatsHandler = async () => {
    const seatsToUnlock = selectedSeatsRef.current;
    if (!shouldUnlockRef.current || seatsToUnlock.length === 0) return;

    try {
      // API call to unlock seats
      await unlockSeats(eventId, seatsToUnlock);

      // Socket emit to notify others
      socket.emit("unlock-seats", { eventId, seats: seatsToUnlock });

      console.log("Seats unlocked on leave/navigation");
    } catch (error) {
      console.error("Unlock error:", error.message);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      unlockSeatsHandler();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unlockSeatsHandler(); // unlock on component unmount
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [eventId]);

  return unlockSeatsHandler;
};



export default useUnlockOnLeave;
    


