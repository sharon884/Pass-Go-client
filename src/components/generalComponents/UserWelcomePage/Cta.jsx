"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import { getHostRequestStatus } from "../../../services/host/hostProfileServices" // Import getHostRequestStatus

function Cta() {
  const [rotation, setRotation] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [hostStatus, setHostStatus] = useState(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isScrollPaused, setIsScrollPaused] = useState(false)
  const { theme, currentTheme } = useTheme()
  const navigate = useNavigate()

  // Existing animation logic for the background element (kept unchanged)
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

  // Existing data fetching logic (kept unchanged)
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true)
        const { status, reason } = await getHostRequestStatus()
        setHostStatus(status)
        setRejectionReason(reason)
      } catch (error) {
        console.error("Failed to fetch host status:", error)
        setHostStatus(null)
      } finally {
        setLoading(false)
      }
    }
    fetchStatus()
  }, [])

  // Existing theme styles
  const styles = {
    containerBg: currentTheme === "classic" ? "#f3f4f6" : theme.colors.secondaryBg,
    cardBg: currentTheme === "classic" ? "#ffffff" : theme.colors.cardBg,
    cardBorder: currentTheme === "classic" ? "#e5e7eb" : theme.colors.borderColor,
    title: currentTheme === "classic" ? "#111827" : theme.colors.primaryText,
    subtitle: currentTheme === "classic" ? "#4b5563" : theme.colors.secondaryText,
  }

  const handleBecomeHost = () => {
    if (hostStatus) {
      setShowModal(true)
    } else {
      navigate("/become-host")
    }
  }

  return (
    <div
      className="max-w-7xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: styles.containerBg }}
    >
      <div
        className={`relative overflow-hidden p-8 md:p-12 text-center rounded-3xl transition-all duration-700
          bg-gradient-to-br from-indigo-50 dark:from-slate-800 to-white dark:to-slate-900 shadow-2xl
          max-w-5xl mx-auto border-2 border-indigo-600/70 transform hover:scale-[1.01]`}
        style={{
          borderColor: hostStatus ? styles.cardBorder : theme.colors.primaryAccent,
          boxShadow: `0 0 50px -10px ${theme.colors.primaryAccent}40`, // Subtle glow
        }}
        onMouseEnter={() => setIsScrollPaused(true)}
        onMouseLeave={() => setIsScrollPaused(false)}
      >
        {/* Animated Background Ring */}
        <div
          className={`absolute inset-0 m-auto w-4/5 h-4/5 rounded-full blur-xl opacity-30 animate-pulse`}
          style={{
            backgroundColor: theme.colors.primaryAccent,
            transition: "all 6s ease-in-out",
            transform: `rotate(${rotation}deg) scale(${isPaused ? 1.05 : 1})`,
          }}
        ></div>

        <div className="relative z-10 space-y-4">
          {/* Main Heading (Increased Text Size) */}
          <h2
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: styles.title }}
          >
            {hostStatus === "approved"
              ? "You're all set to Host! 🎉"
              : hostStatus === "pending"
              ? "Verification In Progress ⏳"
              : hostStatus === "rejected"
              ? "Verification Rejected ❌"
              : "Ready to Host an Event? Start Now."}
          </h2>

          {/* Subtitle (Increased Text Size) */}
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto font-medium"
            style={{ color: styles.subtitle }}
          >
            {hostStatus === "approved"
              ? "Start creating and publishing your next unforgettable event."
              : hostStatus === "pending"
              ? "We are reviewing your host application. We appreciate your patience."
              : hostStatus === "rejected"
              ? "Your host application was rejected. Click below to review the reason."
              : "Join our community of event creators and leverage our powerful ticketing tools."}
          </p>

          {/* CTA Button (Enhanced Styling and Animation) */}
          {hostStatus !== "approved" && (
            <button
              onClick={handleBecomeHost}
              className={`mt-6 inline-flex items-center justify-center px-10 py-3 text-xl font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.05]
                bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50`}
              disabled={loading}
            >
              {loading
                ? "Checking Status..."
                : hostStatus === "pending"
                ? "View Status"
                : hostStatus === "rejected"
                ? "View Rejection Details"
                : "Become a Host & Start Selling Tickets"}
            </button>
          )}
        </div>

        {/* Modal for Status (Kept unchanged structurally) */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 md:p-8 transform transition-all duration-300 scale-100"
              style={{ border: `1px solid ${styles.cardBorder}` }}
            >
              <h3 className="text-2xl font-bold mb-4" style={{ color: styles.title }}>
                Application Status
              </h3>
              <div className="mb-6 space-y-4">
                {hostStatus === "pending" && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg">
                    <p className="font-semibold text-yellow-800 dark:text-yellow-300">
                      Your application is **Pending Review** 📝
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                      Our team will review your details shortly. We will notify you once a decision is made.
                    </p>
                  </div>
                )}
                {hostStatus === "approved" && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
                    <p className="font-semibold text-green-800 dark:text-green-300">
                      You are an **Approved Host!** 🎉
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                      Head over to the Host Dashboard to start creating your first event.
                    </p>
                  </div>
                )}
                {hostStatus === "rejected" && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
                    <p className="font-semibold text-red-800 dark:text-red-300 mb-2">
                      Your application was **Rejected** 😔
                    </p>
                    {rejectionReason && (
                      <div className="mb-3 p-3 bg-red-100 dark:bg-red-900/40 rounded-md">
                        <p className="font-medium mb-2 text-red-800 dark:text-red-300 text-sm">Reason for rejection:</p>
                        <p className="text-sm text-red-700 dark:text-red-400 italic">"{rejectionReason}"</p>
                      </div>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Don't worry! You can update your application and resubmit.
                    </p>
                  </div>
                )}
              </div>
              {/* Modal Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-xl font-semibold transition-colors duration-200"
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
        )}
      </div>
    </div>
  )
}

export default Cta