"use client"

import { useEffect, useState } from "react"

const AdminNavbar = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
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
    <nav className="bg-white shadow-sm py-4 px-6 flex items-center cursor-default border-b">
      <style dangerouslySetInnerHTML={{ __html: ticketSpinStyles }} />

      {/* Logo Section */}
      <div
        className={`transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-bold relative group cursor-pointer flex items-center">
          <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            Pass
          </span>
          {/* Spinning Ticket Logo */}
          <svg
            className="w-6 h-6 md:w-7 md:h-7 mx-1 text-purple-600 ticket-spin-animation"
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

      {/* Admin Badge */}
      <div className="ml-4">
        <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Admin Panel</span>
      </div>
    </nav>
  )
}

export default AdminNavbar