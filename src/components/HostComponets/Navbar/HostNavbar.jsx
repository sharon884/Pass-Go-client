"use client"
import { useEffect, useState } from "react"
import { getDetailsForSidebar } from "../../../services/host/hostProfileServices"
import { useNavigate } from "react-router-dom"
import NotificationBell from "../../Notifications/NotificationBell"

const HostNavbar = () => {
  const [host, setHost] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
    ;(async () => {
      try {
        const data = await getDetailsForSidebar()
        setHost(data)
        console.log(host)
      } catch (error) {
        console.log("Error loading host info:", error)
      }
    })()
  }, [])

  // Add animation styles for the ticket
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

  return (
    <nav className="bg-white shadow-sm py-3 px-4 md:px-6 flex items-center justify-between cursor-default">
      <style dangerouslySetInnerHTML={{ __html: ticketSpinStyles }} />

      {/* Logo Section */}
      <div
        className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <h2 className="text-xl md:text-2xl font-bold relative group cursor-pointer flex items-center">
          <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            Pass
          </span>
          {/* Spinning Ticket Logo */}
          <svg
            className="w-5 h-5 md:w-6 md:h-6 mx-1 text-purple-600 ticket-spin-animation"
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
          <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            Go
          </span>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-700"></div>
        </h2>
      </div>

      {/* Host Dashboard Text - Center */}
      <div className="flex-1 flex justify-center">
        <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Host Dashboard
        </h3>
      </div>

      {/* Right Side Items */}
      <div className="flex items-center space-x-4">
        <NotificationBell />

        {/* Host Profile - Enhanced with better fallback */}
        {host && host.profile_image ? (
          <img
            src={host.profile_image || "/placeholder.svg"}
            alt="host"
            className="h-9 w-9 rounded-full object-cover border-2 border-purple-200 cursor-pointer hover:border-purple-500 transition-all"
            onClick={() => navigate("/host/profile")}
            onError={(e) => {
              e.target.style.display = "none"
              e.target.nextSibling.style.display = "flex"
            }}
          />
        ) : null}

        {/* Default Avatar - Always rendered but hidden when profile image exists */}
        <div
          className={`h-9 w-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium cursor-pointer hover:shadow-md transition-all ${
            host && host.profile_image ? "hidden" : "flex"
          }`}
          onClick={() => navigate("/host/profile")}
        >
          {host && host.name ? host.name.charAt(0).toUpperCase() : "H"}
        </div>
      </div>
    </nav>
  )
}

export default HostNavbar
