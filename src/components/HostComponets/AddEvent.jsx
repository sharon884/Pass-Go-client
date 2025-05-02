import { useState } from "react"
import { z } from "zod"
import eventValidationSchema from "../../utils/hostRelatedValidations/EventAddingValidation"
import api from "../../utils/api/api"
import { CalendarIcon, Clock, MapPin, Tag, Upload, Building, User, Mail, Phone, Plus } from "lucide-react"


const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    images: [],
    location: "",
    date: "",
    time: "",
    tickets: {
      vip: { price: 0, quantity: 0 },
      general: { price: 0, quantity: 0 },
    },
    businessInfo: {
      name: "",
      organization_name: "",
      email: "",
      mobile: "",
    },
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [imagePreviewUrls, setImagePreviewUrls] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target

    // Handle nested objects like businessInfo
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleTicketChange = (type, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      tickets: {
        ...prevData.tickets,
        [type]: {
          ...prevData.tickets[type],
          [field]: Number(value),
        },
      },
    }))
  }

  // Fixed image handling to properly store File objects and APPEND to existing images
  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files)

    // Append new files to existing files instead of replacing them
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...newFiles],
    }))

    // Create preview URLs for the new images and append to existing previews
    const newImageUrls = newFiles.map((file) => URL.createObjectURL(file))
    setImagePreviewUrls((prevUrls) => [...prevUrls, ...newImageUrls])
  }

  // Modified to handle date validation properly and use objectToFormData utility
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setErrors({})

    try {
      // Log the current state of images before validation
      console.log("Images before validation:", formData.images)

      // Create a copy of formData with date converted to Date object for validation
      const formDataForValidation = {
        ...formData,
        // Only convert to Date if it's a non-empty string
        date: formData.date ? new Date(formData.date) : "",
      }

      // Validate using Zod schema
      const validatedData = eventValidationSchema.parse(formDataForValidation)
      console.log("Validated data:", validatedData)
      
      // Create a clean submission object
      const submissionData = {
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        location: validatedData.location,
        date: formData.date, // Use string date for API
        time: validatedData.time,
        'tickets.vip.price': validatedData.tickets.vip.price,
        'tickets.vip.quantity': validatedData.tickets.vip.quantity,
        'tickets.general.price': validatedData.tickets.general.price,
        'tickets.general.quantity': validatedData.tickets.general.quantity,
        'businessInfo.name': validatedData.businessInfo.name,
        'businessInfo.organization_name': validatedData.businessInfo.organization_name,
        'businessInfo.email': validatedData.businessInfo.email,
        'businessInfo.mobile': validatedData.businessInfo.mobile,
      }

      // Convert to FormData with proper handling of nested fields
      const eventData = new FormData()
      
      // Add basic fields
      Object.keys(submissionData).forEach(key => {
        eventData.append(key, submissionData[key])
      })
      
      // Add images separately
      if (validatedData.images && validatedData.images.length > 0) {
        console.log(`Appending ${validatedData.images.length} images to form data`)
        validatedData.images.forEach((image) => {
          eventData.append("images", image)
        })
      }

      console.log("Submitting form data")
      // Log all form data entries for debugging
      for (let [key, value] of eventData.entries()) {
        console.log(key, value)
      }

      const response = await api.post("/host/event/eventadd", eventData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Event created successfully", response.data)
      // Success message or redirect
      alert("Event created successfully!")
    } catch (err) {
      console.error("Error details:", err)

      if (err instanceof z.ZodError) {
        // Improved error handling to show nested errors
        const newErrors = {}
        err.errors.forEach((error) => {
          console.log("Validation error:", error.path, error.message)
          // Handle nested paths like businessInfo.email
          if (error.path.length > 1) {
            const key = error.path.join(".")
            newErrors[key] = error.message
          } else {
            newErrors[error.path[0]] = error.message
          }
        })
        setErrors(newErrors)
        console.log("Validation errors:", newErrors)
      } else {
        console.log("Error creating event:", err)
        setSubmitError("Failed to create event. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Create New Event</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Fill in the details below to create your event
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Event Basic Details */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Event Details</h2>

                  {/* Event Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Enter event title"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                  </div>

                  {/* Event Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Describe your event"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                  </div>

                  {/* Event Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none`}
                      >
                        <option value="">Select a category</option>
                        <option value="Music">Music</option>
                        <option value="Art">Art</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Motosports">Motosports</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <Tag className="h-4 w-4" />
                      </div>
                    </div>
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                  </div>

                  {/* Event Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border ${errors.location ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Event location"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                  </div>

                  {/* Event Date and Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Event Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split("T")[0]} // Set min to today
                          className={`w-full pl-10 pr-4 py-2 border ${errors.date ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        Event Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2 border ${errors.time ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                    </div>
                  </div>

                  {/* Event Images */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Images (min 3 images)</label>
                      <span
                        className={`text-sm font-medium ${formData.images.length >= 3 ? "text-green-600" : "text-amber-600"}`}
                      >
                        {formData.images.length} of 3 required
                      </span>
                    </div>

                    {/* Image upload area */}
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="images"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload files</span>
                            <input
                              id="images"
                              name="images"
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                      </div>
                    </div>

                    {errors.images && <p className="mt-1 text-sm text-red-600 font-medium">{errors.images}</p>}

                    {/* Image Previews */}
                    {imagePreviewUrls.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Images</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {imagePreviewUrls.map((url, index) => (
                            <div
                              key={index}
                              className="relative h-24 rounded-lg overflow-hidden border border-gray-200"
                            >
                              <img
                                src={url || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  // Remove image at this index
                                  const newUrls = [...imagePreviewUrls]
                                  newUrls.splice(index, 1)
                                  setImagePreviewUrls(newUrls)

                                  const newImages = [...formData.images]
                                  newImages.splice(index, 1)
                                  setFormData((prev) => ({
                                    ...prev,
                                    images: newImages,
                                  }))
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                                aria-label="Remove image"
                              >
                                ×
                              </button>
                            </div>
                          ))}

                          {/* Add more images button */}
                          <label
                            htmlFor="add-more-images"
                            className="relative h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                          >
                            <Plus className="h-8 w-8 text-gray-400" />
                            <span className="mt-1 text-xs text-gray-500">Add more</span>
                            <input
                              id="add-more-images"
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageChange}
                              className="sr-only"
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ticket Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Ticket Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-700">VIP Tickets</h4>

                        <div>
                          <label htmlFor="vip-price" className="block text-sm font-medium text-gray-700">
                            Price
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              id="vip-price"
                              value={formData.tickets.vip.price}
                              onChange={(e) => handleTicketChange("vip", "price", e.target.value)}
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="vip-quantity" className="block text-sm font-medium text-gray-700">
                            Quantity
                          </label>
                          <input
                            type="number"
                            id="vip-quantity"
                            value={formData.tickets.vip.quantity}
                            onChange={(e) => handleTicketChange("vip", "quantity", e.target.value)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-700">General Tickets</h4>

                        <div>
                          <label htmlFor="general-price" className="block text-sm font-medium text-gray-700">
                            Price
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              id="general-price"
                              value={formData.tickets.general.price}
                              onChange={(e) => handleTicketChange("general", "price", e.target.value)}
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0.00"
                              min="0"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="general-quantity" className="block text-sm font-medium text-gray-700">
                            Quantity
                          </label>
                          <input
                            type="number"
                            id="general-quantity"
                            value={formData.tickets.general.quantity}
                            onChange={(e) => handleTicketChange("general", "quantity", e.target.value)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Business Information</h2>

                  {/* Business Name */}
                  <div>
                    <label htmlFor="businessInfo.name" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="businessInfo.name"
                        name="businessInfo.name"
                        value={formData.businessInfo.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border ${errors["businessInfo.name"] ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Your business name"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    {errors["businessInfo.name"] && (
                      <p className="mt-1 text-sm text-red-600">{errors["businessInfo.name"]}</p>
                    )}
                  </div>

                  {/* Organization Name */}
                  <div>
                    <label
                      htmlFor="businessInfo.organization_name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Organization Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="businessInfo.organization_name"
                        name="businessInfo.organization_name"
                        value={formData.businessInfo.organization_name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border ${errors["businessInfo.organization_name"] ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Your organization name"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    {errors["businessInfo.organization_name"] && (
                      <p className="mt-1 text-sm text-red-600">{errors["businessInfo.organization_name"]}</p>
                    )}
                  </div>

                  {/* Business Email */}
                  <div>
                    <label htmlFor="businessInfo.email" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="businessInfo.email"
                        name="businessInfo.email"
                        value={formData.businessInfo.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border ${errors["businessInfo.email"] ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="your@email.com"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    {errors["businessInfo.email"] && (
                      <p className="mt-1 text-sm text-red-600">{errors["businessInfo.email"]}</p>
                    )}
                  </div>

                  {/* Business Mobile */}
                  <div>
                    <label htmlFor="businessInfo.mobile" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Mobile
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="businessInfo.mobile"
                        name="businessInfo.mobile"
                        value={formData.businessInfo.mobile}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border ${errors["businessInfo.mobile"] ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="10-digit mobile number"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    {errors["businessInfo.mobile"] && (
                      <p className="mt-1 text-sm text-red-600">{errors["businessInfo.mobile"]}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">{submitError}</div>}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating Event...
                      </>
                    ) : (
                      "Create Event"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-lg rounded-2xl p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2">Event Preview</h2>

              <div className="space-y-6">
                {/* Preview Images */}
                {imagePreviewUrls.length > 0 ? (
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <img
                      src={imagePreviewUrls[0] || "/placeholder.svg"}
                      alt="Event preview"
                      className="w-full h-full object-cover"
                    />
                    {imagePreviewUrls.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                        +{imagePreviewUrls.length - 1} more
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400 text-sm">No images uploaded</p>
                  </div>
                )}

                {/* Event Title */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{formData.title || "Event Title"}</h3>
                </div>

                {/* Event Details */}
                <div className="space-y-3">
                  {formData.category && (
                    <div className="flex items-center text-sm">
                      <Tag className="h-4 w-4 mr-2 text-indigo-600" />
                      <span>{formData.category}</span>
                    </div>
                  )}

                  {formData.location && (
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                      <span>{formData.location}</span>
                    </div>
                  )}

                  {formData.date && (
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="h-4 w-4 mr-2 text-indigo-600" />
                      <span>{formatDate(formData.date)}</span>
                      {formData.time && <span className="ml-1">at {formData.time}</span>}
                    </div>
                  )}
                </div>

                {/* Event Description */}
                {formData.description && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                    <p className="text-sm text-gray-600 line-clamp-4">{formData.description}</p>
                  </div>
                )}

                {/* Ticket Information */}
                {(formData.tickets.vip.price > 0 || formData.tickets.general.price > 0) && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tickets</h4>
                    <div className="space-y-2">
                      {formData.tickets.vip.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>VIP</span>
                          <span className="font-medium">${formData.tickets.vip.price}</span>
                        </div>
                      )}
                      {formData.tickets.general.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>General</span>
                          <span className="font-medium">${formData.tickets.general.price}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Business Information */}
                {formData.businessInfo.name && (
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Hosted by</h4>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{formData.businessInfo.name}</p>
                      {formData.businessInfo.organization_name && <p>{formData.businessInfo.organization_name}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEvent
