"use client"
import { useState, useEffect } from "react"
import api from "../../utils/api/api"

function OtpVerificationModal({ email, id, role, onClose, onVerified }) {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [timer, setTimer] = useState(60)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    let interval = null
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timer])

  const handleSubmit = async () => {
    if (!otp || otp.length < 4) {
      setError("Please enter a valid OTP")
      return
    }

    let endPoint = ""
    if (role === "user") {
      endPoint = "/user/auth/reset-password/otp"
    } else if (role === "host") {
      endPoint = "/host/auth/reset-password/otp"
    }

    try {
      const response = await api.post(endPoint, { otp, id })
      if (response.data.success) {
        onVerified()
      } else {
        setError("Invalid OTP")
      }
    } catch (error) {
      setError("Verification failed. Please try again.")
    }
  }

  const handleResendOtp = async () => {
    if (timer > 0) return

    setIsResending(true)
    try {
      let endPoint = ""
      if (role === "user") {
        endPoint = "/user/auth/reset-password"
      } else if (role === "host") {
        endPoint = "/host/auth/reset-password"
      }

      await api.post(endPoint, { email })
      setTimer(60)
      setError("")
    } catch (error) {
      setError("Failed to resend OTP. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter OTP</h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification code to <span className="font-medium">{email}</span>
        </p>

        <div className="mb-6">
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
              setError("")
            }}
            placeholder="Enter OTP"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#4F3DFF] text-center text-lg tracking-widest"
            maxLength={6}
          />
          {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={handleResendOtp}
            disabled={timer > 0 || isResending}
            className={`text-sm ${timer > 0 || isResending ? "text-gray-400" : "text-[#4F3DFF] hover:underline"}`}
          >
            {isResending ? "Resending..." : timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleSubmit}
            className="py-3 px-4 bg-[#4F3DFF] text-white rounded-lg font-medium hover:bg-[#4F3DFF]/90 transition-colors"
          >
            Verify OTP
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default OtpVerificationModal
