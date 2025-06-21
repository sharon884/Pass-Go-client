"use client"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { getDetailsForSidebar } from "../../../services/host/hostProfileServices"
import { logoutHost } from "../../../services/host/hostAuthServices"
import { Home, User, LogOut, Plus, Calendar, DollarSign, Bell, Wallet, FileText, UserCircle } from "lucide-react"

const hostSidebarItems = [
  { name: "Profile", path: "/host/profile", icon: UserCircle },
  { name: "Home", path: "/host-home-page", icon: Home },
  { name: "Add Event", path: "/host/add-event", icon: Plus },
  { name: "Manage Events", path: "/host/events", icon: Calendar },
  { name: "Earnings and Payout", path: "/host/earnings", icon: DollarSign },
  { name: "Notifications", path: "/host/notifications", icon: Bell },
  { name: "Wallet", path: "/host/wallet", icon: Wallet },
  { name: "Terms and Conditions", path: "/host/terms", icon: FileText },
]

const HostSidebar = () => {
  const [host, setHost] = useState(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hostData = await getDetailsForSidebar()
        setHost(hostData);
      } catch (error) {
        console.log("Error loading sidebar data:", error)
      }
    }

    fetchData()
  },[])

 

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      await logoutHost()
      // Clear any local storage or session data if needed
      localStorage.clear()
      // Navigate to landing page
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error)
      // Still navigate to landing page even if logout API fails
      localStorage.clear()
      navigate("/")
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="bg-white h-screen w-64 shadow-lg border-r border-gray-100 flex flex-col">
      {/* Host Profile Section */}
      <div className="p-6 border-b border-gray-100">
        {host ? (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              <img
                src={host.profile_image || "/placeholder.svg"}
                alt="Host"
                className="w-16 h-16 rounded-full object-cover border-3 border-purple-200 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 truncate w-full">{host.name}</h2>
            <p className="text-sm text-gray-500 mt-1">Host Dashboard</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-3 animate-pulse">
              <User className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-500 text-sm">Loading host...</p>
          </div>
        )}
      </div>

      {/* Navigation Section */}
      <div className="flex-1 py-4 overflow-y-auto">
        {/* Host Menu Items */}
        <div className="px-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">Host Menu</h3>
          <ul className="space-y-2">
            {hostSidebarItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Section with Logout */}
      <div className="mt-auto border-t border-gray-100">
        {/* Logout Button */}
        <div className="px-4 pt-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoggingOut ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-600 border-t-transparent mr-3"></div>
            ) : (
              <LogOut className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            )}
            <span className="font-medium">{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>

        {/* Copyright Footer */}
        <div className="p-4 text-center">
          <p className="text-xs text-gray-400">© 2025 PassGo</p>
        </div>
      </div>
    </div>
  )
}

export default HostSidebar
