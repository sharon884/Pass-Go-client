import { useState } from "react";
import { requestedOtp, verifyHostOtp } from "../../../services/host/becomeHostServices";
import { toast } from "sonner";
 
const BecomeHostForm = () => {
    const [ formData , setFormData ] = useState({
        name : "",
        mobile: "",
        panNumber : "",
        panImage : "",
    });

    const [ otp , setOtp ] = useState("");
    const [ otpSent , setOtpSent ] = useState(false);

    const handleChange = (e) => {
        const { name , value, files } = e.target;
        setFormData((prev) => ({
            ...prev,[name] : files ? files[0] : value,
        }));
    };

    const handleRequestOtp = async (e) => {
        e.preventDefault();

        const result = await requestedOtp(formData);

        if ( result.success ) {
            toast.success("OTP sent to your mobile number");
            setOtpSent(true);
        } else {
            toast.error("Failed to send OTP.Please try again!" || result.message );
        }
    };


const handleVerifyOtp = async () => {
    const result = await verifyHostOtp(formData.mobile, otp );

    if ( result.success ) {
        toast.success("OTP verified successfully! your host request being processed.");
    } else {
        toast.error(result.message || "Invalid OTP ");
    }
};

return (
    <div>
        <h2>
            Become a Host
        </h2>
        <form onSubmit={handleRequestOtp}>
            <input type="text" name="name" placeholder="Name as per Pancard" value={formData.name} onChange={handleChange} required/>
            <input type="text" name="mobile" placeholder="Enter Moblile Number connected with Pancard" value={formData.mobile} onChange={handleChange} required/>
            <input type="text" name="panNumber" placeholder="Enter Your Pancard number" value={formData.panNumber} onChange={handleChange} required/>
            <input type="file" name="panImage" accept="image/*" onChange={handleChange} required/>
            <button type="submit"> Send OTP </button>
            
        </form>
        {otpSent && (
            <div>
                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <button onClick={handleVerifyOtp}>
                    Verify OTP & 
                    Submit 
                </button>
            </div>
        )}
    </div>
)

};

export default BecomeHostForm;
