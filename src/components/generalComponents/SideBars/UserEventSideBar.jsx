"use client"
import { useEffect, useState, useCallback, useMemo } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { getUserProfile } from "../../../services/user/userProfileServices"
import { logoutUser } from "../../../services/user/userAuthServices"
// import { useTheme } from "../../../contexts/ThemeContext"
import { motion } from "framer-motion"
import { logOut } from "../../../features/auth/authSlice"
import { useDispatch } from "react-redux"
import {
  Home,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  Calendar,
  Wallet,
  Bell,
  FileText,
  UserCheck,
} from "lucide-react"

const categories = [
  { name: "Music", icon: "🎵" },
  { name: "Art", icon: "🎨" },
  { name: "Motosports", icon: "🏍️" },
  { name: "Fashion", icon: "👗" },
]

// Default Avatar Component - Performance optimized
const DefaultAvatar = ({ name, size = 36 }) => {
  const initials = useMemo(() => {
    if (!name) return "U"
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
      className={`${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-medium shadow-sm`}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  )
}

const UserSidebar = () => {
  const [user, setUser] = useState(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // const { theme, currentTheme } = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  // Memoized fetch function to prevent unnecessary re-creation
  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true)
      const userData = await getUserProfile()
      if (userData.user) {
        setUser(userData.user)
      } else {
        setUser(userData)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Only fetch once on mount
  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  // Memoized logout handler
  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await logoutUser()
      localStorage.clear()
      dispatch(logOut())
      navigate("/login")
    } catch (error) {
      console.error("Logout error:", error)
      localStorage.clear()
      navigate("/login")
    } finally {
      setIsLoggingOut(false)
    }
  }, [isLoggingOut, navigate])

  // Memoized host switch handler
  const handleSwitchToHost = useCallback(() => {
    navigate("/host")
  }, [navigate])

  // Memoized categories toggle
  const toggleCategories = useCallback(() => {
    setIsCategoriesOpen((prev) => !prev)
  }, [])

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
        hostButtonColor: "text-orange-600",
        hostButtonHover: "hover:bg-orange-50 hover:text-orange-700",
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
        hostButtonColor: "text-orange-400",
        hostButtonHover: "hover:bg-orange-500/20 hover:text-orange-300",
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
      { to: "/user/profile", icon: User, label: "Profile" },
      { to: "/user/bookings", icon: Calendar, label: "My Bookings" },
      { to: "/user/wallet", icon: Wallet, label: "Wallet" },
      { to: "/user/notifications", icon: Bell, label: "Notifications" },
      { to: "/user/terms", icon: FileText, label: "Terms & Conditions" },
    ],
    [],
  )

  return (
    <motion.div
      className={`h-screen w-44 lg:w-48 shadow-lg border-r ${styles.borderColor} flex flex-col ${styles.sidebarBg}`}
      style={{
        background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.primaryBg || "#111827",
      }}
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={`p-2.5 border-b ${styles.borderColor}`} variants={itemVariants}>
        {isLoading ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-1.5 animate-pulse">
              <User className="w-4 h-4 text-white" />
            </div>
            <p className={`${styles.textMuted} text-xs`}>Loading...</p>
          </div>
        ) : user ? (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-1.5">
              {user.profile_image ? (
                <img
                  src={user.profile_image || "/placeholder.svg"}
                  alt={user.name || "User"}
                  className="w-9 h-9 rounded-full object-cover shadow-sm"
                  onError={(e) => {
                    e.target.style.display = "none"
                    e.target.nextSibling.style.display = "block"
                  }}
                />
              ) : (
                <DefaultAvatar name={user.name} size={36} />
              )}
              {/* Instagram-style Verification Badge */}
              {user.isVerified && (
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
            <h2 className={`text-xs font-semibold ${styles.textPrimary} truncate w-full`}>{user.name || "User"}</h2>
            <p className={`text-xs ${styles.textMuted} mt-0.5`}>Welcome back!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <DefaultAvatar name="Guest" size={36} />
            <p className={`${styles.textMuted} text-xs mt-1.5`}>Guest User</p>
          </div>
        )}
      </motion.div>

      <motion.div
        className="flex-1 py-1.5 overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Home Link */}
        <motion.div className="px-1.5 mb-0.5" variants={itemVariants}>
          <NavLink
            to="/user/home"
            className={({ isActive }) =>
              `flex items-center px-2.5 py-1.5 rounded-lg transition-all duration-200 text-xs group ${
                isActive ? `text-white shadow-sm` : `${styles.textSecondary} ${styles.hoverBg} ${styles.hoverText}`
              }`
            }
            style={({ isActive }) => getActiveStyle(isActive)}
          >
            <Home className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
            <span className="font-medium truncate">Home</span>
          </NavLink>
        </motion.div>

        {/* Host Switch Button */}
        {user?.role === "host" && (
          <motion.div className="px-1.5 mb-0.5" variants={itemVariants}>
            <button
              onClick={handleSwitchToHost}
              className={`w-full flex items-center px-2.5 py-1.5 rounded-lg transition-all duration-200 text-xs ${styles.hostButtonColor} ${styles.hostButtonHover} group`}
            >
              <UserCheck className="w-3.5 h-3.5 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-medium truncate">Switch to Host</span>
            </button>
          </motion.div>
        )}

        {/* Categories Dropdown */}
        <motion.div className="px-1.5 mb-0.5" variants={itemVariants}>
          <button
            onClick={toggleCategories}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-all duration-200 text-xs ${styles.textSecondary} ${styles.hoverBg} ${styles.hoverText} group`}
          >
            <div className="flex items-center min-w-0">
              <span className="text-sm mr-2 flex-shrink-0">🎫</span>
              <span className="font-medium truncate">Categories</span>
            </div>
            {isCategoriesOpen ? (
              <ChevronDown className="w-3 h-3 flex-shrink-0 transition-transform" />
            ) : (
              <ChevronRight className="w-3 h-3 flex-shrink-0 transition-transform" />
            )}
          </button>
          {/* Categories Dropdown Content */}
          {isCategoriesOpen && (
            <div className="mt-0.5 ml-1.5 space-y-0.5">
              {categories.map((category) => (
                <NavLink
                  key={category.name}
                  to={`/user/category/${category.name.toLowerCase()}`}
                  className={({ isActive }) =>
                    `flex items-center px-2.5 py-1 rounded-lg transition-all duration-200 text-xs ${
                      isActive ? `text-white shadow-sm` : `${styles.textMuted} ${styles.hoverBg} ${styles.hoverText}`
                    }`
                  }
                  style={({ isActive }) => getActiveStyle(isActive)}
                >
                  <span className="text-xs mr-2 flex-shrink-0">{category.icon}</span>
                  <span className="font-medium truncate">{category.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </motion.div>

        {/* Navigation Items */}
        {navigationItems.map(({ to, icon: Icon, label }) => (
          <motion.div key={to} className="px-1.5 mb-0.5" variants={itemVariants}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center px-2.5 py-1.5 rounded-lg transition-all duration-200 text-xs group ${
                  isActive ? `text-white shadow-sm` : `${styles.textSecondary} ${styles.hoverBg} ${styles.hoverText}`
                }`
              }
              style={({ isActive }) => getActiveStyle(isActive)}
            >
              <Icon className="w-3.5 h-3.5 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-medium truncate">{label}</span>
            </NavLink>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className={`border-t ${styles.borderColor} mt-auto`} variants={itemVariants}>
        {/* Logout Button */}
        <div className="px-1.5 py-1.5">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center justify-center px-2.5 py-1.5 rounded-lg transition-all duration-200 text-xs ${styles.logoutColor} ${styles.logoutHover} disabled:opacity-50 disabled:cursor-not-allowed group`}
          >
            {isLoggingOut ? (
              <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-current border-t-transparent mr-2"></div>
            ) : (
              <LogOut className="w-3.5 h-3.5 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
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

// Memoize the entire component to prevent unnecessary re-renders
export default UserSidebar
