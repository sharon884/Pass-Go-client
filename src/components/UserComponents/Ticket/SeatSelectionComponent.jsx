import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  getAllSeatsForEvent,
  lockSeats,
  unlockSeats,
} from "../../../services/user/userTickerServices";
import useSeatSocket from "./useSeatSocket";
import useInterval from "../../../hooks/useInterval";
import useUnlockOnLeave from "../../../hooks/useUnlockLeave";
import SeatGrid from "./SeatGrid";


const SeatSelectionComponent = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const seatCount = location.state?.seatCount || 1;

  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ seatLockedConfirmed, setSeatLockedConfirmed] = useState(false);

  const [, forceUpdate] = useState(0);

  const unlockseats = useUnlockOnLeave(eventId, selectedSeats, seatLockedConfirmed);

  useSeatSocket(eventId, seats, setSeats);  

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seatData = await getAllSeatsForEvent(eventId);
        setSeats(seatData);
      } catch (error) {
        toast.error(error.message || "Error loading seats");
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [eventId]);


//   useEffect (() => {
//     const handleBeforeUnload = () => {
//         if ( selectedSeats.length > 0 ) {
//             unlockSeats(eventId, selectedSeats);
//         }  
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//         handleBeforeUnload();
//         window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   },[selectedSeats, eventId]);

  useEffect (() => {
    return () => {
        unlockSeats(eventId, selectedSeats);
    };
  },[eventId, selectedSeats]);

  useInterval(() => forceUpdate((n) => n + 1), 1000);

  const handleConfirmSelection = async () => {
    try {
      const selectedSeatsDetails = seats.filter(seat => selectedSeats.includes(seat._id)); ///new change
        const response  = await lockSeats(eventId, selectedSeats);
        toast.success("Seats locked successfully!");
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
          setSeatLockedConfirmed(true);
          // navigate(`/Event/${eventId}/Checkout`, { state: { selectedSeats, lockExpiresAt : response.lockExpiresAt }, });
          navigate(`/Event/${eventId}/Checkout`, { state: { selectedSeats :selectedSeatsDetails, lockExpiresAt : response.lockExpiresAt }, });
    } catch ( error ) {
        toast.error(error.message);
    }
  };

  const handleCancelSelection = () => {
    if ( selectedSeats.length > 0 ) {
        unlockSeats( eventId, selectedSeats);
    }
    navigate(-1);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
        <h2>Select {seatCount} Seat(s) </h2>
           <SeatGrid seats={seats} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} seatCount={seatCount} button={handleCancelSelection} />

        
        {selectedSeats.length === seatCount && (
          <button onClick={handleConfirmSelection}> Confirm Selection </button>
        )}
    </div>
  );

}

export default SeatSelectionComponent;
    


