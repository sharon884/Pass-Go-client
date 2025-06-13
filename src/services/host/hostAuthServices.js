import api from "../../utils/api/api";

export const logoutHost = async () => {
    try {
        const response = await api.post("/host/auth/logout-host");
        return response.data;  
    } catch ( error ) {
        throw new Error(response.data.message || "host logout failed")
    }
};