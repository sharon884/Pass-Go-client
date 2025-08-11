import { GoogleLogin } from "@react-oauth/google";
import api from "../../utils/api/api";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";


const GoogleAuthLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;

        try {
            const response = await api.post("/user/auth/google-login", {
                token,
            });

            if (response.data.success && response.data.user) {
                const user = response.data.user;
                const role = response.data.user.role;

                 dispatch(
        setCredentials({
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          profile_image: user.profile_image,
          role: user.role,
          isVerified: user.isVerified || false,
        })
      );


                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("role", role);

                if (role === "user") {
                    navigate("/user-home-page");
                } else if (role === "host") {
                    navigate("/host");
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
