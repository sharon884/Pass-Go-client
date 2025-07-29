"use client"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import EmailInputModal from "../../components/ForgetPassword/EmailInputModal"
import api from "../../utils/api/api"
import OtpVerificationModal from "../../components/ForgetPassword/OtpVerificationModal"
import NewPasswordModal from "../../components/ForgetPassword/NewPasswordModal"
import Footer from "../../components/generalComponents/Footer"

function ForgetPassword() {
  const [selectedRole] = useState("user") // default role set
  const [showEmailModal, setShowEmailModal] = useState(true)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [email, setEmail] = useState("")
  const [showResetModal, setShowResetModal] = useState(false)
  const [id, setId] = useState("")

  const handleEmailSubmit = async (email) => {
    setEmail(email)
    setShowEmailModal(false)

    try {
      let endPoint = ""
      if (selectedRole === "user") {
        endPoint = "/user/auth/forgot-password"
      } else if (selectedRole === "host") {
        endPoint = "/host/auth/forgot-password"
      }

      const response = await api.post(endPoint, { email })

      toast.success(response.data.message || "OTP sent successfully!")
      setShowOtpModal(true)
      setId(response.data.id)
    } catch (error) {
      console.log("Failed to send OTP", error)
      toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.")
      setShowEmailModal(true)
    }
  }

  const handleOTPverified = () => {
    setShowOtpModal(false)
    setShowResetModal(true)
    toast.success("OTP verified successfully!")
  }

  const handleClose = () => {
    setShowEmailModal(false)
    setShowOtpModal(false)
    setShowResetModal(false)
  }

  return (
    <div className="min-h-screen">
      {/* Only Email Modal shown initially */}
      {showEmailModal && (
        <EmailInputModal role={selectedRole} onSubmit={handleEmailSubmit} onClose={() => setShowEmailModal(false)} />
      )}

      {showOtpModal && (
        <OtpVerificationModal
          email={email}
          id={id}
          role={selectedRole}
          onClose={() => setShowOtpModal(false)}
          onVerified={handleOTPverified}
        />
      )}

      {showResetModal && (
        <NewPasswordModal
          id={id}
          role={selectedRole}
          onClose={() => {
            setShowResetModal(false)
            // Optionally redirect to login page or show login modal
          }}
        />
      )}
      <Footer />
    </div>
  )
}

export default ForgetPassword
