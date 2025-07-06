"use client"
import { useEffect, useState, useCallback, useMemo } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { getDetailsForSidebar } from "../../../services/user/userProfileServices"
import { logoutHost } from "../../../services/host/hostAuthServices"
import { useTheme } from "../../../contexts/ThemeContext"
import { motion } from "framer-motion"
import {
  Home,
  User,
  LogOut,
  Plus,
  Calendar,
  DollarSign,
  Bell,
  Wallet,
  FileText,
  UserCircle,
  UserCheck,
} from "lucide-react"

// Default Avatar Component with modern color palette
const DefaultAvatar = ({ name, size = 48 }) => {
  const initials = useMemo(() => {
    if (!name) return "H"
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }, [name])

  const colors = [
    "bg-emerald-500",
    "bg-cyan-500",
    "bg-violet-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-teal-500",
    "bg-fuchsia-500",
    "bg-lime-500",
  ]

  const colorIndex = useMemo(() => {
    if (!name) return 0
    return name.charCodeAt(0) % colors.length
  }, [name])

  return (
    <div
      className={`${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-semibold shadow-sm`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  )
}

const HostSidebar = () => {
  const [host, setHost] = useState(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { theme, currentTheme } = useTheme()
  const navigate = useNavigate()

  // Framer Motion variants
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  // Fetch host data on component mount
  const fetchHostData = useCallback(async () => {
    try {
      setIsLoading(true)
      const hostData = await getDetailsForSidebar()
      if (hostData.user) {
        setHost(hostData.user)
      } else {
        setHost(hostData)
      }
    } catch (error) {
      console.error("Error loading host data:", error)
      setHost(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHostData()
  }, [fetchHostData])

  // Handle logout functionality
  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await logoutHost()
      localStorage.clear()
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error)
      localStorage.clear()
      navigate("/")
    } finally {
      setIsLoggingOut(false)
    }
  }, [isLoggingOut, navigate])

  // Switch to user mode
  const handleSwitchToUser = useCallback(() => {
    navigate("/user-home-page")
  }, [navigate])

  // Theme-based styling configuration
  const styles = useMemo(() => {
    if (currentTheme === "classic") {
      return {
        sidebarBg: "bg-white",
        borderColor: "border-gray-200",
        textPrimary: "text-gray-800",
        textSecondary: "text-gray-700",
        textMuted: "text-gray-500",
        hoverBg: "hover:bg-purple-50",
        hoverText: "hover:text-purple-600",
        userButtonColor: "text-blue-600",
        userButtonHover: "hover:bg-blue-50 hover:text-blue-700",
        logoutColor: "text-red-600",
        logoutHover: "hover:bg-red-50",
        copyrightColor: "text-gray-400",
      }
    } else {
      return {
        sidebarBg: "bg-gray-900",
        borderColor: "border-gray-700",
        textPrimary: "text-white",
        textSecondary: "text-gray-200",
        textMuted: "text-gray-400",
        hoverBg: "hover:bg-gray-800",
        hoverText: "hover:text-purple-400",
        userButtonColor: "text-blue-400",
        userButtonHover: "hover:bg-blue-500/20 hover:text-blue-300",
        logoutColor: "text-red-400",
        logoutHover: "hover:bg-red-500/20",
        copyrightColor: "text-gray-500",
      }
    }
  }, [currentTheme])

  // Active navigation item styling
  const getActiveStyle = useCallback(
    (isActive) => {
      if (!isActive) return { background: "transparent" }
      return {
        background:
          currentTheme === "classic"
            ? "linear-gradient(to right, #8b5cf6, #3b82f6)"
            : theme?.colors?.primaryAccent || "linear-gradient(to right, #8b5cf6, #3b82f6)",
      }
    },
    [currentTheme, theme?.colors?.primaryAccent],
  )

  // Navigation menu items configuration
  const navigationItems = useMemo(
    () => [
      { to: "/host-home-page", icon: Home, label: "Home" },
      { to: "/host/profile", icon: UserCircle, label: "Profile" },
      { to: "/host/add-event", icon: Plus, label: "Add Event" },
      { to: "/host/events", icon: Calendar, label: "Manage Events" },
      { to: "/host/wallet", icon: Wallet, label: "Wallet" },
      { to: "/host/earnings", icon: DollarSign, label: "Earnings & Payout" },
      { to: "/host/notifications", icon: Bell, label: "Notifications" },
      { to: "/host/terms", icon: FileText, label: "Terms & Conditions" },
    ],
    [],
  )

  return (
    <motion.div
      className={`h-screen w-52 lg:w-56 shadow-lg border-r ${styles.borderColor} flex flex-col ${styles.sidebarBg}`}
      style={{
        background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.primaryBg || "#111827",
      }}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Host Profile Section */}
      <motion.div className={`p-2 border-b ${styles.borderColor}`} variants={itemVariants}>
        {isLoading ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center mb-2 animate-pulse">
              <User className="w-6 h-6 text-white" />
            </div>
            <p className={`${styles.textMuted} text-xs`}>Loading...</p>
          </div>
        ) : host ? (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-2">
              <DefaultAvatar name={host.name} size={48} />
            </div>
            {/* Host name with inline verification badge */}
            <div className="flex items-center justify-center gap-1 mb-1">
              <h2 className={`text-sm font-semibold ${styles.textPrimary} truncate`}>{host.name || "Host"}</h2>
              {/* Verification Badge - Shows when host is verified and active */}
              {host.hostVerificationStatus === "verified" && host.is_active === true && (
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, #1DA1F2 0%, #0084FF 100%)",
                    minWidth: "16px",
                    minHeight: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 2px 4px rgba(29, 161, 242, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                  title="Verified Host"
                >
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{ filter: "drop-shadow(0 0.5px 0.5px rgba(0,0,0,0.1))" }}
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              )}
            </div>
            <p className={`text-xs ${styles.textMuted}`}>Host Dashboard</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <DefaultAvatar name="Host" size={48} />
            <p className={`${styles.textMuted} text-xs mt-2`}>Guest Host</p>
          </div>
        )}
      </motion.div>

      {/* Navigation Section - Static without scroll */}
      <motion.div
        className="flex-1 py-1 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Switch to User Mode Button */}
        <motion.div className="px-2 mb-0.5" variants={itemVariants}>
          <button
            onClick={handleSwitchToUser}
            className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-sm ${styles.userButtonColor} ${styles.userButtonHover} group`}
          >
            <UserCheck className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="font-medium truncate">Switch to User Mode</span>
          </button>
        </motion.div>

        {/* Navigation Menu Items */}
        {navigationItems.map(({ to, icon: Icon, label }) => (
          <motion.div key={to} className="px-2 mb-0.5" variants={itemVariants}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-sm group ${
                  isActive ? `text-white shadow-sm` : `${styles.textSecondary} ${styles.hoverBg} ${styles.hoverText}`
                }`
              }
              style={({ isActive }) => getActiveStyle(isActive)}
            >
              <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="font-medium truncate">{label}</span>
            </NavLink>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Section - Fixed at bottom */}
      <motion.div className={`border-t ${styles.borderColor} mt-auto`} variants={itemVariants}>
        {/* Logout Button */}
        <div className="px-2 py-1">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 text-sm ${styles.logoutColor} ${styles.logoutHover} disabled:opacity-50 disabled:cursor-not-allowed group`}
          >
            {isLoggingOut ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
            ) : (
              <LogOut className="w-4 h-4 mr-2 flex-shrink-0" />
            )}
            <span className="font-medium truncate">{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
        {/* Copyright Footer */}
        <div className="px-2 pb-2 text-center">
          <p className={`text-xs ${styles.copyrightColor}`}>© 2025 PassGo</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HostSidebar
