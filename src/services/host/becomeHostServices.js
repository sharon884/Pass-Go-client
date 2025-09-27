import api from "../../utils/api/api"
import uploadImageToCloudinary from "../../utils/uploadCloudinary/uploadCloudinary";
import { toast } from "sonner";

export const requestedOtp = async (formData ) => {
    try {
        const panImageUrl = await uploadImageToCloudinary(formData.panImage);
        console.log(formData);
        if ( !panImageUrl ){
            toast.error("PAN image upload failed.Try again");
            return { success : false, message : "PAN image upload failed"};
        }
        toast.success("Pan Image uploaded");

        const response = await api.post("/host/auth/send-otp", {
            name : formData.name,
            mobile : formData.mobile,
            panNumber : formData.panNumber,
            panImage : panImageUrl,
        });
         if ( response.data.success) {
            toast.success("An OTP send to your mobile.Please enter the OTP for verification");
         }
        return response.data;
        
    } catch ( error ) {
        console.error("Request OTP Error:",error);
        toast.error("Failed to send OTP.Try again");
        return { success : false , message : "Failed to send OTP .please try again."};
    };
};

export const verifyHostOtp = async (mobile, otp ) => {
    try {
        const response = await api.post("/host/auth/verify-otp", {
            mobile,
            otp,
        });

        if( response.data.success ) {
            toast.success("OTP verified");
        } else {
            toast.error("invalid OTP");
        }

        return response.data;
    } catch ( error ) {
        console.error("Verify OTP Error:", error);
        toast.error("Error verifying OTP");
        return { success : false, message : "OTP verification failed"};
    }; 
};