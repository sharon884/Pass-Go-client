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