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