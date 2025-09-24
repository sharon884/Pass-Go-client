"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import { useTheme } from "../../../contexts/ThemeContext"
import { getHostRequestStatus } from "../../../services/host/hostProfileServices" // Import getHostRequestStatus

function Cta() {
  const [rotation, setRotation] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [hostStatus, setHostStatus] = useState(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isScrollPaused, setIsScrollPaused] = useState(false)
  // const { theme, currentTheme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && !isScrollPaused) {
        setRotation((prev) => prev + 180)
        setIsPaused(true)
        setTimeout(() => setIsPaused(false), 5000)
      }
    }, 6000)
    return () => clearInterval(interval)
  }, [isPaused, isScrollPaused])

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

  // Scroll handling
  useEffect(() => {
    const handleScroll = (e) => {
      if (e.deltaY !== 0) {
        setIsScrollPaused(true)
        // Determine scroll direction and rotate accordingly
        if (e.deltaY > 0) {
          // Scrolling down - rotate to next
          setRotation((prev) => prev + 180)
        } else {
          // Scrolling up - rotate to previous
          setRotation((prev) => prev - 180)
        }
        // Resume auto-rotation after 3 seconds
        setTimeout(() => {
          setIsScrollPaused(false)
        }, 3000)
      }
    }
    const container = document.getElementById("cta-container")
    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: false })
      return () => container.removeEventListener("wheel", handleScroll)
    }
  }, [])

  // Get theme-aware styles matching Welcome component
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
        className: "w-full py-3 md:py-4 bg-gray-300 text-gray-600 rounded-xl font-semibold shadow cursor-not-allowed",
        disabled: true,
      }
    }
    switch (hostStatus) {
      case "pending":
        return {
          text: "Request Pending",
          className:
            "w-full py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
          disabled: false,
        }
      case "rejected":
        return {
          text: "Try Again",
          className:
            "w-full py-3 md:py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-red-700 hover:to-purple-700",
          disabled: false,
        }
      case "approved":
        return {
          text: "Go to Dashboard",
          className:
            "w-full py-3 md:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-green-700 hover:to-emerald-700",
          disabled: false,
        }
      default:
        return {
          text: "Start Hosting",
          className:
            "w-full py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-purple-700",
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

  const getHostIcon = () => {
    switch (hostStatus) {
      case "pending":
        return (
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-white animate-spin"
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
        )
      case "rejected":
        return (
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        )
      case "approved":
        return (
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        )
    }
  }

  const buttonContent = getHostButtonContent()
  const styles = getThemeStyles()

  return (
    <div>
      <div
        id="cta-container"
        className="py-12 md:py-20 relative overflow-hidden"
        style={{
          background: currentTheme === "classic" ? "#ffffff" : theme.colors.primaryBg,
          backgroundColor: currentTheme === "classic" ? "#ffffff" : theme.colors.primaryBg,
        }}
      >
        {/* Background overlay */}
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
            {/* Header Section */}
            <div className="text-center mb-12 md:mb-16">
              {currentTheme === "classic" ? (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Choose Your Journey
                </h2>
              ) : (
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent"
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
                className="text-lg md:text-xl"
                style={{
                  color: currentTheme === "classic" ? "#6b7280" : theme.colors.secondaryText,
                }}
              >
                Every path leads to amazing experiences
              </p>
              <div className="mt-4 text-sm">
                <span
                  style={{
                    color: currentTheme === "classic" ? "#6b7280" : theme.colors.secondaryText,
                  }}
                >
                  Scroll to navigate • Auto-rotates every 6 seconds
                </span>
              </div>
            </div>

            {/* Main Container */}
            <div className="relative flex justify-center">
              {/* Wide Oval Container */}
              <div className="w-full max-w-6xl" style={{ aspectRatio: "2/1" }}>
                <div
                  className="absolute inset-0 backdrop-blur-sm rounded-full shadow-2xl border overflow-hidden"
                  style={{
                    backgroundColor: currentTheme === "classic" ? "rgba(255, 255, 255, 0.95)" : theme.colors.cardBg,
                    borderColor: currentTheme === "classic" ? "rgba(147, 51, 234, 0.1)" : theme.colors.borderColor,
                    boxShadow:
                      currentTheme === "classic"
                        ? "0 25px 50px rgba(0, 0, 0, 0.05)"
                        : `0 25px 50px ${theme.colors.glowColor}`,
                  }}
                >
                  {/* Background Gradient - only for electric theme */}
                  {currentTheme === "electric" && (
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, rgba(0,191,255,0.1) 0%, transparent 50%, rgba(59,130,246,0.1) 100%)`,
                      }}
                    ></div>
                  )}

                  {/* Pure white background for classic theme */}
                  {currentTheme === "classic" && <div className="absolute inset-0 rounded-full bg-white"></div>}

                  {/* Rotating Content Container */}
                  <div
                    className="absolute inset-0 transition-transform duration-1000 ease-in-out flex items-center justify-center p-4 md:p-6 lg:p-8"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {/* Cards Grid - Perfectly Centered */}
                    <div className="w-full max-w-5xl">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
                        {/* Get Tickets Card */}
                        <div
                          className="rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer relative overflow-hidden mx-auto w-full max-w-sm lg:max-w-none"
                          style={{
                            transform: `rotate(${-rotation}deg)`,
                            backgroundColor:
                              currentTheme === "classic" ? "rgba(255, 255, 255, 0.95)" : theme.colors.cardBg,
                            borderColor:
                              currentTheme === "classic" ? "rgba(147, 51, 234, 0.1)" : theme.colors.borderColor,
                            boxShadow:
                              currentTheme === "classic"
                                ? "0 10px 25px rgba(0, 0, 0, 0.05)"
                                : `0 10px 25px ${theme.colors.glowColor}`,
                          }}
                          onClick={() => navigate("/user/home")}
                        >
                          {/* Card Background Effect */}
                          <div
                            className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-300"
                            style={{
                              background:
                                currentTheme === "classic"
                                  ? "rgba(255, 255, 255, 0.3)"
                                  : `linear-gradient(135deg, rgba(0,191,255,0.2), rgba(59,130,246,0.2))`,
                            }}
                          ></div>

                          <div className="relative z-10 text-center lg:text-left">
                            {/* Icon */}
                            <div
                              className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:rotate-12 transition-transform duration-300 mx-auto lg:mx-0"
                              style={{
                                background:
                                  currentTheme === "classic"
                                    ? "linear-gradient(to right, #7c3aed, #2563eb)"
                                    : theme.colors.primaryAccent,
                              }}
                            >
                              <svg
                                className="w-6 h-6 md:w-8 md:h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                                />
                              </svg>
                            </div>

                            {/* Content */}
                            <h3
                              className="text-xl md:text-2xl font-bold mb-2 md:mb-3"
                              style={{
                                color: currentTheme === "classic" ? "#1f2937" : theme.colors.primaryText,
                              }}
                            >
                              Get Tickets
                            </h3>
                            <p
                              className="mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                              style={{
                                color: currentTheme === "classic" ? "#6b7280" : theme.colors.secondaryText,
                              }}
                            >
                              Every ticket unlocks a new memory
                            </p>

                            {/* Button */}
                            <button
                              className="w-full py-3 md:py-4 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
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
                          className="rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer relative overflow-hidden mx-auto w-full max-w-sm lg:max-w-none"
                          style={{
                            transform: `rotate(${-rotation}deg)`,
                            backgroundColor:
                              currentTheme === "classic" ? "rgba(255, 255, 255, 0.95)" : theme.colors.cardBg,
                            borderColor:
                              currentTheme === "classic" ? "rgba(147, 51, 234, 0.1)" : theme.colors.borderColor,
                            boxShadow:
                              currentTheme === "classic"
                                ? "0 10px 25px rgba(0, 0, 0, 0.05)"
                                : `0 10px 25px ${theme.colors.glowColor}`,
                          }}
                          onClick={handleHostAction}
                        >
                          {/* Card Background Effect */}
                          <div
                            className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-300"
                            style={{
                              background:
                                currentTheme === "classic"
                                  ? "rgba(255, 255, 255, 0.3)"
                                  : `linear-gradient(135deg, rgba(0,191,255,0.2), rgba(59,130,246,0.2))`,
                            }}
                          ></div>

                          <div className="relative z-10 text-center lg:text-left">
                            {/* Icon */}
                            <div
                              className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:rotate-12 transition-transform duration-300 mx-auto lg:mx-0 ${
                                hostStatus === "pending"
                                  ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                  : hostStatus === "rejected"
                                    ? "bg-gradient-to-r from-red-500 to-purple-500"
                                    : hostStatus === "approved"
                                      ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                      : ""
                              }`}
                              style={
                                !hostStatus || hostStatus === "default"
                                  ? {
                                      background:
                                        currentTheme === "classic"
                                          ? "linear-gradient(to right, #2563eb, #7c3aed)"
                                          : theme.colors.secondaryAccent,
                                    }
                                  : {}
                              }
                            >
                              {getHostIcon()}
                            </div>

                            {/* Content */}
                            <h3
                              className="text-xl md:text-2xl font-bold mb-2 md:mb-3"
                              style={{
                                color: currentTheme === "classic" ? "#1f2937" : theme.colors.primaryText,
                              }}
                            >
                              Become a Host
                            </h3>
                            <p
                              className={`mb-4 md:mb-6 leading-relaxed text-sm md:text-base ${
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
                              className={`${buttonContent.className} text-sm md:text-base`}
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

        {/* Modal */}
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
