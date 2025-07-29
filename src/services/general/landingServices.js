
import api from "../../utils/api/api"; 

export const fetchLandingRunningEvents = async () => {
    try {

        const response = await api.get("/landing/events");
        return response.data.events;
    } catch ( error ) {
         return {
      success: false,
      message: error.response?.data?.message || "Failed to load events for landing componet",
    };
    }
};
