import api from "../../utils/api/api";



export const fetchEvents = async ({ endpoint = "/admin/event-management/events", params = {} } = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
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