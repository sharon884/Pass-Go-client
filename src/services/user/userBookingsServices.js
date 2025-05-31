import api from "../../utils/api/api";

export const getUserBookings = async () => {
    try {
        const response = await api.get("/user/bookings/bookings-history");
        return response.data.bookings;
    } catch ( error ) {
        throw new Error(error?.response?.data?.message || "Failed to fetch bookings");
    }
};