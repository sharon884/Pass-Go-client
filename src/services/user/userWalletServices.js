import api from "../../utils/api/api";

export const fetchUserWallet = async () => {
    try {
        const response = await api.get("/user/wallet/info");
       console.log( "ahfjkaldfhkl",+response.data.balance)
        return response;

    } catch ( error ) {
        throw new Error(error.response?.data?.message || "Failed to fetch use wllate info");
    }
    };


