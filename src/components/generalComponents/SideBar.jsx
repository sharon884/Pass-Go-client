"use client"
import { useState, useCallback, useMemo } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useTheme } from "../../contexts/ThemeContext"
import { motion } from "framer-motion"
import { Home, User, LogOut, Shield, CheckCircle, BarChart3, Wallet, Bell, Settings, FileText } from "lucide-react"

// Default Avatar Component - Performance optimized
const DefaultAvatar = ({ name, size = 48 }) => {
  const initials = useMemo(() => {
    if (!name) return "A"
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }, [name])

  const colors = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-teal-500",
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

const AdminSidebar = () => {
  const { name, role } = useSelector((state) => state.auth.user)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
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

  // Memoized logout handler
  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      // Replace with your actual admin logout API call
      localStorage.clear()
      navigate("/admin-login")
    } catch (error) {
      console.error("Logout error:", error)
      localStorage.clear()
      navigate("/admin-login")
    } finally {
      setIsLoggingOut(false)
    }
  }, [isLoggingOut, navigate])

  // Memoized theme styles to prevent recalculation
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
        profileBorder: "border-purple-200",
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
        profileBorder: "border-purple-400",
        logoutColor: "text-red-400",
        logoutHover: "hover:bg-red-500/20",
        copyrightColor: "text-gray-500",
      }
    }
  }, [currentTheme])

  // Memoized active style function
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

  // Memoized navigation items to prevent re-creation
  const navigationItems = useMemo(
    () => [
      { to: "/admin-dashboard", icon: Home, label: "Dashboard" },
      { to: "/admin/profile", icon: User, label: "Profile" },
      { to: "/admin/verify-host-request", icon: Shield, label: "Verify Hosts" },
      { to: "/admin/events/approval", icon: CheckCircle, label: "Approve Events" },
      { to: "/admin/event-listing", icon: BarChart3, label: "Reports" },
      { to: "/admin/wallet", icon: Wallet, label: "Wallet" },
      { to: "/admin/notifications", icon: Bell, label: "Notifications" },
      { to: "/admin/settings", icon: Settings, label: "Settings" },
      { to: "/admin/terms", icon: FileText, label: "Terms & Conditions" },
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
      {/* Admin Profile Section - Compact */}
      <motion.div className={`p-3 border-b ${styles.borderColor}`} variants={itemVariants}>
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-2">
            {/* Always use default avatar - no external images */}
            <DefaultAvatar name={name || "Admin"} size={48} />
            {/* Admin Badge */}
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
              <Shield className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <h2 className={`text-sm font-semibold ${styles.textPrimary} truncate w-full`}>{name || "Admin"}</h2>
          <p className={`text-xs ${styles.textMuted} mt-0.5`}>Administrator</p>
        </div>
      </motion.div>

      {/* Navigation Section - Scrollable */}
      <motion.div
        className="flex-1 py-2 overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Navigation Items */}
        {navigationItems.map(({ to, icon: Icon, label }) => (
          <motion.div key={to} className="px-2 mb-1" variants={itemVariants}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-sm group ${
                  isActive ? `text-white shadow-sm` : `${styles.textSecondary} ${styles.hoverBg} ${styles.hoverText}`
                }`
              }
              style={({ isActive }) => getActiveStyle(isActive)}
            >
              <Icon className="w-4 h-4 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-medium truncate">{label}</span>
            </NavLink>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Section with Logout - Fixed at bottom */}
      <motion.div className={`border-t ${styles.borderColor} mt-auto`} variants={itemVariants}>
        {/* Logout Button */}
        <div className="px-2 py-2">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 text-sm ${styles.logoutColor} ${styles.logoutHover} disabled:opacity-50 disabled:cursor-not-allowed group`}
          >
            {isLoggingOut ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
            ) : (
              <LogOut className="w-4 h-4 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
            )}
            <span className="font-medium truncate">{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
        {/* Copyright Footer */}
        <div className="px-2 pb-2 text-center">
          <p className={`text-xs ${styles.copyrightColor}`}>© 2025 PassGo Admin</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Memoize the entire component to prevent unnecessary re-renders
export default AdminSidebar
