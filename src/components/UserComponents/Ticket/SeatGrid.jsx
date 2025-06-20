import React from "react";
import SeatBox from "./SeatBox";
import { toast } from "sonner";

const SeatGrid = ({ seats, selectedSeats, setSelectedSeats, seatCount, button }) => {
 const handleClick = (seatId, status) => {
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
    return (
        <div>
            {seats.map((seat) => (
                <SeatBox
                key={seat._id}
                seat={seat}
                isSelected={selectedSeats.includes(seat._id)}
                onClick={() => handleClick(seat._id, seat.status)}
                />
            ))}
            <button onClick={button}> Cancel Selection </button>
        </div>
    )
};

export default SeatGrid;


