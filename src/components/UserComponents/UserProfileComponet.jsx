"use client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserProfile } from "../../services/user/userProfileServices"
// import { useTheme } from "../../contexts/ThemeContext"
import { toast } from "sonner"

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  // const { currentTheme, theme } = useTheme()

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
        buttonPrimary: "bg-indigo-600 hover:bg-indigo-700",
        buttonSecondary: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700",
        iconColor: "text-indigo-600",
        badgeBg: "bg-indigo-100 text-indigo-800",
        shadowColor: "shadow-sm",
        loadingSpinner: "border-indigo-600",
        loadingBg: "border-indigo-200",
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
        buttonSecondary: "bg-gray-700 border border-gray-600 hover:bg-gray-600 text-gray-200",
        iconColor: theme?.colors?.primaryAccent ? "text-blue-400" : "text-blue-400",
        badgeBg: theme?.colors?.primaryAccent ? "bg-blue-900/50 text-blue-300" : "bg-blue-900/50 text-blue-300",
        shadowColor: "shadow-lg",
        loadingSpinner: theme?.colors?.primaryAccent || "border-blue-600",
        loadingBg: theme?.colors?.primaryAccent ? "border-blue-800" : "border-blue-800",
      }
    }
  }

  const styles = getThemeStyles()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileData = await getUserProfile()
        setUser(userProfileData.user)
        toast.success("Profile loaded successfully")
      } catch (error) {
        toast.error(error.message || "Failed to load profile.")
      } finally {
        setLoading(false)
      }
    }
    fetchUserProfile()
  }, [])

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{
          background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.primaryBg || "#111827",
        }}
      >
        <div className="w-16 h-16 relative mb-6">
          <div
            className={`absolute top-0 right-0 bottom-0 left-0 border-4 ${styles.loadingBg} border-t-4 rounded-full animate-spin`}
            style={{
              borderTopColor: currentTheme === "classic" ? "#4f46e5" : theme?.colors?.primaryAccent || "#3b82f6",
            }}
          ></div>
        </div>
        <h2 className={`text-xl font-semibold ${styles.textSecondary}`}>Loading your profile...</h2>
      </div>
    )
  }

  if (!user) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{
          background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.primaryBg || "#111827",
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
          <h3 className={`text-lg font-medium ${styles.textPrimary} mb-2`}>No User Data Found</h3>
          <p className={`${styles.textMuted} mb-6`}>We couldn't load your profile information. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className={`w-full ${styles.buttonPrimary} text-white py-3 px-6 rounded-lg font-medium transition-colors`}
            style={{
              background:
                currentTheme === "classic"
                  ? undefined
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
      className="min-h-screen py-4 sm:py-8 px-4 sm:px-6 lg:px-8"
      style={{
        background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className={`text-2xl sm:text-3xl font-bold ${styles.textPrimary} flex items-center`}>
            <svg
              className={`w-6 sm:w-7 h-6 sm:h-7 mr-3 ${styles.iconColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            User Profile
          </h2>
          <p className={`mt-1 text-sm ${styles.textMuted}`}>Manage your account information and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Image Section */}
          <div className="lg:col-span-1">
            <div
              className={`${styles.cardBg} rounded-xl ${styles.shadowColor} border ${styles.cardBorder} p-4 sm:p-6 text-center`}
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#374151",
              }}
            >
              <div className="mb-4 sm:mb-6">
                <div className="relative inline-block">
                  <img
                    src={user.profile_image || "/placeholder.svg?height=128&width=128"}
                    alt={user.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 shadow-lg mx-auto"
                    style={{
                      borderColor: currentTheme === "classic" ? "#e0e7ff" : theme?.colors?.primaryAccent || "#3b82f6",
                    }}
                  />
                  <div
                    className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: currentTheme === "classic" ? "#4f46e5" : theme?.colors?.primaryAccent || "#3b82f6",
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
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className={`text-lg sm:text-xl font-semibold ${styles.textPrimary} mb-2`}>{user.name}</h3>
              <p className={`${styles.textSecondary} mb-4 text-sm sm:text-base break-all`}>{user.email}</p>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${styles.badgeBg}`}
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
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </div>
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="lg:col-span-2">
            <div
              className={`${styles.cardBg} rounded-xl ${styles.shadowColor} border ${styles.cardBorder} p-4 sm:p-6`}
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#374151",
              }}
            >
              <h3 className={`text-lg font-semibold ${styles.textPrimary} mb-4 sm:mb-6 flex items-center`}>
                <svg
                  className={`w-5 h-5 mr-2 ${styles.iconColor}`}
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
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${styles.textMuted} mb-1`}>Full Name</label>
                    <p
                      className={`${styles.textPrimary} font-medium px-4 py-3 rounded-lg border ${styles.cardBorder}`}
                      style={{
                        background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.inputBg || "#4b5563",
                      }}
                    >
                      {user.name}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${styles.textMuted} mb-1`}>Email Address</label>
                    <p
                      className={`${styles.textPrimary} font-medium px-4 py-3 rounded-lg border ${styles.cardBorder} flex items-center break-all`}
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
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${styles.textMuted} mb-1`}>Mobile Number</label>
                    <p
                      className={`${styles.textPrimary} font-medium px-4 py-3 rounded-lg border ${styles.cardBorder} flex items-center`}
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
                      {user.mobile}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${styles.textMuted} mb-1`}>Account Type</label>
                    <p
                      className={`${styles.textPrimary} font-medium px-4 py-3 rounded-lg border ${styles.cardBorder} flex items-center`}
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
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`mt-6 sm:mt-8 pt-6 border-t ${styles.cardBorder}`}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate("/user/profile/edit")}
                    className={`flex-1 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center hover:shadow-lg`}
                    style={{
                      background:
                        currentTheme === "classic"
                          ? "#4f46e5"
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
                    onClick={() => navigate("/user/change-password")}
                    className={`flex-1 ${styles.buttonSecondary} py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center`}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PassGo Branding */}
        <div className="mt-6 sm:mt-8 text-center">
          <div className="flex items-center justify-center">
            <svg className={`w-6 h-6 ${styles.iconColor} mr-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              ></path>
            </svg>
            <span className={`text-lg font-bold ${styles.textPrimary}`}>PassGo</span>
          </div>
          <p className={`text-sm ${styles.textMuted} mt-1`}>Your gateway to amazing events</p>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
