"use client"

import { useState } from "react"
import { requestedOtp, verifyHostOtp } from "../../../services/host/becomeHostServices"
import { toast } from "sonner"
import { becomeHostSchema } from "../../../utils/validators/becomeHostValidation";
import { Navigate, useNavigate } from "react-router-dom";

const BecomeHostForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    panNumber: "",
    panImage: "",
  })

  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [fieldTouched, setFieldTouched] = useState({})
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (files && files[0]) {
      const file = files[0]

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, panImage: "File size must be less than 10MB" }))
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, panImage: "Please select a valid image file" }))
        return
      }

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }))

      setErrors((prev) => ({ ...prev, panImage: null }))

      // Create image preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))

      // Real-time validation for touched fields
      if (fieldTouched[name]) {
        const error = validateField(name, value)
        setErrors((prev) => ({ ...prev, [name]: error }))
      }
    }
  }

  const handleRequestOtp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.panImage) {
        toast.error("PAN Image is required")
        setLoading(false)
        return
      }

      becomeHostSchema.parse(formData)

      const result = await requestedOtp(formData)

      if (result.success) {
        toast.success(`OTP sent to your mobile number. OTP is: ${result.otp}`)
        setOtpSent(true)
      } else {
        toast.error(result.message || "Failed to send OTP. Please try again!")
      }
    } catch (error) {
      if (error.errors && Array.isArray(error.errors)) {
        toast.error(error.errors[0].message)
      } else {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }

    setVerifyingOtp(true)

    try {
      const result = await verifyHostOtp(formData.mobile, otp)

      if (result.success) {
        toast.success("OTP verified successfully! Your host request is being processed.")
        navigate("/welcome");
      } else {
        toast.error(result.message || "Invalid OTP")
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.")
    } finally {
      setVerifyingOtp(false)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setFormData((prev) => ({ ...prev, panImage: "" }))
    setErrors((prev) => ({ ...prev, panImage: null }))
    // Reset file input
    const fileInput = document.querySelector('input[name="panImage"]')
    if (fileInput) fileInput.value = ""
  }

  const validateField = (name, value) => {
    try {
      if (name === "panImage") {
        // For file validation, we'll handle it separately
        return null
      }

      const fieldSchema = {
        name: becomeHostSchema.shape.name,
        mobile: becomeHostSchema.shape.mobile,
        panNumber: becomeHostSchema.shape.panNumber,
      }

      if (fieldSchema[name]) {
        fieldSchema[name].parse(value)
        return null
      }
    } catch (error) {
      if (error.errors && error.errors[0]) {
        return error.errors[0].message
      }
      return "Invalid input"
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setFieldTouched((prev) => ({ ...prev, [name]: true }))

    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Become a Host
          </h1>
          <p className="text-gray-600 text-lg">
            Join our community of event hosts and start creating amazing experiences
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Progress Indicator */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-1">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className={`flex items-center space-x-2 ${!otpSent ? "text-purple-600" : "text-green-600"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${!otpSent ? "bg-purple-100" : "bg-green-100"}`}
                  >
                    {!otpSent ? (
                      <span className="text-sm font-semibold">1</span>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">Personal Details</span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-4">
                  <div
                    className={`h-full transition-all duration-500 ${otpSent ? "bg-green-500 w-full" : "bg-purple-500 w-0"}`}
                  ></div>
                </div>
                <div className={`flex items-center space-x-2 ${otpSent ? "text-purple-600" : "text-gray-400"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${otpSent ? "bg-purple-100" : "bg-gray-100"}`}
                  >
                    <span className="text-sm font-semibold">2</span>
                  </div>
                  <span className="font-medium">Verification</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {!otpSent ? (
              /* Step 1: Personal Details Form */
              <form onSubmit={handleRequestOtp} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name (as per PAN Card)
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${
                        errors.name ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Mobile Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${
                        errors.mobile ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                      }`}
                    />
                    {errors.mobile ? (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {errors.mobile}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">Connected with your PAN Card</p>
                    )}
                  </div>

                  {/* PAN Number Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number</label>
                    <input
                      type="text"
                      name="panNumber"
                      placeholder="ABCDE1234F"
                      value={formData.panNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white uppercase ${
                        errors.panNumber ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                      }`}
                      style={{ textTransform: "uppercase" }}
                    />
                    {errors.panNumber && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {errors.panNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* PAN Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Card Image</label>

                  {!imagePreview ? (
                    <div
                      className={`border-2 border-dashed rounded-xl p-8 text-center hover:border-purple-400 transition-colors duration-200 ${
                        errors.panImage ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      <input
                        type="file"
                        name="panImage"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="hidden"
                        id="panImage"
                      />
                      <label htmlFor="panImage" className="cursor-pointer">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-600 font-medium">Click to upload PAN Card image</p>
                        <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="PAN Card Preview"
                        className="w-full h-48 object-cover rounded-xl border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {errors.panImage && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {errors.panImage}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
            ) : (
              /* Step 2: OTP Verification */
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Mobile</h3>
                  <p className="text-gray-600">
                    We've sent a 6-digit OTP to <span className="font-semibold text-purple-600">{formData.mobile}</span>
                  </p>
                </div>

                <div className="max-w-xs mx-auto">
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full px-4 py-4 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white tracking-widest"
                    maxLength="6"
                  />
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleVerifyOtp}
                    disabled={verifyingOtp || otp.length !== 6}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {verifyingOtp ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      "Verify OTP & Submit"
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setOtpSent(false)
                      setOtp("")
                    }}
                    className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                  >
                    ← Back to edit details
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  Didn't receive the OTP?{" "}
                  <button
                    onClick={handleRequestOtp}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Secure & Private</h4>
              <p className="text-sm text-blue-700">
                Your personal information is encrypted and secure. We use your PAN details only for verification
                purposes and comply with all data protection regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BecomeHostForm
