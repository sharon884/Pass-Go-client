import api from "../../utils/api/api";

export const fetchAdminWallet = async () => {
    try {
        const response = await api.get("/admin/wallet/info");
        return response;

    } catch ( error ) {
        throw new Error(error.response?.data?.message || "Failed to fetch use wllate info");
    }
    };
