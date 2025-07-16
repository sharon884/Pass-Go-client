import api from "../../utils/api/api";
 
export const  getEventTickets  = async ( eventId ) => {
     try {
        const response = await api.get(`/user/tickets/${eventId}/plans`);
        console.log(response.data.ticketPlans);
        return response.data.ticketPlans;
     } catch ( error ) {
        console.log("Error fetching event tickets:", error );
        throw new Error("Failed to load ticket type");
     }
};

export const getAllSeatsForEvent = async ( eventId ) => {
    try {
        const response = await api.get(`/user/tickets/seats/${eventId}`);
        return response.data.seats;
    }catch ( error ) {
        throw new Error(error.response?.data?.message || "Failed to fetch seats");
    }
};


export const getCheckoutDetails = async ( eventId, seatIds ) => {
     try {
       
      const response = await api.post(`/user/tickets/${eventId}/checkout-details`,{
        seatIds
      });
      
      return response.data;

     } catch ( error ) {
        throw new Error(error.response?.data?.message || "Failed to fetch checkout-details");
     }
}

export const lockSeats = async ( eventId, seatIds ) => {
    try {
        const response = await api.post("/user/tickets/lock-seats", {
            eventId,
            seatIds,
        });

        return response.data;
    } catch ( error ) {
        throw new Error(error?.response?.data?.message || "Failed to lock selected seats");
    }
};


export const unlockSeats = async ( eventId, seatIds ) => {
    try {
        const response = await api.patch("/user/tickets/unlock-seat", {
            eventId,
            seatIds,
        });

        return response.data;
    } catch ( error ) {
        throw new Error(error?.response?.data?.message || "Failed to unlock selected seats");
    }
};


export const  getEventTicketInfo = async (eventId) => {
    try {
        const res = await api.get(`/user/tickets/${eventId}/ticket-info`);
        console.log(res.data);
        return res.data;
    }  catch ( error ) {
        console.error("while fetching the ticketinfo from backend error:", error );
        throw new Error("while fetching the ticket info from bakcend error:", error);
    }
};

export const bookFreeTicket = async (eventId, category) => {
    try {
        const res = await api.post(`/user/tickets/book-free/${eventId}`, { category });
        return res.data;
    } catch ( error ) {
        console.error("while free event ticket booking error:", error );
        throw new Error("while free event ticket booking error:", error);
    }
};

// Lock tickets
export const lockPaidTickets = async (eventId, category, quantity) => {
    try {

        const res = await api.post(`/user/tickets/${eventId}/paid-event/without-seat/lock`, {
            category,
            quantity
        })
        return res.data;
  } catch ( error ) {
    console.errror("locking paid tickets without seat error:",error);
    throw new Error("locking paid tickets without seat error:",error);
  }
};

// Unlock tickets
export const unlockPaidTickets = async (eventId, category) => {
   try {
    const res = await api.post(`/api/user/tickets/${eventId}/paid-event/without-seat/unlock`, {
    category
  });
  return res.data;

} catch ( error ) {
    console.errror("unlocking paid tickets without seat error:",error);
    throw new Error("unlocking paid tickets without seat error:",error);
}
};