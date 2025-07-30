import api from "../../utils/api/api"; 

// Fetch complete admin analytics dashboard data
export const fetchAdminAnalytics = async () => {
  try {
    const response = await api.get("/admin/platform/analytics");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching admin analytics", error);
    throw error;
  }
};
