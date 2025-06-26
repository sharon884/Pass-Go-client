import api from "../../utils/api/api";

export const fetchPendingEvents = async () => {
    try {
        const response = await api.get("/admin/event-management/pending-events");
        return response.data;
    } catch ( error ) {
        console.error("Error fetching pending events");
        throw new Error("Faild to fetch pending events");
    }
};

export const approveEvent  = async ( eventId ) => {
    try {
        const response = await api.patch(`/admin/event-management/approve-event/${eventId}`);
        return response.data;
    } catch ( error ) {
        console.error("failed to approve event");
        throw new Error("Failed to approve event");
    };
};


export const rejectEvent = async ( eventId , reason ) => {
     try {
        const response = await api.patch(`/admin/event-management/reject-event/${eventId}`, { reason });
        return response.data;
     } catch ( error ) {
        console.log("while event rejecting error", error.response.data.message);
        throw new Error("while admin event rejecting error ");
    };
};