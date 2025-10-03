"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import { getHostRequestStatus } from "../../../services/host/hostProfileServices"

function Cta() {
  // Animation state removed as requested in previous steps
  
  const [hostStatus, setHostStatus] = useState(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const { theme, currentTheme } = useTheme()
  const navigate = useNavigate()

  // --- Spinning Ticket Animation Styles from AdminNavbar ---
  const ticketSpinStyles = `
    @keyframes ticketSpin {
        0% {
            transform: translateY(-20px) rotate(0deg) scale(0.5);
            opacity: 0;
        }
        25% {
            transform: translateY(-10px) rotate(90deg) scale(0.7);
            opacity: 0.5;
        }
        50% {
            transform: translateY(0px) rotate(180deg) scale(1);
            opacity: 1;
        }
        75% {
            transform: translateY(2px) rotate(270deg) scale(1.1);
            opacity: 1;
        }
        100% {
            transform: translateY(0px) rotate(360deg) scale(1);
            opacity: 1;
        }
    }
    .ticket-spin-animation {
        animation: ticketSpin 2s ease-in-out infinite;
    }
  `

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true)
        const { status, reason } = await getHostRequestStatus()
        setHostStatus(status)
        if (status === "rejected") setRejectionReason(reason)
      } catch (error) {
        console.log("Failed to load host status")
        setHostStatus(null)
      } finally {
        setLoading(false)
      }
    }
    fetchStatus()
  }, [])

  // Get theme-aware styles matching Welcome component (Function remains unchanged)
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        containerBg: "#ffffff",
        overlayBg: "#ffffff",
        ovalBg: "rgba(255, 255, 255, 0.95)",
        ovalBorder: "rgba(147, 51, 234, 0.1)",
        ovalShadow: "0 25px 50px rgba(0, 0, 0, 0.05)",
        cardBg: "bg-white",
        cardBorder: "border-purple-100/50",
        titleText: "text-gray-800",
        subtitleText: "text-gray-600",
        instructionText: "text-gray-500",
        titleGradient: "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",
        cardBackgroundEffect: "bg-gradient-to-br from-purple-200/40 to-blue-200/40",
        buttonPrimary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
      }
    } else {
      return {
        containerBg: theme.colors.primaryBg,
        overlayBg: `linear-gradient(90deg, rgba(0,191,255,0.1) 0%, rgba(59,130,246,0.1) 50%, rgba(0,196,255,0.1) 100%)`,
        ovalBg: theme.colors.cardBg,
        ovalBorder: theme.colors.borderColor,
        ovalShadow: `0 25px 50px ${theme.colors.glowColor}`,
        cardBg: theme.colors.cardBg,
        cardBorder: `border-[${theme.colors.borderColor}]`,
        titleText: theme.colors.primaryText,
        subtitleText: theme.colors.secondaryText,
        instructionText: theme.colors.secondaryText,
        titleGradient: null,
        cardBackgroundEffect: `linear-gradient(135deg, rgba(0,191,255,0.2), rgba(59,130,246,0.2))`,
        buttonPrimary: theme.colors.primaryAccent,
      }
    }
  }

  const handleHostAction = () => {
    if (hostStatus === "pending") {
      setShowModal(true)
    } else if (hostStatus === "rejected") {
      setShowModal(true)
    } else if (hostStatus === "verified") {
      navigate("/host")
    } else {
      navigate("/become-host")
    }
  }

  const getHostButtonContent = () => {
    if (loading) {
      return {
        text: "Loading...",
        // Decreased button size: py-2 md:py-3
        className: "w-full py-2 md:py-3 bg-gray-300 text-gray-600 rounded-xl font-semibold shadow cursor-not-allowed",
        disabled: true,
      }
    }
    switch (hostStatus) {
      case "pending":
        return {
          text: "Request Pending",
          // Decreased button size: py-2 md:py-3
          className:
            "w-full py-2 md:py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
          disabled: false,
        }
      case "rejected":
        return {
          text: "Try Again",
          // Decreased button size: py-2 md:py-3
          className:
            "w-full py-2 md:py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-red-700 hover:to-purple-700",
          disabled: false,
        }
      case "approved":
        return {
          text: "Go to Dashboard",
          // Decreased button size: py-2 md:py-3
          className:
            "w-full py-2 md:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-green-700 hover:to-emerald-700",
          disabled: false,
        }
      default:
        return {
          text: "Start Hosting",
          // Decreased button size: py-2 md:py-3
          className:
            "w-full py-2 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-purple-700",
          disabled: false,
        }
    }
  }

  const getHostDescription = () => {
    switch (hostStatus) {
      case "pending":
        return "Your request is under review"
      case "rejected":
        return "Request needs attention"
      case "approved":
        return "You're a verified host!"
      default:
        return "Turn your idea into a sold-out show"
    }
  }

  // UPDATED: Simplifies the host icon to always show the spinning ticket icon
  const getHostIcon = () => {
    // This is the spinning ticket SVG
    const spinningTicketIcon = (
        <svg
            className="w-5 h-5 md:w-7 md:h-7 text-white ticket-spin-animation"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            ></path>
        </svg>
    )

    // ALWAYS return the spinning ticket icon to ensure animation is visible, 
    // regardless of the host status (pending, rejected, approved).
    return spinningTicketIcon
  }

  const buttonContent = getHostButtonContent()
  const styles = getThemeStyles()

  return (
    <div>
      {/* Inject the spinning ticket animation styles */}
      <style dangerouslySetInnerHTML={{ __html: ticketSpinStyles }} />

      <div
        id="cta-container"
        className="py-12 md:py-20 relative overflow-hidden"
        style={{
          background: currentTheme === "classic" ? "#ffffff" : theme.colors.primaryBg,
          backgroundColor: currentTheme === "classic" ? "#ffffff" : theme.colors.primaryBg,
        }}
      >
        {/* Background overlay and patterns (kept for context/logic) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              currentTheme === "classic"
                ? "#ffffff"
                : `linear-gradient(90deg, rgba(0,191,255,0.1) 0%, rgba(59,130,246,0.1) 50%, rgba(0,196,255,0.1) 100%)`,
          }}
        ></div>

        {/* Conditional geometric patterns based on theme */}
        {currentTheme === "electric" && (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-96 h-96 opacity-20 animate-pulse"
              style={{
                background: theme.colors.shape1,
                clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 0% 80%)",
                transform: "rotate(15deg)",
              }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-80 h-80 opacity-15 animate-pulse delay-1000"
              style={{
                background: theme.colors.shape2,
                clipPath: "polygon(20% 0%, 100% 20%, 100% 100%, 0% 100%)",
                transform: "rotate(-20deg)",
              }}
            ></div>
          </div>
        )}

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header Section (kept for context/logic) */}
            <div className="text-center mb-8 md:mb-12">
              {currentTheme === "classic" ? (
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Choose Your Journey
                </h2>
              ) : (
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: theme.colors.primaryAccent,
                    color: theme.colors.primaryText,
                    textShadow: `0 0 30px ${theme.colors.glowColor}`,
                  }}
                >
                  Choose Your Journey
                </h2>
              )}
              <p
                className="text-base md:text-lg"
                style={{
                  color: currentTheme === "classic" ? "#6b7280" : theme.colors.secondaryText,
                }}
              >
                Every path leads to amazing experiences
              </p>
              <div className="mt-3 text-xs">
                {/* Removed instructions about scroll/auto-rotate */}
                <span
                  style={{
                    color: currentTheme === "classic" ? "#6b7280" : theme.colors.secondaryText,
                  }}
                >
                  Click a card to begin
                </span>
              </div>
            </div>

            {/* Main Container */}
            <div className="relative flex justify-center">
              {/* Wide Oval Container (Size reduced: max-w-4xl from max-w-6xl) */}
              <div
                className="w-full max-w-4xl group" // Added group class for hover effect
                style={{ aspectRatio: "2/1" }}
              >
                <div
                  className="absolute inset-0 backdrop-blur-sm rounded-full shadow-xl border overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]" // Adjusted shadow, added transition and scale on hover
                  style={{
                    backgroundColor: currentTheme === "classic" ? "rgba(255, 255, 255, 0.95)" : theme.colors.cardBg,
                    borderColor: currentTheme === "classic" ? "rgba(147, 51, 234, 0.1)" : theme.colors.borderColor,
                    boxShadow:
                      currentTheme === "classic"
                        ? "0 20px 40px rgba(0, 0, 0, 0.05)" // Adjusted shadow
                        : `0 20px 40px ${theme.colors.glowColor}`, // Adjusted shadow
                  }}
                >
                  {/* Background Gradient / White background (kept for context/logic) */}
                  {currentTheme === "electric" && (
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, rgba(0,191,255,0.1) 0%, transparent 50%, rgba(59,130,246,0.1) 100%)`,
                      }}
                    ></div>
                  )}
                  {currentTheme === "classic" && <div className="absolute inset-0 rounded-full bg-white"></div>}

                  {/* Content Container (No rotation style) */}
                  <div
                    className="absolute inset-0 flex items-center justify-center p-4 md:p-6 lg:p-8"
                  >
                    {/* Cards Grid - Perfectly Centered (Size reduced: max-w-3xl from max-w-5xl) */}
                    <div className="w-full max-w-3xl">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-12">
                        
                        {/* Get Tickets Card */}
                        <div
                          className="rounded-xl md:rounded-2xl p-5 md:p-7 shadow-lg border transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group cursor-pointer relative overflow-hidden mx-auto w-full max-w-xs lg:max-w-none" // Size reduced
                          style={{
                            backgroundColor:
                              currentTheme === "classic" ? "rgba(255, 255, 255, 0.95)" : theme.colors.cardBg,
                            borderColor:
                              currentTheme === "classic" ? "rgba(147, 51, 234, 0.1)" : theme.colors.borderColor,
                            boxShadow:
                              currentTheme === "classic"
                                ? "0 8px 20px rgba(0, 0, 0, 0.05)" // Adjusted shadow
                                : `0 8px 20px ${theme.colors.glowColor}`, // Adjusted shadow
                          }}
                          onClick={() => navigate("/user/home")}
                        >
                          {/* Card Background Effect (kept for context/logic) */}
                          <div
                            className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 rounded-full blur-lg group-hover:scale-125 transition-transform duration-300" 
                            style={{
                              background:
                                currentTheme === "classic"
                                  ? "rgba(255, 255, 255, 0.3)"
                                  : `linear-gradient(135deg, rgba(0,191,255,0.2), rgba(59,130,246,0.2))`,
                            }}
                          ></div>

                          <div className="relative z-10 text-center lg:text-left">
                            {/* Icon - Spinning Ticket SVG */}
                            <div
                              className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-5 group-hover:rotate-6 transition-transform duration-300 mx-auto lg:mx-0" // Reduced icon container size
                              style={{
                                background:
                                  currentTheme === "classic"
                                    ? "linear-gradient(to right, #7c3aed, #2563eb)"
                                    : theme.colors.primaryAccent,
                              }}
                            >
                                <svg
                                    className="w-5 h-5 md:w-7 md:h-7 text-white ticket-spin-animation"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                                    ></path>
                                </svg>
                            </div>

                            {/* Content */}
                            <h3
                              className="text-lg md:text-xl font-bold mb-1 md:mb-2" // Reduced text size
                              style={{
                                color: currentTheme === "classic" ? "#1f2937" : theme.colors.primaryText,
                              }}
                            >
                              Get Tickets
                            </h3>
                            <p
                              className="mb-3 md:mb-5 leading-relaxed text-xs md:text-sm" // Reduced text size
                              style={{
                                color: currentTheme === "classic" ? "#6b7280" : theme.colors.secondaryText,
                              }}
                            >
                              Every ticket unlocks a new memory
                            </p>

                            {/* Button */}
                            <button
                              className="w-full py-2 md:py-3 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 text-xs md:text-sm" // Reduced button size/text size
                              style={{
                                background:
                                  currentTheme === "classic"
                                    ? "linear-gradient(to right, #7c3aed, #2563eb)"
                                    : theme.colors.primaryAccent,
                              }}
                            >
                              Browse Events
                            </button>
                          </div>
                        </div>

                        {/* Become a Host Card */}
                        <div
                          className="rounded-xl md:rounded-2xl p-5 md:p-7 shadow-lg border transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group cursor-pointer relative overflow-hidden mx-auto w-full max-w-xs lg:max-w-none" // Size reduced
                          style={{
                            backgroundColor:
                              currentTheme === "classic" ? "rgba(255, 255, 255, 0.95)" : theme.colors.cardBg,
                            borderColor:
                              currentTheme === "classic" ? "rgba(147, 51, 234, 0.1)" : theme.colors.borderColor,
                            boxShadow:
                              currentTheme === "classic"
                                ? "0 8px 20px rgba(0, 0, 0, 0.05)" // Adjusted shadow
                                : `0 8px 20px ${theme.colors.glowColor}`, // Adjusted shadow
                          }}
                          onClick={handleHostAction}
                        >
                          {/* Card Background Effect (kept for context/logic) */}
                          <div
                            className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 rounded-full blur-lg group-hover:scale-125 transition-transform duration-300" // Reduced size, blur
                            style={{
                              background:
                                currentTheme === "classic"
                                  ? "rgba(255, 255, 255, 0.3)"
                                  : `linear-gradient(135deg, rgba(0,191,255,0.2), rgba(59,130,246,0.2))`,
                            }}
                          ></div>

                          <div className="relative z-10 text-center lg:text-left">
                            {/* Icon - Now always returns the spinning ticket */}
                            <div
                              className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-5 group-hover:rotate-6 transition-transform duration-300 mx-auto lg:mx-0`} 
                              style={
                                 {
                                      // The host status logic that previously changed background is now removed, 
                                      // ensuring a consistent appearance regardless of status, using the default gradient.
                                      background:
                                        currentTheme === "classic"
                                          ? "linear-gradient(to right, #2563eb, #7c3aed)"
                                          : theme.colors.secondaryAccent,
                                 }
                              }
                            >
                              {getHostIcon()}
                            </div>

                            {/* Content */}
                            <h3
                              className="text-lg md:text-xl font-bold mb-1 md:mb-2" // Reduced text size
                              style={{
                                color: currentTheme === "classic" ? "#1f2937" : theme.colors.primaryText,
                              }}
                            >
                              Become a Host
                            </h3>
                            <p
                              className={`mb-3 md:mb-5 leading-relaxed text-xs md:text-sm ${ // Reduced text size
                                hostStatus === "pending"
                                  ? "text-yellow-600"
                                  : hostStatus === "rejected"
                                    ? "text-red-600"
                                    : hostStatus === "approved"
                                      ? "text-green-600"
                                      : ""
                              }`}
                              style={
                                !hostStatus
                                  ? {
                                      color: currentTheme === "classic" ? "#6b7280" : theme.colors.secondaryText,
                                    }
                                  : {}
                              }
                            >
                              {getHostDescription()}
                            </p>

                            {/* Button */}
                            <button
                              disabled={buttonContent.disabled}
                              className={`${buttonContent.className} text-xs md:text-sm`} // Reduced text size via className modification in getHostButtonContent
                            >
                              {buttonContent.text}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal (kept for context/logic) */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                    {hostStatus === "pending" ? "Request Status" : "Application Update"}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {/* Modal Content */}
                <div className="mb-6">
                  {hostStatus === "pending" && (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-white animate-spin"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">Under Review</h4>
                      <p className="text-gray-600 mb-4">
                        Your host application is currently being reviewed by our admin team. This process typically
                        takes 2-3 business days.
                      </p>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          <strong>What happens next?</strong>
                          <br />
                          You'll receive an email notification once your application has been processed.
                        </p>
                      </div>
                    </div>
                  )}
                  {hostStatus === "rejected" && (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">Application Update</h4>
                      <p className="text-gray-600 mb-4">
                        Your host application needs some adjustments before approval.
                      </p>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <p className="text-sm text-red-800 font-medium mb-2">Reason for rejection:</p>
                        <p className="text-sm text-red-700 italic">"{rejectionReason}"</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Don't worry! You can update your application and resubmit.
                      </p>
                    </div>
                  )}
                </div>
                {/* Modal Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors duration-200"
                  >
                    Close
                  </button>
                  {hostStatus === "rejected" && (
                    <button
                      onClick={() => {
                        setShowModal(false)
                        navigate("/become-host")
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200"
                    >
                      Update Application
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cta