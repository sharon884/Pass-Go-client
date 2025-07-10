import api from "../../utils/api/api";

export const getUserBookings = async () => {
  try {
    const response = await api.get("/user/bookings/bookings-history");

    const { orders, tickets } = response?.data?.bookings || {}
    console.log(orders)

    return { orders, tickets };
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Failed to fetch bookings");
  }
};
