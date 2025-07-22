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




// Fetch event summary analytics
export const getEventBookingsSummary = async (eventId) => {
  try {
    const response = await api.get(`/event_analytics/${eventId}/summary`);
    
    return response.data;
  } catch (error) {
    console.error("Error while fetching host event booking summary:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to load event analytics",
    };
  }
};