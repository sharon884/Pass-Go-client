import api from "../../utils/api/api";


// Fetch event summary analytics
export const getHostEventBookings = async (eventId) => {
  try {
    const response = await api.get(`/host/event_analytics/${eventId}/summary`);
    return response.data;
  } catch (error) {
    console.error("Error while fetching host event booking summary:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to load event analytics",
    };
  }
};
