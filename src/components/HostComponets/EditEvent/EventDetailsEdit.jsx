"use client"
import { useFormContext } from "react-hook-form"
import { toast } from "sonner"
import uploadImageToCloudinary from "../../../utils/uploadCloudinary/uploadCloudinary"
import { Calendar, Clock, ImageIcon, Info, MapPin, Tag, Type, Navigation } from "lucide-react"

const categories = ["Music", "Art", "Fashion", "Motosports"]

function EventDetailsEdit() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()

  const images = watch("images") || []
  const coordinates = watch("coordinates") || { lat: 0, lng: 0 }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    toast.info("Uploading images...", { duration: Number.POSITIVE_INFINITY, id: "uploading" })
    const uploadedUrls = []

    for (const file of files) {
      const url = await uploadImageToCloudinary(file)
      if (url) uploadedUrls.push(url)
    }

    toast.dismiss("uploading")
    const updatedImages = [...images, ...uploadedUrls]

    if (updatedImages.length < 3) {
      toast.error("You must upload at least 3 images in total.")
      return
    }

    setValue("images", updatedImages, { shouldValidate: true })
    toast.success(`${uploadedUrls.length} image(s) added!`)
  }

  const removeImage = (index) => {
    const updated = [...images]
    updated.splice(index, 1)
    setValue("images", updated, { shouldValidate: true })
    toast.info("Image removed.")
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      toast.info("Getting your location...")
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setValue("coordinates", { lat: latitude, lng: longitude }, { shouldValidate: true })
          toast.success("Location updated!")
        },
        (error) => {
          toast.error("Unable to get location. Please enter coordinates manually.")
        },
      )
    } else {
      toast.error("Geolocation is not supported by this browser.")
    }
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="space-y-3">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <Type className="w-5 h-5 mr-2 text-purple-600" />
          Event Title
        </label>
        <input
          type="text"
          {...register("title")}
          placeholder="Enter an engaging event title"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-900 placeholder-gray-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <span className="w-4 h-4 mr-1">⚠️</span>
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-3">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <Info className="w-5 h-5 mr-2 text-purple-600" />
          Description
        </label>
        <textarea
          {...register("description")}
          placeholder="Describe your event in detail..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <span className="w-4 h-4 mr-1">⚠️</span>
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-3">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <Tag className="w-5 h-5 mr-2 text-purple-600" />
          Category
        </label>
        <select
          {...register("category")}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-900 bg-white"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <span className="w-4 h-4 mr-1">⚠️</span>
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Images */}
      <div className="space-y-4">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <ImageIcon className="w-5 h-5 mr-2 text-purple-600" />
          Event Images (Minimum 3)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
          <input
            type="file"
            id="edit-image-upload"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            className="hidden"
          />
          <label htmlFor="edit-image-upload" className="cursor-pointer">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-700">Click to upload images</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 100MB each</p>
              </div>
            </div>
          </label>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {images.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url || "/placeholder.svg"}
                  alt={`Event ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.images && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <span className="w-4 h-4 mr-1">⚠️</span>
            {errors.images.message}
          </p>
        )}
      </div>

      {/* Location */}
      <div className="space-y-3">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <MapPin className="w-5 h-5 mr-2 text-purple-600" />
          Event Location
        </label>
        <input
          type="text"
          {...register("location")}
          placeholder="e.g., Madison Square Garden, New York"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-900 placeholder-gray-500"
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <span className="w-4 h-4 mr-1">⚠️</span>
            {errors.location.message}
          </p>
        )}
      </div>

      {/* Coordinates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            <Navigation className="w-5 h-5 mr-2 text-purple-600" />
            Coordinates
          </label>
          <button
            type="button"
            onClick={getCurrentLocation}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
          >
            Use Current Location
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              {...register("coordinates.lat", { valueAsNumber: true })}
              placeholder="40.7589"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              {...register("coordinates.lng", { valueAsNumber: true })}
              placeholder="-73.9851"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-900"
            />
          </div>
        </div>
        {(errors.coordinates?.lat || errors.coordinates?.lng) && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <span className="w-4 h-4 mr-1">⚠️</span>
            Both latitude and longitude are required
          </p>
        )}
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <Calendar className="w-5 h-5 mr-2 text-purple-600" />
            Event Date
          </label>
          <input
            type="date"
            {...register("date")}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-900"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <span className="w-4 h-4 mr-1">⚠️</span>
              {errors.date.message}
            </p>
          )}
        </div>
        <div className="space-y-3">
          <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <Clock className="w-5 h-5 mr-2 text-purple-600" />
            Event Time
          </label>
          <input
            type="time"
            {...register("time")}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-900"
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <span className="w-4 h-4 mr-1">⚠️</span>
              {errors.time.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventDetailsEdit
