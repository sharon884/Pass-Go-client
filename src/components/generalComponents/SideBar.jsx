"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOut } from "../../features/auth/authSlice"
import api from "../../utils/api/api"
import { motion } from "framer-motion"
import defaultProfile from "../../../public/default.jpeg"

const SideBar = () => {
  const { id, name, profile_img, role } = useSelector((state) => state.auth.user)
  const [activeItem, setActiveItem] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const menuItems = {
    host: [
      "Profile",
      "Business Info",
      "Add event",
      "Manage Events",
      "Earnings & payout page",
      "Notifications",
      "Wallet",
      "Terms & Conditions",
    ],
    user: ["Home", "Events", "Profile", "Wallet", "Help Center"],
    admin: ["Dashboard", "User Management", "Host Management", "Approve Events", "Reports", "Settings"],
  }

  const sidebarItems = menuItems[role] || []

  // Handle menu item clicks with navigation
  const handleMenuClick = (item, index) => {
    setActiveItem(index)

    // Navigation logic based on role and menu item
    if (role === "admin") {
      switch (item) {
        case "Dashboard":
          navigate("/admin/dashboard")
          break
        case "User Management":
          navigate("/admin/users")
          break
        case "Host Management":
          navigate("/admin/hosts")
          break
        case "Approve Events":
          navigate("/admin/events/approval")
          break
        case "Reports":
          navigate("/admin/reports")
          break
        case "Settings":
          navigate("/admin/settings")
          break
        default:
          break
      }
    } else if (role === "host") {
      switch (item) {
        case "Profile":
          navigate("/host/profile")
          break
        case "Business Info":
          navigate("/host/business")
          break
        case "Add event":
          navigate("/host/events/add")
          break
        case "Manage Events":
          navigate("/host/events/manage")
          break
        case "Earnings & payout page":
          navigate("/host/earnings")
          break
        case "Notifications":
          navigate("/host/notifications")
          break
        case "Wallet":
          navigate("/host/wallet")
          break
        case "Terms & Conditions":
          navigate("/host/terms")
          break
        default:
          break
      }
    } else if (role === "user") {
      switch (item) {
        case "Home":
          navigate("/user/home")
          break
        case "Events":
          navigate("/user/events")
          break
        case "Profile":
          navigate("/user/profile")
          break
        case "Wallet":
          navigate("/user/wallet")
          break
        case "Help Center":
          navigate("/user/help")
          break
        default:
          break
      }
    }
  }

  const handleLogout = async () => {
    let logoutEndpoint = ""
    if (role === "user") {
      logoutEndpoint = "/user/auth/logoutUser"
    } else if (role === "host") {
      logoutEndpoint = "/host/auth/logoutHost"
    } else if (role === "admin") {
      logoutEndpoint = "/admin/auth/logoutAdmin"
    }

    try {
      await api.post(logoutEndpoint, { id })
      localStorage.removeItem("isAuthenticated");
     localStorage.removeItem("role");
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      dispatch(logOut())
      localStorage.clear()
      navigate("/login")
    }
  }
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

  const avatarVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  }

  const nameVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
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

  return (
    <motion.div
      className="h-screen bg-white border-r border-blue-100 shadow-sm flex flex-col w-64 overflow-y-auto"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Section - Avatar and Name */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <motion.div
          className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm mb-3"
          variants={avatarVariants}
        >
          {/* Profile Image */}
          {/* If profile_img exists, use it; otherwise, fallback to the imported default image */}
          <img
            src={profile_img || defaultProfile} // Use the default profile image
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.h2 className="text-base font-medium text-gray-800" variants={nameVariants}>
          {name || "John Doe"} {/* Use name from Redux or fallback to "John Doe" */}
        </motion.h2>
      </div>

      {/* Menu Section */}
      <motion.div className="flex-1 px-4 py-2" variants={containerVariants} initial="hidden" animate="visible">
        {sidebarItems.map((item, index) => (
          <motion.button
            key={item}
            className={`w-full text-center py-2 px-3 mb-2 rounded-md transition-all duration-300 ${
              activeItem === index
                ? "bg-purple-600 text-white font-medium"
                : "bg-gray-100 text-gray-700 hover:bg-purple-100"
            }`}
            onClick={() => handleMenuClick(item, index)}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {item}
          </motion.button>
        ))}
      </motion.div>

      {/* Logout Button */}
      <div className="px-4 py-4">
        <motion.button
          onClick={handleLogout}
          className="w-full text-center py-2 px-3 rounded-md text-red-500 hover:bg-red-50 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Logout
        </motion.button>
      </div>
    </motion.div>
  )
}

export default SideBar