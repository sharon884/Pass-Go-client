import api from "../../utils/api/api";

//Fetch Host Events 
export const fetchHostEvents = async () => {
    try {
        const response = await api.get("/host/event/my-events");
        return response.data;
    } catch ( error ) {
        console.error("Error fetching host events", error.response.data.message );
        throw error;
    }
};

//Fetch Event Details For Editing
export const getEventDetailsById  = async ( eventId ) => {
    try {
        const response = await api.get(`/host/event/${eventId}`);
        console.log(response.data);
        
        const { success, message, data } = response.data;
       return { success, message,  event: data.event };
    } catch ( error ) {
        console.log("Error fetching Event details", error.response.data.message);
          throw error; 
    }
};

//Upadte Event 
export const updateEventById = async ( eventId, updatedData ) => {
    try {
        const response = await api.put(`/host/event/${eventId}`, updatedData );
        return response.data;
    } catch ( error ) {
        console.log("Error upadating event details",error.response.data.message );
        throw error;
    }
};

//fetch event details for view analytics 
export const getHostEventBookings = async ( eventId ) => {
    try {
        const response = await api.get(`/event_analytics/${eventId}/summary`);
        return response.data;
    } catch ( error ) {
        console.log("error while fetching the event bookings for host event analytics");
        throw error;
    }
};

