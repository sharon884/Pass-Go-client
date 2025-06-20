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