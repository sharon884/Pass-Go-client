import api from "./api/api";
import { setCredentials } from "../features/auth/authSlice";


const checkAuthAndLoadUserProfile = async ( dispatch ) => {
    

   const isAuth = localStorage.getItem("isAuthenticated");
   const role = localStorage.getItem("role");
         if ( isAuth && role ) {
            let  endPoint = "";
            if ( role === "user" ) {
                endPoint = "/user/profile/getUserProfile"
            }else if ( role === "host" ) {
                endPoint = "/host/profile/getHostProfile"
            }else if ( role === "admin" ) {
                endPoint = "/admin/profile/getAdminProfile"
            }

            try {                    
                const res = await api.get( endPoint );
                const user = role === "user" ? res.data.user : role === "host" ? res.data.host : res.data.admin;
                console.log("user profile data", user);
               
                dispatch(
                    setCredentials({
                      name: user.name,
                      email: user.email,
                      mobile: user.mobile,
                      role: user.role,
                      profile_img: user.profile_img,
                    })
                  );
                  
            }catch (error) {
                console.error("Auth check failed", error);
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("role");
              }

         }

};

export default checkAuthAndLoadUserProfile;

