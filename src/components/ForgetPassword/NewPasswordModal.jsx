"use client"

import { useState } from "react"
import api from "../../utils/api/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { validatePassword } from "../../utils/validators/passwordValidation"

function NewPasswordModal({ id, role, onClose }) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError("")

    // Use imported validatePassword
    const validationMessage = validatePassword(password)
    if (validationMessage) {
      setError(validationMessage)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)
    try {
      let endPoint = ""
      if (role === "user") {
        endPoint = "/user/auth/reset-password"
      } else if (role === "host") {
        endPoint = "/host/auth/reset-password"
      }

      const response = await api.post(endPoint, { id, password })
      if (response.data.success) {
        toast.success(response.data.message || "Password reset successful. Log in now!")
        navigate("/login")
        onClose()
      } else {
        setError("Something went wrong")
      }
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPasswordValidationStatus = () => {
    if (!passwordTouched || !password) return {}

    return {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      required: password.trim().length > 0,
    }
  }

  const validationStatus = getPasswordValidationStatus()
  const currentValidationError = passwordTouched ? validatePassword(password) : ""

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Reset Password</h2>

        <div className="space-y-4 mb-6">
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
                if (!passwordTouched) setPasswordTouched(true)
              }}
              className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${
                currentValidationError && passwordTouched
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-[#4F3DFF]"
              }`}
            />

            {/* Password Requirements */}
            {passwordTouched && password && (
              <div className="mt-2 space-y-1">
                <div
                  className={`flex items-center text-xs ${validationStatus.required ? "text-green-600" : "text-red-500"}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${validationStatus.required ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  Password is required
                </div>
                <div
                  className={`flex items-center text-xs ${validationStatus.length ? "text-green-600" : "text-red-500"}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${validationStatus.length ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  At least 6 characters
                </div>
                <div
                  className={`flex items-center text-xs ${validationStatus.uppercase ? "text-green-600" : "text-red-500"}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${validationStatus.uppercase ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  At least one uppercase letter
                </div>
              </div>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                setError("")
              }}
              className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${
                confirmPassword && password !== confirmPassword
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-[#4F3DFF]"
              }`}
            />

            {/* Password Match Indicator */}
            {confirmPassword && (
              <div
                className={`mt-2 flex items-center text-xs ${
                  password === confirmPassword ? "text-green-600" : "text-red-500"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    password === confirmPassword ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="py-3 px-4 bg-[#4F3DFF] text-white rounded-lg font-medium hover:bg-[#4F3DFF]/90 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-70"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewPasswordModal
