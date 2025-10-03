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
const DefaultAvatar = ({ name, size = 36 }) => {
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
        stiffness: 60, // Further reduced for a softer, more deliberate flow
        damping: 30,  // Increased for smoother, more controlled stop
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
    navigate("/user/home")
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
      { to: "/host", icon: Home, label: "Home" },
      { to: "/host/profile", icon: UserCircle, label: "Profile" },
      { to: "/host/add", icon: Plus, label: "Add Event" },
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
      // Alignment fix: flex-shrink-0 and h-screen
      className={`h-screen w-44 lg:w-48 shadow-lg border-r ${styles.borderColor} flex flex-col ${styles.sidebarBg} flex-shrink-0`}
      style={{
        background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.primaryBg || "#111827",
        // FIX: Enforce hardware acceleration to prevent animation stutter/jank
        transform: 'translateZ(0)',
      }}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Host Profile Section - flex-shrink-0 for stable height */}
      <motion.div className={`p-1.5 border-b ${styles.borderColor} flex-shrink-0`} variants={itemVariants}>
        {isLoading ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center mb-1.5 animate-pulse">
              <User className="w-5 h-5 text-white" />
            </div>
            <p className={`${styles.textMuted} text-xs`}>Loading...</p>
          </div>
        ) : host ? (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-1.5">
              {host.profile_image ? (
                <img
                  src={host.profile_image || "/placeholder.svg"}
                  alt={host.name || "Host"}
                  className="w-9 h-9 rounded-full object-cover shadow-sm"
                  onError={(e) => {
                    // Fallback to default avatar if image fails to load
                    e.target.style.display = "none"
                    e.target.nextSibling.style.display = "flex"
                  }}
                />
              ) : null}
              {!host.profile_image && <DefaultAvatar name={host.name} size={36} />}
              {/* Hidden fallback avatar for image load errors */}
              {host.profile_image && (
                <div style={{ display: "none" }}>
                  <DefaultAvatar name={host.name} size={36} />
                </div>
              )}
              {host.hostVerificationStatus === "verified" && host.is_active === true && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <h2 className={`text-xs font-semibold ${styles.textPrimary} truncate`}>{host.name || "Host"}</h2>
            <p className={`text-xs ${styles.textMuted}`}>Host Dashboard</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <DefaultAvatar name="Host" size={36} />
            <p className={`${styles.textMuted} text-xs mt-1.5`}>Guest Host</p>
          </div>
        )}
      </motion.div>

      {/* Navigation Section - overflow-y-auto to allow scrolling */}
      <motion.div
        className="flex-1 py-1 overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Switch to User Mode Button */}
        <motion.div className="px-1.5 mb-0.5" variants={itemVariants}>
          <button
            onClick={handleSwitchToUser}
            className={`w-full flex items-center px-2.5 py-1.5 rounded-lg transition-all duration-200 text-xs ${styles.userButtonColor} ${styles.userButtonHover} group`}
          >
            <UserCheck className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
            <span className="font-medium truncate">Switch to User Mode</span>
          </button>
        </motion.div>

        {/* Navigation Menu Items */}
        {navigationItems.map(({ to, icon: Icon, label }) => (
          <motion.div key={to} className="px-1.5 mb-0.5" variants={itemVariants}>
            <NavLink
              to={to}
              end={to === "/host"}
              className={({ isActive }) =>
                `flex items-center px-2.5 py-1.5 rounded-lg transition-all duration-200 text-xs group ${
                  isActive ? `text-white shadow-sm` : `${styles.textSecondary} ${styles.hoverBg} ${styles.hoverText}`
                }`
              }
              style={({ isActive }) => getActiveStyle(isActive)}
            >
              <Icon className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
              <span className="font-medium truncate">{label}</span>
            </NavLink>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Section - Fixed at bottom - flex-shrink-0 for stable height */}
      <motion.div className={`border-t ${styles.borderColor} mt-auto flex-shrink-0`} variants={itemVariants}>
        {/* Logout Button */}
        <div className="px-1.5 py-1">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center justify-center px-2.5 py-1.5 rounded-lg transition-all duration-200 text-xs ${styles.logoutColor} ${styles.logoutHover} disabled:opacity-50 disabled:cursor-not-allowed group`}
          >
            {isLoggingOut ? (
              <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-current border-t-transparent mr-2"></div>
            ) : (
              <LogOut className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
            )}
            <span className="font-medium truncate">{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
        {/* Copyright Footer */}
        <div className="px-1.5 pb-1.5 text-center">
          <p className={`text-xs ${styles.copyrightColor}`}>© 2025 PassGo</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HostSidebar