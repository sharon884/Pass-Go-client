//User profile fetching componet
import React from "react";
import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/user/userProfileServices";
import { toast } from "sonner";

const UserProfile = () => {
    const [ user, setUser ] = useState(null);
    const [ loading , setLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(()=> {
        const fetchUserProfile = async () => {
            try {
                const userProfileData = await getUserProfile();
                setUser(userProfileData.user);
                toast.success("Profile loaded successfully");
            } catch ( error ) {
                toast.error(error.message || "Failed to load profile.");
            }finally {
                setLoading(false);
            }
        }

        fetchUserProfile();
    },[]);

    if ( loading ) return <div>Loading...</div>
    if ( !user ) return <div>No user data found</div>

    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <img src={user.profile_image || "../../../public/default.jpeg"} alt={user.name} />
            </div>
            <div>
                <p>Name : {user.name}</p>
                <p>Email : {user.email}</p>
                <p>Mobile : {user.mobile}</p>
                <p>Role : {user.role}</p>
            </div>
            <div>
                <button onClick={()=>navigate("/user/Edit-Profile")}>
                    Edit profile
                </button>
            </div>
            <div>
                <button onClick={()=>navigate("/profile/Change-Password-User")}>
                    Change Password
                </button>
            </div>
        </div>
    )
};

export default UserProfile;