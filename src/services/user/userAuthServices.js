import api from "../../utils/api/api";

export const logoutUser = async () => {
    try {
        const response = await api.post("/user/auth/logout-user");
        return response.data;
    } catch ( error ) {
        throw new Error(response.data.message||" user logout failed");
    }
};