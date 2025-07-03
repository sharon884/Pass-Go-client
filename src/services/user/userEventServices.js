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

export const fetchApproveEvents = async ( page = 1, limit = 6 ) => {
    try {
        const response = await api.get(`/user/events/approved-events?page=${page}&limit=${limit}`);
        return response.data;
    } catch ( error ) {
        console.error("while fetching approved events error:",error);
        throw new Error("while fetching apporved events error:",error);
    }
};

export const fetchApprovedEventsById = async ( eventId ) => {
    try {
        const response = await api.get(`/user/events/approved-events/${eventId}`);
        return response.data.event;
    } catch ( error ) {
        console.error("while fetching approved event by id error:",error );
        throw new Error("while fetching approved event by id error:",error);
    };
};