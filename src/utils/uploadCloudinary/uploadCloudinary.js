import axios from "axios";

const uploadImageToCloudinary = async ( file ) => {
    const data = new FormData();
    data.append("file", file );
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            data
        )
        return response.data.secure_url;
    } catch ( error ) {
        console.error("image upload failed:", error );
        return null;
    }
};

export default uploadImageToCloudinary;