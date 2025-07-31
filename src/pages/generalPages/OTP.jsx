"use client"

import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../../utils/api/api"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../features/auth/authSlice"
import { resendOtp } from "../../services/user/userAuthServices"

const OtpPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { email, userId, role } = location.state || {}
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [resendCooldown, setResendCooldown] = useState(0)
  const [showResendButton, setShowResendButton] = useState(false)
  const [initialTimer, setInitialTimer] = useState(60)

  useEffect(() => {
    if (!email || !userId || !role) {
      navigate("/signup")
    }
  }, [email, userId, role, navigate])

  // Initial timer to show resend button after 60 seconds
  useEffect(() => {
    let timer
    if (initialTimer > 0) {
      timer = setTimeout(() => setInitialTimer(initialTimer - 1), 1000)
    } else {
      setShowResendButton(true)
    }
    return () => clearTimeout(timer)
  }, [initialTimer])

  // Countdown timer for resend button cooldown
  useEffect(() => {
    let timer
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [resendCooldown])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    let endPoint = ""
    if (role === "user") {
      endPoint = "/user/auth/verify-otp"
    } else if (role === "admin") {
      endPoint = "/admin/auth/verify-otp"
    } else {
      toast.error("Invalid role for OTP verification")
      return
    }

    try {
      const response = await api.post(endPoint, {
        email,
        userId,
        otp,
        role,
      })
      console.log("OTP verified successfully!", response.data)
      setError("")
      setSuccess("Email verified successfully! Redirecting...")
      toast.success("Email verified successfully! Redirecting...")
      localStorage.setItem("isAuthenticated", true)
      localStorage.setItem("role", role)

      dispatch(
        setCredentials({
          id: response.data.id,
          name: response.data.name,
          mobile: response.data.mobile,
          role,
          profile_image: response.data.profile_image || "",
        }),
      )

      if (role === "user" || role === "host") {
        navigate("/welcome-page")
      } else if (role === "admin") {
        navigate("/admin-home-page")
      }
    } catch (err) {
      console.error("OTP verification failed", err.response?.data || err.message)
      setSuccess("")
      setError(err.response?.data?.message || "OTP verification failed. Try again!")
      toast.error("OTP verification failed. Try again!")
      return
    }
  }

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return
    try {
      await resendOtp(email)
      setError("")
      setSuccess("OTP resent to your email!")
      toast.success("OTP resent to your email!")
      setResendCooldown(60)
    } catch (err) {
      setSuccess("")
      setError(err.message)
      toast.error(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Left side - Illustration */}
        <div className="w-full md:w-5/12 bg-indigo-600 p-8 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-32 h-32 mx-auto text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <h2 className="mt-6 text-3xl font-bold text-white">PassGo</h2>
            <p className="mt-2 text-white text-opacity-80">
              Your gateway to amazing events and unforgettable experiences
            </p>
          </div>
        </div>
        {/* Right side - Form */}
        <div className="w-full md:w-7/12 p-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Verify Your Email</h2>
            <p className="text-center text-gray-600 mb-8">
              We've sent an OTP to your email: <span className="font-medium">{email}</span>
            </p>
            {/* Error and Success Messages */}
            {error && (
              <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-lg flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {success}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="otp">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center text-lg tracking-widest"
                  placeholder="Enter OTP"
                  maxLength="6"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Verify OTP
                </button>
                {showResendButton && (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendCooldown > 0}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                  </button>
                )}
              </div>
            </form>
            {!showResendButton && (
              <p className="mt-4 text-center text-sm text-gray-500">Resend OTP will be available in {initialTimer}s</p>
            )}
            <p className="mt-6 text-center text-sm text-gray-600">
              Didn't receive the email?{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Check your spam folder
              </a>
            </p>
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 mt-8">
              <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtpPage
