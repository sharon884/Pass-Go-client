import React from "react";
import { getHostProfile } from "../../services/host/hostProfile.Services.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { useEffect } from "react";
import VerifyRequestButton from "./Profile/VerifyRequestButton.jsx";
import { socket } from "../../utils/socket/socket.js";

const HostProfile = () => {
    const [ host , setHost ] = useState(null);
    const [ loading , setLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(()=> {
        const fetchHostProfile = async () => {
            try {
                const hostProfileData = await getHostProfile();
                setHost(hostProfileData.host);
                toast.success("Profile loaded successfully");
                if ( hostProfileData?.host?.id ) {                
                    socket.emit("verifying-host", hostProfileData.host.id);

                    socket.on("host-verification-status", (data) => { 
                        toast.info(data.message || "verification status changed!");
                        setHost(Prev => ({ ...Prev,isVerified : data.verified}));
                    });
                }

            } catch ( error ) {
                toast.error(error.message || "Failed to load profile");
            }finally {
                setLoading(false);
            }
        }
        fetchHostProfile();
        return () => {
            socket.off("host-verification-status");
        }
    },[]);

    if ( loading ) return <div>Loading...</div>
    if ( !host ) return <div>No user data found</div>

    return (
        <div>
            <h2>Host Profile</h2>
            <div>
                <img src={host.profile_image || "../../../public/default.jpeg"}  alt="" />
            </div>
            <div>
                <p>Name : {host.name}</p>
                <p>email: {host.email}</p>
                <p>Mobile: {host.email}</p>
                <p>Role: {host.role}</p>
            </div>
            <div>
                <button onClick={()=>navigate("/host/Edit-Profile-Host")} >Edit Profile</button>
            </div>
            <div>
                <button onClick={()=>navigate("/profile/Change-Password-Host")}>Change Password</button>
            </div>
            <div>
                <VerifyRequestButton/> 
            </div>
        </div>
    )    
};

export default HostProfile;