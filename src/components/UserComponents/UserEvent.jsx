"use client"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchApproveEvents } from "../../services/user/userEventServices"
import { useTheme } from "../../contexts/ThemeContext"

const UserEvents = () => {
  const [events, setEvents] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState({})
  const [hoveredCard, setHoveredCard] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [eventType, setEventType] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const { theme, currentTheme } = useTheme()

  const fetchEvents = async (page = 1) => {
    try {
      const data = await fetchApproveEvents(page, 8, eventType, sortBy)
      setEvents(data.events)
      setTotalPages(data.totalPages)
      setPage(data.page)
      const initialImageIndices = {}
      data.events.forEach((event) => {
        initialImageIndices[event._id] = 0
      })
      setCurrentImageIndex(initialImageIndices)
    } catch (error) {
      console.log("events fetching error", error)
    }
  }

  useEffect(() => {
    fetchEvents(page)
  }, [page, eventType, sortBy])

  // Hover-based carousel animation
  useEffect(() => {
    let interval
    if (hoveredCard) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndices) => {
          const event = events.find((e) => e._id === hoveredCard)
          if (event && event.images && event.images.length > 1) {
            return {
              ...prevIndices,
              [hoveredCard]: (prevIndices[hoveredCard] + 1) % event.images.length,
            }
          }
          return prevIndices
        })
      }, 2000) // Slower for manual scroll effect
    }
    return () => clearInterval(interval)
  }, [hoveredCard, events])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Get previous and next images for side display
  const getSideImages = (eventId, images) => {
    if (!images || images.length <= 1) return { prev: null, next: null }
    const currentIndex = currentImageIndex[eventId] || 0
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    return {
      prev: images[prevIndex],
      next: images[nextIndex],
    }
  }

  // Theme-aware styles
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        containerBg: "bg-white",
        cardBg: "bg-white",
        cardBorder: "border-purple-100/50",
        cardShadow: "shadow-sm hover:shadow-xl",
        textPrimary: "text-gray-800",
        textSecondary: "text-gray-600",
        textMuted: "text-gray-500",
        categoryBg: "linear-gradient(to right, #7c3aed, #2563eb)",
        buttonBg: "linear-gradient(to right, #7c3aed, #2563eb)",
        buttonHover: "linear-gradient(to right, #6d28d9, #1d4ed8)",
        paginationBg: "bg-white border-purple-100",
        paginationText: "text-gray-700",
        paginationAccent: "#7c3aed",
        paginationSecondary: "#2563eb",
        filterBg: "bg-white",
        filterBorder: "border-purple-100",
        filterText: "text-gray-700",
        filterFocus: "focus:border-purple-500 focus:ring-purple-500",
      }
    } else {
      return {
        containerBg: "bg-gradient-to-br from-gray-900 to-gray-800",
        cardBg: "bg-gray-800/50 backdrop-blur-sm",
        cardBorder: "border-gray-700/50",
        cardShadow: "shadow-lg hover:shadow-2xl",
        textPrimary: "text-white",
        textSecondary: "text-gray-200",
        textMuted: "text-gray-400",
        categoryBg: theme.colors.primaryAccent,
        buttonBg: theme.colors.primaryAccent,
        buttonHover: theme.colors.secondaryAccent,
        paginationBg: "bg-gray-800/50 border-gray-700",
        paginationText: "text-gray-200",
        paginationAccent: theme.colors.particle1,
        paginationSecondary: theme.colors.particle2,
        filterBg: "bg-gray-800/50 backdrop-blur-sm",
        filterBorder: "border-gray-700",
        filterText: "text-gray-200",
        filterFocus: "focus:border-purple-400 focus:ring-purple-400",
      }
    }
  }

  const styles = getThemeStyles()

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 md:p-8 ${styles.containerBg}`}
      style={{
        background: currentTheme === "classic" ? "#ffffff" : theme.colors.primaryBg,
      }}
    >
      {/* Filter and Sort Controls */}
      <div className="max-w-8xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Event Type Filter */}
            <div className="flex flex-col gap-2">
              <label className={`text-sm font-medium ${styles.textSecondary}`}>Filter by Type</label>
              <select
                value={eventType}
                onChange={(e) => {
                  setEventType(e.target.value)
                  setPage(1) // Reset to first page when filter changes
                }}
                className={`px-4 py-2 rounded-lg border ${styles.filterBorder} ${styles.filterBg} ${styles.filterText} ${styles.filterFocus} focus:outline-none focus:ring-2 transition-all duration-300 min-w-[180px]`}
              >
                <option value="all">🎫 All Events</option>
                <option value="free">🆓 Free Events</option>
                <option value="paid_stage_with_seats">🎭 Reserved Seating</option>
                <option value="paid_stage_without_seats">💰 General Admission</option>
              </select>
            </div>

            {/* Sort By Filter */}
            <div className="flex flex-col gap-2">
              <label className={`text-sm font-medium ${styles.textSecondary}`}>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setPage(1) // Reset to first page when sort changes
                }}
                className={`px-4 py-2 rounded-lg border ${styles.filterBorder} ${styles.filterBg} ${styles.filterText} ${styles.filterFocus} focus:outline-none focus:ring-2 transition-all duration-300 min-w-[180px]`}
              >
                <option value="latest">🕒 Latest First</option>
                <option value="upcoming">📅 Upcoming Events</option>
                <option value="price_low">💲 Price: Low to High</option>
                <option value="price_high">💰 Price: High to Low</option>
                <option value="most_selling">🔥 Most Popular</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className={`text-sm ${styles.textMuted} flex items-center gap-2`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>
              Showing {events.length} of {totalPages * 8} events
            </span>
          </div>
        </div>
      </div>

      {/* Fixed 4 Cards Per Row Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-8xl mx-auto">
        {events.map((event, index) => {
          const sideImages = getSideImages(event._id, event.images)
          return (
            <Link
              to={`/your-event/${event._id}`}
              key={event._id}
              className="block group"
              onMouseEnter={() => setHoveredCard(event._id)}
              onMouseLeave={() => {
                setHoveredCard(null)
                setCurrentImageIndex((prev) => ({ ...prev, [event._id]: 0 }))
              }}
            >
              <div
                className={`${styles.cardBg} rounded-xl sm:rounded-2xl overflow-visible transition-all duration-700 border ${styles.cardBorder} ${styles.cardShadow} group-hover:scale-110 transform-gpu relative`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                  zIndex: hoveredCard === event._id ? 100 : 1,
                  position: "relative",
                  width: "100%",
                  maxWidth: "350px", // Increased card width
                  margin: "0 auto",
                }}
              >
                {/* Enhanced Image Container with Side Images */}
                <div className="relative h-40 sm:h-44 md:h-48 lg:h-52 overflow-visible group-hover:z-50">
                  {/* Main Center Image */}
                  <div className="relative w-full h-full">
                    {event.images &&
                      event.images.map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={image || "/placeholder.svg"}
                          alt={event.title}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 transform-gpu rounded-t-xl sm:rounded-t-2xl ${
                            imgIndex === currentImageIndex[event._id] ? "opacity-100 scale-100" : "opacity-0 scale-95"
                          } ${
                            hoveredCard === event._id
                              ? "scale-125 shadow-2xl z-50 brightness-110 contrast-110"
                              : "scale-100"
                          }`}
                          style={{
                            transformOrigin: "center center",
                            zIndex: hoveredCard === event._id ? 50 : 1,
                          }}
                        />
                      ))}
                  </div>
                  {/* Side Images - Manual Scroll Effect */}
                  {hoveredCard === event._id && event.images && event.images.length > 1 && (
                    <>
                      {/* Left Side Image */}
                      {sideImages.prev && (
                        <div className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 w-16 h-20 sm:w-20 sm:h-24 z-40 opacity-70 hover:opacity-90 transition-all duration-500">
                          <img
                            src={sideImages.prev || "/placeholder.svg"}
                            alt="Previous"
                            className="w-full h-full object-cover rounded-lg shadow-lg transform rotate-[-5deg] hover:rotate-[-2deg] transition-transform duration-300"
                            style={{
                              filter: "brightness(0.8) contrast(1.1)",
                            }}
                          />
                        </div>
                      )}
                      {/* Right Side Image */}
                      {sideImages.next && (
                        <div className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 w-16 h-20 sm:w-20 sm:h-24 z-40 opacity-70 hover:opacity-90 transition-all duration-500">
                          <img
                            src={sideImages.next || "/placeholder.svg"}
                            alt="Next"
                            className="w-full h-full object-cover rounded-lg shadow-lg transform rotate-[5deg] hover:rotate-[2deg] transition-transform duration-300"
                            style={{
                              filter: "brightness(0.8) contrast(1.1)",
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
                  {/* Enhanced Manual Scroll Indicators */}
                  {hoveredCard === event._id && event.images && event.images.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-60">
                      {event.images.map((_, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`h-2 rounded-full transition-all duration-700 transform ${
                            imgIndex === currentImageIndex[event._id]
                              ? "w-8 bg-white shadow-xl scale-125 animate-pulse"
                              : "w-2 bg-white/60 scale-100 hover:bg-white/80"
                          }`}
                          style={{
                            background:
                              imgIndex === currentImageIndex[event._id]
                                ? "linear-gradient(90deg, #ffffff, #f8f9fa, #ffffff)"
                                : undefined,
                            boxShadow:
                              imgIndex === currentImageIndex[event._id]
                                ? "0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.5)"
                                : "none",
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {/* Aligned Badges Container */}
                  <div className="absolute top-3 left-3 right-3 flex flex-col gap-2 z-30">
                    {/* Category Badge */}
                    <div className="flex justify-start">
                      <span
                        className="text-white text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm"
                        style={{ background: styles.categoryBg }}
                      >
                        🎫 {event.category}
                      </span>
                    </div>
                    {/* Event Type Badge */}
                    <div className="flex justify-start">
                      <span
                        className="text-white text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm"
                        style={{
                          background:
                            event.eventType === "free"
                              ? "linear-gradient(to right, #10b981, #059669)"
                              : "linear-gradient(to right, #f59e0b, #d97706)",
                        }}
                      >
                        {event.eventType === "free" ? "🆓 Free" : "💰 Paid"}
                      </span>
                    </div>
                    {/* Reserved Seating Badge */}
                    {event.eventType === "paid_stage_with_seats" && (
                      <div className="flex justify-start">
                        <span className="text-white text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm bg-purple-600/80">
                          🎭 Reserved
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Enhanced Content Section */}
                <div className="p-4 sm:p-5">
                  <h2
                    className={`text-base sm:text-lg md:text-xl font-semibold mb-3 line-clamp-2 ${styles.textPrimary} group-hover:text-purple-600 transition-colors duration-300`}
                  >
                    {event.title}
                  </h2>
                  <div className={`flex items-center mb-4 ${styles.textMuted}`}>
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm font-medium">{formatDate(event.date)}</p>
                  </div>
                  {/* Enhanced Button */}
                  <button
                    className="w-full text-white font-semibold py-3 px-4 rounded-xl transition-all duration-400 text-sm hover:shadow-xl transform hover:scale-[1.03] active:scale-95 relative overflow-hidden"
                    style={{ background: styles.buttonBg }}
                    onMouseEnter={(e) => {
                      e.target.style.background = styles.buttonHover
                      e.target.style.transform = "scale(1.03) translateY(-1px)"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = styles.buttonBg
                      e.target.style.transform = "scale(1) translateY(0px)"
                    }}
                  >
                    <span className="relative z-10">View Details</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
                {/* Enhanced Hover Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-700 rounded-xl sm:rounded-2xl ${
                    hoveredCard === event._id ? "opacity-30" : "opacity-0"
                  }`}
                  style={{
                    background:
                      currentTheme === "classic"
                        ? "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, transparent 50%, rgba(37,99,235,0.15) 100%)"
                        : `linear-gradient(135deg, ${theme.colors.glowColor} 0%, transparent 50%, ${theme.colors.glowColor} 100%)`,
                    zIndex: 10,
                  }}
                />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Enhanced Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 sm:mt-16">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-6 sm:px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "text-white hover:shadow-xl transform hover:scale-105 active:scale-95"
          }`}
          style={{
            background: page === 1 ? undefined : styles.buttonBg,
          }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <div className={`px-6 py-3 rounded-full border shadow-lg ${styles.paginationBg}`}>
          <span className={`text-sm font-semibold ${styles.paginationText}`}>
            Page <span style={{ color: styles.paginationAccent }}>{page}</span> of{" "}
            <span style={{ color: styles.paginationSecondary }}>{totalPages}</span>
          </span>
        </div>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-6 sm:px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center ${
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "text-white hover:shadow-xl transform hover:scale-105 active:scale-95"
          }`}
          style={{
            background: page === totalPages ? undefined : styles.buttonBg,
          }}
        >
          Next
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Enhanced Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes manualScroll {
          0% {
            transform: translateX(-10px) scale(0.9);
            opacity: 0.6;
          }
          50% {
            transform: translateX(0px) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateX(10px) scale(0.9);
            opacity: 0.6;
          }
        }
        /* Manual scroll effect for side images */
        .group:hover .absolute.left-\[-30px\],
        .group:hover .absolute.right-\[-30px\] {
          animation: manualScroll 3s ease-in-out infinite;
        }
        /* Enhanced center image scaling */
        .group:hover img {
          transform-origin: center center;
          transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .group:active {
            transform: scale(0.95);
            transition: transform 0.2s ease;
          }
        }
        /* Desktop hover enhancements */
        @media (min-width: 1024px) {
          .group:hover {
            z-index: 200;
            position: relative;
          }
                    
          .group:hover .absolute.left-\[-30px\],
          .group:hover .absolute.right-\[-30px\] {
            animation-duration: 4s;
          }
        }
      `}</style>
    </div>
  )
}

export default UserEvents
