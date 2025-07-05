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
  limit = 6,
  eventType = "all",
  sortBy = "",
  category = ""
) => {
  try {
    const params = {
      page,
      limit,
    }

    if (eventType && eventType !== "all") params.eventType = eventType
    if (sortBy) params.sortBy = sortBy
    if (category) params.category = category 

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
        return response.data.event;
    } catch ( error ) {
        console.error("while fetching approved event by id error:",error );
        throw new Error("while fetching approved event by id error:",error);
    };
};