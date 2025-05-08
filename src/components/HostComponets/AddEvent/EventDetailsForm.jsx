import React from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "../../../utils/uploadCloudinary/uploadCloudinary"; 

const categories = [ "Music", "Art", "Fashion", "Motosports"];

const EventDetailsForm = () => {
    const {
        register,
        setValue,
        formState : { errors },
    } = useFormContext();

const handleImageUpload = async  (e) => {
    const files = Array.from(e.target.files);
    const uploadedImageUrls = [];

    for ( const file of files ) {
        const url = await uploadImageToCloudinary(file);
        if ( url ) uploadedImageUrls.push(url);
    }

    if (uploadedImageUrls.length <= 2) {
        toast.error("You must upload at least 2 images.");
        return;
    } 
    setValue("images",uploadedImageUrls, {shouldValidate : true });
}

    return (
        <div>
            <div>
                <label> Title </label>
                <input type="text" {...register("title")} />
                {errors.title && (
                    <p>{errors.title.message}</p>
                )}
            </div>
            <div>
                <label >Description</label>
                <textarea {...register("description")}/> 
                {errors.description && (
                    <p>{errors.description.message}</p>
                )}
            </div>
            <div>
                <label>Category</label>
                <select {...register("category")}> 
                    <option value="">select category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat} >
                            {cat}
                        </option>
                    ))}
                     </select>
                     {errors.category && (
                        <p>{errors.category.message}</p>
                     )}
            </div>
            <div>
                <label>Image (Minimum 3)</label>
                <input type="file"onChange={handleImageUpload} multiple accept="image/*" />
                {errors.images && (
                    <p>{errors.images.message}</p>
                )}
            </div>
            <div>
                <label>Location</label>
                <input type="text" {...register("location")} />
                {errors.location && (
                    <p>{errors.location.message}</p>
                )}
            </div>
            <div>
                <label>Date</label>
                <input type="date" {...register('date')} />
                {errors.date && (
                    <p>{errors.date.message}</p>
                )}
            </div>
            <div>
                <label>Time</label>
                <input type="time"{...register("time")} />
                {errors.time && (
                    <p>{errors.time.message}</p>
                )}
            </div>
        </div>
    );
};

export default EventDetailsForm;