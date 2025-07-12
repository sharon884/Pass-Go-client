import api from "../../utils/api/api";

export const cancelFreeTicket = async ( ticketId ) => {
    try {
        const response = await api.delete(`/user/tickets/free/${ticketId}/cancel`);
        return response.data;

    } catch ( error ) {
        console.error("cancel free ticket event error:",error);
             throw new Error(error?.response?.data?.message || "Failed to cancel free ticket");

    }
};


export const cancelPaidTickets = async ( ticketIds ) => { 
    try {

        const response = await api.delete(`/user/tickets/paid/cancel`,{ data : {ticketIds }});
        return response.data;
    } catch ( error ) {
        console.error("cancel paid tickets error:", error );
         throw new Error(error?.response?.data?.message || "Failed to cancel paid ticket");
    }
}