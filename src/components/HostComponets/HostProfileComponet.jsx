"use client"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useState } from "react"
import { useEffect } from "react"
import { useTheme } from "../../contexts/ThemeContext"
import VerifyRequestButton from "./Profile/VerifyRequestButton.jsx"
import { getUserProfile } from "../../services/user/userProfileServices.js"

const HostProfile = () => {
  const [host, setHost] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { currentTheme, theme } = useTheme()

  // Theme-based styling
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        containerBg: "bg-gray-50",
        cardBg: "bg-white",
        cardBorder: "border-gray-200",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-700",
        textMuted: "text-gray-500",
        inputBg: "bg-gray-50",
        inputBorder: "border-gray-300",
        buttonPrimary: "bg-purple-600 hover:bg-purple-700",
        buttonSecondary: "bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-purple-300 text-gray-700",
        iconColor: "text-purple-600",
        verifiedBg: "bg-green-100 text-green-800",
        pendingBg: "bg-yellow-100 text-yellow-800",
        roleBadgeBg: "bg-purple-100 text-purple-800",
        featureCardBg: "bg-purple-50 border-purple-200",
        featureCardHover: "hover:bg-purple-100",
        featureTextPrimary: "text-purple-900",
        featureTextSecondary: "text-purple-700",
        shadowColor: "shadow-sm",
        loadingSpinner: "border-purple-600",
        loadingBg: "border-purple-200",
        gradientText: "bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent",
      }
    } else {
      return {
        containerBg: theme?.colors?.primaryBg || "bg-gray-900",
        cardBg: theme?.colors?.cardBg || "bg-gray-800",
        cardBorder: "border-gray-600",
        textPrimary: "text-white",
        textSecondary: "text-gray-200",
        textMuted: "text-gray-400",
        inputBg: theme?.colors?.inputBg || "bg-gray-700",
        inputBorder: "border-gray-500",
        buttonPrimary: theme?.colors?.primaryAccent ? "hover:opacity-90" : "bg-blue-600 hover:bg-blue-700",
        buttonSecondary: "bg-gray-700 border-2 border-gray-600 hover:bg-gray-600 text-gray-200",
        iconColor: theme?.colors?.primaryAccent ? "text-blue-400" : "text-blue-400",
        verifiedBg: "bg-green-900/50 text-green-300",
        pendingBg: "bg-yellow-900/50 text-yellow-300",
        roleBadgeBg: theme?.colors?.primaryAccent ? "bg-blue-900/50 text-blue-300" : "bg-blue-900/50 text-blue-300",
        featureCardBg: theme?.colors?.primaryAccent
          ? "bg-blue-900/30 border-blue-700"
          : "bg-blue-900/30 border-blue-700",
        featureCardHover: theme?.colors?.primaryAccent ? "hover:bg-blue-900/50" : "hover:bg-blue-900/50",
        featureTextPrimary: theme?.colors?.primaryAccent ? "text-blue-300" : "text-blue-300",
        featureTextSecondary: theme?.colors?.primaryAccent ? "text-blue-400" : "text-blue-400",
        shadowColor: "shadow-lg",
        loadingSpinner: theme?.colors?.primaryAccent || "border-blue-600",
        loadingBg: theme?.colors?.primaryAccent ? "border-blue-800" : "border-blue-800",
        gradientText: theme?.colors?.primaryAccent ? "text-blue-400" : "text-blue-400",
      }
    }
  }

  const styles = getThemeStyles()

  useEffect(() => {
    const fetchHostProfile = async () => {
      try {
        const hostProfileData = await getUserProfile()
        setHost(hostProfileData.user)
        toast.success("Profile loaded successfully")
        // if (hostProfileData?.host?.id) {
        //   socket.emit("verifying-host", hostProfileData.host.id)
        //   socket.on("host-verification-status", (data) => {
        //     toast.info(data.message || "verification status changed!")
        //     setHost((Prev) => ({ ...Prev, isVerified: data.verified }))
        //   })
        // }
      } catch (error) {
        toast.error(error.message || "Failed to load profile")
      } finally {
        setLoading(false)
      }
    }
    fetchHostProfile()
    // return () => {
    //   socket.off("host-verification-status")
    // }
  }, [])

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{
          background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
        }}
      >
        <div className="w-16 h-16 relative mb-6">
          <div
            className={`absolute top-0 right-0 bottom-0 left-0 border-4 ${styles.loadingBg} border-t-4 rounded-full animate-spin`}
            style={{
              borderTopColor: currentTheme === "classic" ? "#7c3aed" : theme?.colors?.primaryAccent || "#3b82f6",
            }}
          ></div>
        </div>
        <h2 className={`text-xl font-semibold ${styles.textSecondary}`}>Loading your profile...</h2>
      </div>
    )
  }

  if (!host) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{
          background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
        }}
      >
        <div
          className={`${styles.cardBg} rounded-xl ${styles.shadowColor} p-6 sm:p-8 max-w-md w-full text-center border ${styles.cardBorder}`}
          style={{
            background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#374151",
          }}
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className={`text-lg font-medium ${styles.textPrimary} mb-2`}>No Host Data Found</h3>
          <p className={`${styles.textMuted} mb-6`}>We couldn't load your profile information. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className={`w-full text-white py-3 px-6 rounded-lg font-medium transition-colors`}
            style={{
              background:
                currentTheme === "classic"
                  ? "#7c3aed"
                  : theme?.colors?.primaryAccent || "linear-gradient(to right, #3b82f6, #1d4ed8)",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8"
      style={{
        background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className={`text-2xl sm:text-3xl font-bold ${styles.textPrimary} flex items-center`}>
            <svg
              className={`w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4 ${styles.iconColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Host Profile
          </h2>
          <p className={`mt-1 text-base sm:text-lg ${styles.textMuted}`}>
            Manage your host account and event hosting preferences.
          </p>
        </div>

        {/* Main Profile Section */}
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-6 mb-6">
          {/* Profile Image and Basic Info */}
          <div className="xl:col-span-2">
            <div
              className={`${styles.cardBg} rounded-2xl ${styles.shadowColor} border ${styles.cardBorder} p-4 sm:p-6 text-center h-fit`}
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#374151",
              }}
            >
              <div className="mb-4 sm:mb-6">
                <div className="relative inline-block">
                  <img
                    src={host.profile_image || "/default.jpeg"}
                    alt={host.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 shadow-lg mx-auto"
                    style={{
                      borderColor: currentTheme === "classic" ? "#e0e7ff" : theme?.colors?.primaryAccent || "#3b82f6",
                    }}
                  />
                  <div
                    className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: currentTheme === "classic" ? "#7c3aed" : theme?.colors?.primaryAccent || "#3b82f6",
                    }}
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold ${styles.textPrimary} mb-2`}>{host.name}</h3>
              <p className={`${styles.textSecondary} mb-4 text-sm sm:text-base break-all`}>{host.email}</p>

              {/* Verification Status */}
              <div className="mb-4">
                {host.isVerified ? (
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${styles.verifiedBg}`}
                    style={{
                      background: currentTheme === "classic" ? undefined : "linear-gradient(45deg, #10b981, #059669)",
                      color: currentTheme === "classic" ? undefined : "#ffffff",
                    }}
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified Host
                  </div>
                ) : (
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${styles.pendingBg}`}
                    style={{
                      background: currentTheme === "classic" ? undefined : "linear-gradient(45deg, #f59e0b, #d97706)",
                      color: currentTheme === "classic" ? undefined : "#ffffff",
                    }}
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Pending Verification
                  </div>
                )}
              </div>

              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${styles.roleBadgeBg}`}
                style={{
                  background:
                    currentTheme === "classic"
                      ? undefined
                      : theme?.colors?.primaryAccent
                        ? `${theme.colors.primaryAccent}20`
                        : "#1e3a8a20",
                  color: currentTheme === "classic" ? undefined : theme?.colors?.primaryAccent || "#60a5fa",
                }}
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {host.role.charAt(0).toUpperCase() + host.role.slice(1)}
              </div>
            </div>
          </div>

          {/* Host Information Section */}
          <div className="xl:col-span-4">
            <div
              className={`${styles.cardBg} rounded-2xl ${styles.shadowColor} border ${styles.cardBorder} p-4 sm:p-6`}
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#374151",
              }}
            >
              <h3 className={`text-lg sm:text-xl font-bold ${styles.textPrimary} mb-4 sm:mb-6 flex items-center`}>
                <svg
                  className={`w-5 h-5 mr-3 ${styles.iconColor}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Host Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className={`block text-sm font-semibold ${styles.textMuted} mb-2`}>Full Name</label>
                  <p
                    className={`${styles.textPrimary} font-medium px-4 py-3 rounded-xl border ${styles.cardBorder}`}
                    style={{
                      background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.inputBg || "#4b5563",
                    }}
                  >
                    {host.name}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-semibold ${styles.textMuted} mb-2`}>Email Address</label>
                  <p
                    className={`${styles.textPrimary} font-medium px-4 py-3 rounded-xl border ${styles.cardBorder} flex items-center break-all text-sm`}
                    style={{
                      background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.inputBg || "#4b5563",
                    }}
                  >
                    <svg
                      className={`w-4 h-4 mr-2 ${styles.textMuted} flex-shrink-0`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {host.email}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-semibold ${styles.textMuted} mb-2`}>Mobile Number</label>
                  <p
                    className={`${styles.textPrimary} font-medium px-4 py-3 rounded-xl border ${styles.cardBorder} flex items-center`}
                    style={{
                      background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.inputBg || "#4b5563",
                    }}
                  >
                    <svg
                      className={`w-4 h-4 mr-2 ${styles.textMuted} flex-shrink-0`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {host.mobile || host.email}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-semibold ${styles.textMuted} mb-2`}>Account Type</label>
                  <p
                    className={`${styles.textPrimary} font-medium px-4 py-3 rounded-xl border ${styles.cardBorder} flex items-center`}
                    style={{
                      background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.inputBg || "#4b5563",
                    }}
                  >
                    <svg
                      className={`w-4 h-4 mr-2 ${styles.textMuted} flex-shrink-0`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    {host.role.charAt(0).toUpperCase() + host.role.slice(1)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`pt-4 border-t ${styles.cardBorder}`}>
                <h4 className={`text-lg font-semibold ${styles.textPrimary} mb-4`}>Account Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => navigate("/host/edit-profile")}
                    className={`text-white py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center shadow-sm hover:shadow-md`}
                    style={{
                      background:
                        currentTheme === "classic"
                          ? "#7c3aed"
                          : theme?.colors?.primaryAccent || "linear-gradient(to right, #3b82f6, #1d4ed8)",
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Profile
                  </button>
                  <button
                    onClick={() => navigate("/profile/Change-Password-Host")}
                    className={`${styles.buttonSecondary} py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center shadow-sm hover:shadow-md`}
                    style={{
                      background: currentTheme === "classic" ? undefined : theme?.colors?.cardBg || "#374151",
                      borderColor: currentTheme === "classic" ? undefined : theme?.colors?.primaryAccent || "#4b5563",
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Change Password
                  </button>
                  <div className="flex items-center justify-center">
                    <VerifyRequestButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Host Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div
            className={`${styles.cardBg} rounded-2xl ${styles.shadowColor} border ${styles.cardBorder} p-4 sm:p-6`}
            style={{
              background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#374151",
            }}
          >
            <h3 className={`text-lg sm:text-xl font-bold ${styles.textPrimary} mb-4 flex items-center`}>
              <svg className={`w-5 h-5 mr-3 ${styles.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              Host Privileges
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div
                className={`border-2 rounded-xl p-4 transition-colors ${styles.featureCardBg} ${styles.featureCardHover}`}
                style={{
                  background:
                    currentTheme === "classic"
                      ? undefined
                      : theme?.colors?.primaryAccent
                        ? `${theme.colors.primaryAccent}20`
                        : "#1e3a8a20",
                  borderColor: currentTheme === "classic" ? undefined : theme?.colors?.primaryAccent || "#3b82f6",
                }}
              >
                <div className="flex items-center">
                  <svg
                    className={`w-6 h-6 ${styles.iconColor} mr-3`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <h4 className={`font-bold ${styles.featureTextPrimary}`}>Create Events</h4>
                    <p className={`${styles.featureTextSecondary} text-sm`}>Host amazing events</p>
                  </div>
                </div>
              </div>
              <div
                className={`border-2 rounded-xl p-4 transition-colors ${styles.featureCardBg} ${styles.featureCardHover}`}
                style={{
                  background:
                    currentTheme === "classic"
                      ? undefined
                      : theme?.colors?.primaryAccent
                        ? `${theme.colors.primaryAccent}20`
                        : "#1e3a8a20",
                  borderColor: currentTheme === "classic" ? undefined : theme?.colors?.primaryAccent || "#3b82f6",
                }}
              >
                <div className="flex items-center">
                  <svg
                    className={`w-6 h-6 ${styles.iconColor} mr-3`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <div>
                    <h4 className={`font-bold ${styles.featureTextPrimary}`}>Analytics</h4>
                    <p className={`${styles.featureTextSecondary} text-sm`}>Track event performance</p>
                  </div>
                </div>
              </div>
              <div
                className={`border-2 rounded-xl p-4 transition-colors ${styles.featureCardBg} ${styles.featureCardHover}`}
                style={{
                  background:
                    currentTheme === "classic"
                      ? undefined
                      : theme?.colors?.primaryAccent
                        ? `${theme.colors.primaryAccent}20`
                        : "#1e3a8a20",
                  borderColor: currentTheme === "classic" ? undefined : theme?.colors?.primaryAccent || "#3b82f6",
                }}
              >
                <div className="flex items-center">
                  <svg
                    className={`w-6 h-6 ${styles.iconColor} mr-3`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <div>
                    <h4 className={`font-bold ${styles.featureTextPrimary}`}>Revenue</h4>
                    <p className={`${styles.featureTextSecondary} text-sm`}>Manage earnings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PassGo Branding */}
          <div
            className={`${styles.cardBg} rounded-2xl ${styles.shadowColor} border ${styles.cardBorder} p-4 sm:p-6 flex flex-col justify-center items-center text-center`}
            style={{
              background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#374151",
            }}
          >
            <div className="flex items-center justify-center mb-3">
              <svg
                className={`w-6 sm:w-8 h-6 sm:h-8 ${styles.iconColor} mr-3`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                ></path>
              </svg>
              <span
                className={`text-xl sm:text-2xl font-bold ${
                  currentTheme === "classic" ? styles.gradientText : styles.gradientText
                }`}
                style={{
                  background:
                    currentTheme === "classic" ? "linear-gradient(to right, #7c3aed, #3b82f6, #7c3aed)" : undefined,
                  WebkitBackgroundClip: currentTheme === "classic" ? "text" : undefined,
                  WebkitTextFillColor: currentTheme === "classic" ? "transparent" : undefined,
                  color: currentTheme === "classic" ? undefined : theme?.colors?.primaryAccent || "#60a5fa",
                }}
              >
                PassGo
              </span>
            </div>
            <p className={`${styles.textMuted} text-base sm:text-lg`}>Your gateway to amazing events</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostProfile
