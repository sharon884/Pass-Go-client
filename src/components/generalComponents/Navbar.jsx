"use client"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../services/user/userAuthServices"
import { logOut } from "../../features/auth/authSlice"

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
      style={{ backgroundImage: "linear-gradient(to right, #7454FD, #00BFFF)" }}
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

const Navbar = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  const role = localStorage.getItem("role")

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Add animation styles for the ticket spinner (from your reference)
  const ticketSpinStyles = `
    @keyframes ticketSpin {
      0%   { transform: translateY(-20px) rotate(0deg)   scale(0.5); opacity: 0; }
      25%  { transform: translateY(-10px) rotate(90deg)  scale(0.7); opacity: 0.5; }
      50%  { transform: translateY(0px)  rotate(180deg) scale(1);   opacity: 1; }
      75%  { transform: translateY(2px)  rotate(270deg) scale(1.1); opacity: 1; }
      100% { transform: translateY(0px)  rotate(360deg) scale(1);   opacity: 1; }
    }
    .ticket-spin-animation { animation: ticketSpin 2s ease-in-out infinite; }
  `

  // Logout handler (same behavior as in UserSidebar)
  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await logoutUser()
    } catch (_err) {
      // proceed with local cleanup even if API fails
    } finally {
      localStorage.clear()
      dispatch(logOut())
      setMenuOpen(false)
      // navigate("/login")
      setIsLoggingOut(false)
    }
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-lg shadow-lg py-3" : "bg-gradient-to-r from-white to-[#FAFAFA] py-4"
      }`}
    >
      {/* Inject spinner keyframes */}
      <style dangerouslySetInnerHTML={{ __html: ticketSpinStyles }} />

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand: Pass [spinning ticket] Go */}
        <Link to="/" className="flex items-center group">
          <h2 className="text-xl md:text-2xl font-bold relative flex items-center">
            <span className="bg-gradient-to-r from-[#7454FD] to-[#00BFFF] bg-clip-text text-transparent">Pass</span>
            <svg
              className="w-5 h-5 md:w-6 md:h-6 mx-1 text-[#7454FD] ticket-spin-animation"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
            <span className="bg-gradient-to-r from-[#7454FD] to-[#00BFFF] bg-clip-text text-transparent">Go</span>
          </h2>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700 transition-colors"
          style={{ color: scrolled ? "#7454FD" : "#374151" }}
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={(e) => (e.target.style.color = "#7454FD")}
          onMouseLeave={(e) => (e.target.style.color = scrolled ? "#7454FD" : "#374151")}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          <NavLink to="/welcome">Home</NavLink>
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
                  style={{ borderColor: "#7454FD", color: "#7454FD" }}
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
                  style={{ backgroundImage: "linear-gradient(to right, #7454FD, #00BFFF)" }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundImage = "linear-gradient(to right, #6366f1, #0ea5e9)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundImage = "linear-gradient(to right, #7454FD, #00BFFF)"
                  }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-50 transition-colors font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center"
              >
                {isLoggingOut && (
                  <span className="mr-2 inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                )}
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">{/* Add ThemeToggle or extras if needed */}</div>
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
                    style={{ borderColor: "#7454FD", color: "#7454FD" }}
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
                    style={{ backgroundImage: "linear-gradient(to right, #7454FD, #00BFFF)" }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundImage = "linear-gradient(to right, #6366f1, #0ea5e9)"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundImage = "linear-gradient(to right, #7454FD, #00BFFF)"
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full px-4 py-3 rounded-lg border border-red-400 text-red-500 hover:bg-red-50 transition-colors font-medium inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoggingOut && (
                    <span className="mr-2 inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  )}
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
