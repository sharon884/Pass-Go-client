"use client"
import { useState } from "react"

function EmailInputModal({ onSubmit, onClose, role }) {
  const [email, setEmail] = useState("")
  const [isValid, setIsValid] = useState(true)

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = () => {
    if (!email) {
      setIsValid(false)
      return
    }

    if (!validateEmail(email)) {
      setIsValid(false)
      return
    }

    setIsValid(true)
    onSubmit(email)
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter your Email</h2>
        <p className="text-gray-600 mb-6">
          We will send a verification {role === "user" ? "👤 User" : "🧑‍💼 Host"} email
        </p>

        <div className="mb-6">
          <input
            type="email"
            placeholder="Enter your Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setIsValid(true)
            }}
            className={`w-full p-3 border-2 ${!isValid ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:border-[#4F3DFF]`}
          />
          {!isValid && <p className="mt-1 text-red-500 text-sm">Please enter a valid email address</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleSubmit}
            className="py-3 px-4 bg-[#4F3DFF] text-white rounded-lg font-medium hover:bg-[#4F3DFF]/90 transition-colors"
          >
            Send OTP
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

export default EmailInputModal
