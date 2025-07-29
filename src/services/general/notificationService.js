import api from "../../utils/api/api";

export const fetchNotifications = async ({ page = 1, limit = 10, role }) => {
  try {
    const response = await api.get("/notifications/all-notifications", {
      params: { page, limit, role },
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to load notifications",
    };
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await api.patch(
      `/notifications/mark-read/${notificationId}`
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to mark notifications as read",
    };
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const response = await api.patch("/notifications/mark-all-read");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to mark all notifications as read",
    };
  }
};

export const deleteReadNotifications = async () => {
  try {
    const response = await api.delete("/notifications/delete-read");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to delete all readed notifications ",
    };
  }
};
