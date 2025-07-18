import api from "../../utils/api/api";

export const fetchHostWallet = async () => {
    try {
        const response = await api.get("/host/wallet/info");
        return response;

    } catch ( error ) {
        throw new Error(error.response?.data?.message || "Failed to fetch use wllate info");
    }
    };
