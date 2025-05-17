"use client"
import { useFormContext } from "react-hook-form"
import { toast } from "react-toastify"
import uploadImageToCloudinary from "../../../utils/uploadCloudinary/uploadCloudinary"
import { Calendar, Clock, ImageIcon, Info, MapPin, Tag, Type } from "lucide-react"

const categories = ["Music", "Art", "Fashion", "Motosports"]

const EventDetailsForm = () => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext()

  const images = watch("images") || []

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)

    if (files.length === 0) return

    toast.info("Uploading images...", { autoClose: false, toastId: "uploading" })

    const uploadedImageUrls = []

    for (const file of files) {
      const url = await uploadImageToCloudinary(file)
      if (url) uploadedImageUrls.push(url)
    }

    toast.dismiss("uploading")

    if (uploadedImageUrls.length < 3) {
      toast.error("You must upload at least 3 images.")
      return
    }

    setValue("images", uploadedImageUrls, { shouldValidate: true })
    toast.success(`${uploadedImageUrls.length} images uploaded successfully!`)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Type size={18} className="mr-2 text-[#5C3BFE]" /> Title
        </label>
        <input
          type="text"
          {...register("title")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all"
          placeholder="Enter event title"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Info size={18} className="mr-2 text-[#5C3BFE]" /> Description
        </label>
        <textarea
          {...register("description")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all min-h-[120px]"
          placeholder="Describe your event"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Tag size={18} className="mr-2 text-[#5C3BFE]" /> Category
        </label>
        <select
          {...register("category")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all appearance-none bg-white"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <ImageIcon size={18} className="mr-2 text-[#5C3BFE]" /> Images (Minimum 3)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#5C3BFE] transition-colors">
          <input
            type="file"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center py-3">
              <ImageIcon size={40} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload images</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
          </label>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((url, index) => (
              <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                <img src={url || "/placeholder.svg"} alt={`Event ${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <MapPin size={18} className="mr-2 text-[#5C3BFE]" /> Location
        </label>
        <input
          type="text"
          {...register("location")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all"
          placeholder="Event location"
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar size={18} className="mr-2 text-[#5C3BFE]" /> Date
          </label>
          <input
            type="date"
            {...register("date")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Clock size={18} className="mr-2 text-[#5C3BFE]" /> Time
          </label>
          <input
            type="time"
            {...register("time")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C3BFE]/50 focus:border-[#5C3BFE] outline-none transition-all"
          />
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
        </div>
      </div>
    </div>
  )
}

export default EventDetailsForm
