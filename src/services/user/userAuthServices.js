import api from "../../utils/api/api";

export const logoutUser = async () => {
    try {
        const response = await api.post("/user/auth/logout-user");
        return response.data;
    } catch ( error ) {
        throw new Error(response.data.message||" user logout failed");
    }
};


export const resendOtp = async (email) => {
  try {
    const response = await api.post("/user/auth/resend-otp", { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to resend OTP");
  }
};