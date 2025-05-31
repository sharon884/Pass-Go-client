import React from "react";
import { getRemainingTimeInSeconds } from "../../../utils/helper";

const SeatBox =   ({ seat, isSelected, onClick }) =>  {
    const backgroundColor = seat.status === "booked"
        ? "red"
        : seat.status === "locked"
        ? "orange"
        : isSelected
        ? "green"
        : "white";
      return (
        <div onClick={onClick} style={{
        padding: "8px",
        margin: "4px",
        border: "1px solid gray",
        backgroundColor,
        cursor: seat.status === "available" ? "pointer" : "not-allowed",
      }}>
           {seat.seatNumber}
          {seat.status === "locked" && seat.lockExpiresAt && (
            <div>
              {getRemainingTimeInSeconds(seat.lockExpiresAt)}
              s Left
            </div>
          )} 
        </div>

      )

    };
    
   
export default SeatBox;
    