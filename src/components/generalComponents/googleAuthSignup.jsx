import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../utils/api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const GoogleAuthSignup = ({ onSignupSuccess }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [triggerLogin, setTriggerLogin] = useState(false);

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
    console.log("token gettttt", token);
    let endPoint = "";
    if (selectedRole == "user") {
      endPoint = "/user/auth/google-signup";
    } else if (selectedRole == "host") {
      endPoint = "/host/auth/google-signup";
    }

    try {
      const response = await api.post(endPoint, {
        token,
      });

      if (response.data.success) {
        console.log("signup success", response.data);
        onSignupSuccess(response.data);

        if (response.data.user && response.data.user.role === "user") {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("role", "user");
          dispatch(
            setCredentials({
              name: response.data.user.name,
              email: response.data.user.email,
              mobile: response.data.user.mobile,
              profile_img: response.data.user.profile_image,
              role: response.data.user.role,
            })
          );

          navigate("/userHomepage");
        } else if (response.data.host && response.data.host.role === "host") {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("role", "host");
          dispatch(
            setCredentials({
              name: response.data.host.name,
              email: response.data.host.email,
              mobile: response.data.host.mobile,
              profile_img: response.data.host.profile_image,
              role: response.data.host.role,
            })
          );


          navigate("/hostHomepage");
        }
      } else {
        console.log("Signup error", response.data.message);
      }
    } catch (error) {
      console.log("signup error", error);
    }
    setSelectedRole(null);
    setTriggerLogin(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Signup with Google</button>
      {showRoleModal && (
        <div>
          <h3>Choose your role</h3>
          <button onClick={() => handleRoleSelect("user")}>I am User</button>
          <button onClick={() => handleRoleSelect("host")}>I am Host</button>
        </div>
      )}

      {triggerLogin && (
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.log("signup failed");
            setTriggerLogin(false);
          }}
        />
      )}
    </div>
  );
};

export default GoogleAuthSignup;
