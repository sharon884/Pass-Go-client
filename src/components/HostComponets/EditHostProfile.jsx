import React from "react";
import { getHostProfile, updateHostProfile } from "../../services/host/hostProfile.Services.js";
import { toast } from "sonner";
import { useState } from "react";
import { useEffect } from "react";

import uploadImageToCloudinary from "../../utils/uploadCloudinary/uploadCloudinary";

const EditHostProfile = () => {
    const [ formData, setFormData ] = useState({
        name : "",
        mobile : "",
        profile_image : "",
    });
    const [ loading , setLoading ] = useState(true);

    useEffect(()=> {
        const fetchHostProfile = async () => {
            try {
                const response = await getHostProfile();
                const host = response.host;
                setFormData({
                    name : host.name,
                    mobile : host.mobile,
                    profile_image : host.profile_image,
                });
 
            } catch ( error ) {
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        }
        fetchHostProfile();
    },[]);

    const handleChange = (e) => {
        const { name , value } = e.target;
        setFormData(prev => ({ ...prev, [name] : value}));
    };

    const handleImageChange = async ( e) => {
       const file = e.target.files[0];
       if ( !file ) return ;
    
      if ( file.size > 5* 1024 * 1024 ) {
        toast.error("Image must be less than 5 MB");
        return ;
      }
      toast.info("Uploading image...");

      try {
        const imageUrl = await uploadImageToCloudinary(file);
        if ( imageUrl ) {
            setFormData(prev => ({...prev, profile_image : imageUrl}));
            toast.success("Image upload successfully!");
        } else {
            toast.error("Image upload failed");
        }
      } catch ( error ) {
        toast.error("Cloudinary upload failed");
      }
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        try {
            await updateHostProfile(formData);
            toast.success("Profile updated successfully");
        } catch ( error ) {
            toast.error( error.message || "Profile updation failed");
        }

    }
    if ( loading ) return <div>Loading...</div>
    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Name </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Mobile</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                </div>
                <div>
                    <label>Profile Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange}  />
                    { formData.profile_image && (
                        <img src={formData.profile_image} alt="profile preview" />
                    )}
                </div>
                <button type="submit">
                    Update Profile
                </button>
            </form>
        </div>
    )
};

export default EditHostProfile;
