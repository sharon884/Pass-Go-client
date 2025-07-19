"use client"

import { getUserProfile, updateUserProfile } from "../../services/user/userProfileServices"
import uploadImageToCloudinary from "../../utils/uploadCloudinary/uploadCloudinary"
import { toast } from "sonner"
import { useState } from "react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const EditUserProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    profile_image: "",
  })

  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [updating, setUpdating] = useState(false);
  const navigate  = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile()
        const user = response.user
        setFormData({
          name: user.name,
          mobile: user.mobile,
          profile_image: user.profile_image,
        });
       
      } catch (error) {
        toast.error("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5 MB")
      return
    }

    setUploading(true)
    toast.info("Uploading image...")

    try {
      const imageUrl = await uploadImageToCloudinary(file)
      if (imageUrl) {
        setFormData((prev) => ({ ...prev, profile_image: imageUrl }))
        toast.success("Image upload successfully!")
      } else {
        toast.error("Image upload failed")
      }
    } catch (error) {
      toast.error("Cloudinary upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)
    try {
      await updateUserProfile(formData)
      toast.success("Profile updated successfully");
       navigate("/user-home-page")
    } catch (error) {
      toast.error(error.message || "Profile updation failed")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 relative mb-6">
          <div className="absolute top-0 right-0 bottom-0 left-0 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Loading your profile...</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <svg className="w-7 h-7 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500">Update your personal information and profile picture.</p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Profile Image Section */}
            <div className="text-center">
              <div className="relative inline-block">
                {formData.profile_image ? (
                  <img
                    src={formData.profile_image || "/placeholder.svg"}
                    alt="profile preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-indigo-100 border-4 border-indigo-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}

                {/* Upload overlay */}
                <div className="absolute bottom-2 right-2">
                  <label
                    htmlFor="profile-image"
                    className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-lg"
                  >
                    {uploading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={uploading}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                <p className="text-xs text-gray-500">Click the camera icon to upload a new image (max 5MB)</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating || uploading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {updating ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Update Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-indigo-800 mb-1">Profile Update Tips</h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Use a clear, professional profile picture</li>
                <li>• Keep your mobile number updated for booking confirmations</li>
                <li>• Profile images should be under 5MB in size</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PassGo Branding */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              ></path>
            </svg>
            <span className="text-lg font-bold text-gray-900">PassGo</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Your gateway to amazing events</p>
        </div>
      </div>
    </div>
  )
}

export default EditUserProfile
