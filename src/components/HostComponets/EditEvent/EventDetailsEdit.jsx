// import React from "react";
// import { useFormContext } from "react-hook-form";
// import { toast } from "sonner";
// import uploadImageToCloudinary from "../../../utils/uploadCloudinary/uploadCloudinary";
// import {
//   Calendar,
//   Clock,
//   ImageIcon,
//   Info,
//   MapPin,
//   Tag,
//   Type,
// } from "lucide-react";

// const categories = ["Music", "Art", "Fashion", "Motosports"];

// function EventDetailsEdit() {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useFormContext();

//   const images = watch("images") || [];

//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     toast.info("Uploading images...", { duration: Infinity, id: "uploading" });

//     const uploadedUrls = [];
//     for (const file of files) {
//       const url = await uploadImageToCloudinary(file);
//       if (url) uploadedUrls.push(url);
//     }

//     toast.dismiss("uploading");

//     const updatedImages = [...images, ...uploadedUrls];
//     if (updatedImages.length < 3) {
//       toast.error("you must upload at least 3 images in total.");
//       return;
//     }

//     setValue("images", updatedImages, { shouldValidate: true });
//     toast.success(`${uploadedUrls.length} images(s) added!`);
//   };

//   const removeImage = (index) => {
//     const updated = [...images];
//     updated.splice(index, 1);
//     setValue("images", updated, { shouldValidate: true });
//     toast.info("image removed.");
//   };

//   return (
//     <div>
//       <div>
//         <label>
//           <Type />
//           Title
//         </label>
//         <input
//           type="text"
//           {...register("title")}
//           placeholder="Enter event title"
//         />
//         {errors.title && <p>{errors.title.message}</p>}
//       </div>
//       <div>
//         <label>
//           <Info>Description</Info>
//         </label>
//         <textarea
//           {...register("description")}
//           placeholder="Describe Your event"
//         ></textarea>
//         {errors.description && <p>{errors.description.message}</p>}
//       </div>
//       <div>
//         <label>
//           <Tag />
//           Category
//         </label>
//         <select {...register("category")}>
//           <option value="">Select category</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//         {errors.category && <p>{errors.category.message}</p>}
//       </div>
//       <div>
//         <label>
//           {" "}
//           <ImageIcon />
//           Images(Min 3)
//         </label>
//         <div>
//           <input
//             type="file"
//             id="edit-image-upload"
//             onChange={handleImageUpload}
//             multiple
//             accept="image/*"
//           />
//           <label htmlFor="edit-image-upload">
//             <div>
//               <ImageIcon />
//               <p>Click to upload</p>
//               <p>PNG,JPG up to 100MB</p>
//             </div>
//           </label>
//         </div>
//         {images.length > 0 && (
//           <div>
//             {images.map((url, index) => (
//               <div key={index}>
//                 <img src={url} alt="Event" />
//                 <button type="button" onClick={() => removeImage(index)}>
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//         {errors.images && <p>{errors.images.message}</p>}
//       </div>
//       <div>
//         <label>
//           <MapPin />
//           Location
//         </label>
//         <input
//           type="text"
//           {...register("location")}
//           placeholder="Event location"
//         />
//         {errors.location && <p>{errors.location.message}</p>}
//       </div>
//       <div>
//         <div>
//           <label>
//             {" "}
//             <Calendar />
//             Date
//           </label>
//           <input type="date" {...register("date")} />
//           {errors.date && <p>{errors.date.message}</p>}
//         </div>
//         <div>
//           <label>
//             <Clock />
//             Time
//           </label>
//           <input type="time" {...register("time")} />
//           {errors.time && <p>{errors.time.message}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EventDetailsEdit;
