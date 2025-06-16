import { GoogleLogin } from "@react-oauth/google";
import api from "../../utils/api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// import { useDispatch } froimport {toast} from "sonner"m "react-redux";
// import { setCredentials } from "../../features/auth/authSlice";

const GoogleAuthSignup = ({ onSignupSuccess }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const endPoint = "/user/auth/google-signup"; // Unified endpoint

    try {
      const response = await api.post(endPoint, {
        token,
      });

      if (response.data.success && response.data.user) {
        const user = response.data.user;

        onSignupSuccess(user); // Optional callback

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", user.role);

        // dispatch(
        //   setCredentials({
        //     name: user.name,
        //     email: user.email,
        //     mobile: user.mobile,
        //     profile_img: user.profile_image,
        //     role: user.role,
        //   })
        // );

        if (user.role === "user") {
          navigate("/user-home-page");
        } 
      } else {
        console.log("Signup failed:", response.data.message);
      }
    } catch (error) {
      toast.error("Google signu failed.Try again or try with another email");
      console.error("Signup error:", error);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          console.log("Google signup failed");
        }}
      />
    </div>
  );
};

export default GoogleAuthSignup;
