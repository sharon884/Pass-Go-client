import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../utils/api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const GoogleAuthLogin = () => {
    const [ selectedRole, setSelectedRole ] = useState(null);
    const [ showRoleModal, setShowRoleModal ] = useState(false);
    const [ triggerLogin, setTriggerLogin ] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        setShowRoleModal(true);
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setShowRoleModal(false);
        setTriggerLogin(true);
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        let endPoint = "";
        if ( selectedRole === "user") {
            endPoint = "/user/auth/google-login"
        }else if (selectedRole === "host" ) {
            endPoint = "/host/auth/google-login"
        };

        try {
            const response = await api.post(endPoint, {
                token,
            }); 
            if ( response.data.success ) {
                if ( response.data.user?.role == "user" ) {
                    localStorage.setItem("isAuthenticated", "true");
                    localStorage.setItem("role", "user");

                    dispatch(setCredentials({
                        name : response.data.user.name,
                        email : response.data.user.email,
                        profile_img : response.data.user.profile_img,
                        role : response.data.user.role,
                    }));
                    navigate("/userhomepage");
                } else if ( response.data.host?.role === "host" ) {
                    localStorage.setItem("isAuthenticated", "true");
                    localStorage.setItem("role", "host");

                    dispatch(setCredentials({
                        name : response.data.host.name,
                        email : response.data.host.email,
                        profile_img : response.data.host.profile_img,
                        role : response.data.host.role,
                    }));
                    navigate("/hosthomepage");
                }
            } else {
                console.log("signup error", response.data.message);
            }
        } catch ( error ) {
            console.log("signup error:", error);
        }
        setSelectedRole(null);
        setTriggerLogin(false);
    };

    return (
        <>
        <button onClick={handleButtonClick}> Login with Google</button>
        {showRoleModal && (
            <div>
                <h3>Choose your role </h3>
                <button onClick={ ()=> handleRoleSelect("user")}>I am User</button>
                <button onClick={ ()=> handleRoleSelect("host")}>I am Host</button>
            </div>
        )}

         {triggerLogin && (
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={ ()=> {
                console.log("Google Login failed");
                setTriggerLogin(false);
            }}
            />
         )}
        </>
    )
}

export default GoogleAuthLogin;