import api from "../../utils/api/api";

export const searchEvents = async( query, page = 1, limit = 6 ) => {
    try {
        const response = await api.get(`/user/events/search`, {
            params : { query, page, limit },
        });
        return response.data;
    } catch ( error ) {
        console.error("Search error", error);
        return { success : false, events : []};
    }

};
export const fetchApproveEvents = async (
  page = 1,
  limit = 8, // Updated default limit to 8
  eventType = "all",
  sortBy = "latest",
  category = "", // Added category parameter
  latitude = null, // Added latitude parameter
  longitude = null, // Added longitude parameter
) => {
  try {
    const params = {
      page,
      limit,
    }
    if (eventType && eventType !== "all") params.eventType = eventType
    if (sortBy) params.sortBy = sortBy
    if (category) params.category = category // Add category to params
    if (latitude !== null) params.latitude = latitude // Add latitude to params
    if (longitude !== null) params.longitude = longitude // Add longitude to params

    const response = await api.get(`/user/events/approved-events`, { params })
    return response.data
  } catch (error) {
    console.error("Error while fetching approved events:", error)
    throw new Error("Failed to fetch approved events")
  }
}



export const fetchApprovedEventsById = async ( eventId ) => {
    try {
        const response = await api.get(`/user/events/approved-events/${eventId}`);
        const { event, offer } = response.data;
        return { event, offer };
    } catch ( error ) {
        console.error("while fetching approved event by id error:",error );
        throw new Error("while fetching approved event by id error:",error);
    };
};