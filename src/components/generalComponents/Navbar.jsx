"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
// import ThemeToggle from "./ThemeToggle"


const Navbar = () => {
  const isAuthenticated =localStorage.getItem("isAuthenticated")
  const role = localStorage.getItem("role");
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
   
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-lg shadow-lg py-3" : "bg-gradient-to-r from-white to-[#FAFAFA] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo / Brand with Animation */}
        <Link to="/" className="flex items-center group">
          {/* Animated Logo Icon */}
          <div className="relative w-10 h-10 mr-2">
            {/* Outer circle with pulse animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7454FD] to-[#00BFFF] animate-pulse"></div>

            {/* Inner ticket icon */}
            <div className="absolute inset-0.5 rounded-full bg-white flex items-center justify-center">
              <svg
                className="w-5 h-5 animate-bounce"
                style={{ animationDuration: "2s", color: "#7454FD" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 9a3 3 0 1 0 0 6v-6Z" />
                <path d="M22 9a3 3 0 1 1 0 6v-6Z" />
                <rect width="16" height="10" x="4" y="7" rx="2" />
                <path d="M4 11h16" />
              </svg>
            </div>

            {/* Rotating outer ring */}
            <div
              className="absolute inset-[-4px] rounded-full border-2 border-dashed opacity-30 animate-spin"
              style={{ animationDuration: "10s", borderColor: "#7454FD" }}
            ></div>
          </div>

          {/* Brand Name with Animation */}
          <div className="relative">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#7454FD] to-[#00BFFF] bg-clip-text text-transparent">
              Pass
            </span>
            <span className="text-2xl font-bold relative">
              Go
              <span 
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#7454FD] to-[#00BFFF] animate-pulse"
              ></span>
            </span>

            {/* Floating particles */}
            <div
              className="absolute -top-1 -right-2 w-2 h-2 rounded-full animate-ping opacity-70"
              style={{ animationDuration: "1.5s", backgroundColor: "#7454FD" }}
            ></div>
            <div
              className="absolute bottom-0 -left-1 w-1.5 h-1.5 rounded-full bg-[#00BFFF] animate-ping opacity-70"
              style={{ animationDuration: "2s" }}
            ></div>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700 transition-colors"
          style={{ color: scrolled ? "#7454FD" : "#374151" }}
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={(e) => e.target.style.color = "#7454FD"}
          onMouseLeave={(e) => e.target.style.color = scrolled ? "#7454FD" : "#374151"}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <div className={`hidden lg:flex items-center gap-1`}>
          <NavLink to="/welcome-page">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/events">Explore Events</NavLink>

          {/* User Role-based Links */}
          {role === "user" && isAuthenticated && (
            <>
              <NavLink to="/user/profile">Profile</NavLink>
              <NavLink to="/user/tickets">My Tickets</NavLink>
            </>
          )}

          {/* Host Role-based Links */}
          {role === "host" && isAuthenticated && (
            <>
              <NavLink to="/host/dashboard">Dashboard</NavLink>
              <NavLink to="/host/events">My Events</NavLink>
            </>
          )}

          {/* Auth Controls */}
          <div className="ml-4 flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300"
                  style={{ 
                    borderColor: "#7454FD", 
                    color: "#7454FD"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#7454FD0D"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent"
                  }}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r text-white transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm"
                  style={{ 
                    backgroundImage: `linear-gradient(to right, #7454FD, #00BFFF)`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundImage = `linear-gradient(to right, #6366f1, #0ea5e9)`
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundImage = `linear-gradient(to right, #7454FD, #00BFFF)`
                  }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button className="px-4 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-50 transition-colors font-medium text-sm">
                Logout
              </button>
            )}
          </div>
          <div className="flex items-center space-x-4">
{/* 
          <ThemeToggle/> */}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-white/95 backdrop-blur-lg z-40 transition-all duration-300 transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } pt-20`}
        >
          <div className="flex flex-col items-center gap-6 p-6">
            <MobileNavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setMenuOpen(false)}>
              About Us
            </MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </MobileNavLink>
            <MobileNavLink to="/events" onClick={() => setMenuOpen(false)}>
              Explore Events
            </MobileNavLink>

            {/* User Role-based Links */}
            {role === "user" && isAuthenticated && (
              <>
                <MobileNavLink to="/user/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </MobileNavLink>
                <MobileNavLink to="/user/tickets" onClick={() => setMenuOpen(false)}>
                  My Tickets
                </MobileNavLink>
              </>
            )}

            {/* Host Role-based Links */}
            {role === "host" && isAuthenticated && (
              <>
                <MobileNavLink to="/host/dashboard" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </MobileNavLink>
                <MobileNavLink to="/host/events" onClick={() => setMenuOpen(false)}>
                  My Events
                </MobileNavLink>
              </>
            )}

            {/* Auth Controls */}
            <div className="flex flex-col w-full gap-3 mt-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full px-4 py-3 rounded-lg border font-medium text-center transition-all duration-300"
                    style={{ 
                      borderColor: "#7454FD", 
                      color: "#7454FD"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#7454FD0D"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent"
                    }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="w-full px-4 py-3 rounded-lg text-white transition-all duration-300 shadow-md hover:shadow-lg font-medium text-center"
                    style={{ 
                      backgroundImage: `linear-gradient(to right, #7454FD, #00BFFF)`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundImage = `linear-gradient(to right, #6366f1, #0ea5e9)`
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundImage = `linear-gradient(to right, #7454FD, #00BFFF)`
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button className="w-full px-4 py-3 rounded-lg border border-red-400 text-red-500 hover:bg-red-50 transition-colors font-medium">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Desktop Navigation Link Component
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative px-4 py-2 text-gray-700 font-medium text-sm transition-colors group"
    onMouseEnter={(e) => {
      e.target.style.color = "#7454FD"
    }}
    onMouseLeave={(e) => {
      e.target.style.color = "#374151"
    }}
  >
    {children}
    <span 
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r group-hover:w-full transition-all duration-300"
      style={{ backgroundImage: `linear-gradient(to right, #7454FD, #00BFFF)` }}
    ></span>
  </Link>
)

// Mobile Navigation Link Component
const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="w-full text-center py-3 text-gray-700 font-medium text-lg border-b border-gray-100 transition-colors"
    onMouseEnter={(e) => {
      e.target.style.color = "#7454FD"
    }}
    onMouseLeave={(e) => {
      e.target.style.color = "#374151"
    }}
  >
    {children}
  </Link>
)

export default Navbar
