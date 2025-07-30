// client/services/host/eventCancellationService.js
import api from "../../utils/api/api";

export const submitCancellationRequest = async (eventId, reason) => {
    try {
        const response = await api.post(`/host/events/${eventId}/cancel-request`, { reason });
        return response.data;

    } catch ( error ) {
         return {
      success: false,
      message: error.response?.data?.message || "Failed to request cancel event",
    };
    }
};
