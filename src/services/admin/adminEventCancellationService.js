import api from "../../utils/api/api";

//  Get all pending cancellation requests
export const fetchPendingCancellationRequests = async () => {
    try {
        const response = await api.get("/admin/cancellation-requests");
        return response.data;
    }catch ( error ) {
         return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch cancel requested events",
    };
    }
};

//  Approve cancellation request
export const approveCancellationRequest = async (requestId) => {
    try {
        const response = await api.patch(`/admin/cancellation-requests/approve/${requestId}`);
        return response.data;
    }catch ( error ) {
         return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch approve cancel request",
    };
    }
};
