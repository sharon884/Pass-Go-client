import React from 'react';
import { toast } from "sonner";
import { requestVerificationHost } from "../../../services/host/hostProfileServices";


function VerifyRequestButton() {
    const handleClick = async () =>{
        try {
            const response = await requestVerificationHost();
            toast.success(response.message || "Request sent to admin");
        } catch ( error ) {
            toast.error(error.message);
        }
    } 
  return (
    <div>
        <button onClick={handleClick}>
            Verify my account
        </button>
      
    </div>
  )
}

export default VerifyRequestButton
