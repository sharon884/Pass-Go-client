import { GoogleLogin } from "@react-oauth/google";
import api from "../../utils/api/api";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";

const GoogleAuthLogin = () => {
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;

        try {
            const response = await api.post("/user/auth/google-login", {
                token,
            });

            if (response.data.success && response.data.user) {
                const role = response.data.user.role;

                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("role", role);

                if (role === "user") {
                    navigate("/user-home-page");
                } else if (role === "host") {
                    navigate("/host-home-page");
                } else if (role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    console.log("Unknown role");
                }
            } else {
                toast.error("Google signu failed");
                console.log("Login failed:", response.data.message);
            }
        } catch (error) {
            console.log("Google login error:", error);
        }
    };

    return (
        <div>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Google Login Failed")}
            />
        </div>
    );
};

export default GoogleAuthLogin;
