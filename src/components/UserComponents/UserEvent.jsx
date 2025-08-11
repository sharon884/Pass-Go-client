"use client"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchApproveEvents } from "../../services/user/userEventServices"
import { useTheme } from "../../contexts/ThemeContext"

const UserEvents = () => {
  const [events, setEvents] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [eventType, setEventType] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const [category, setCategory] = useState("")
  const [userLocation, setUserLocation] = useState(null)
  const [geolocationError, setGeolocationError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState({})

  const { theme, currentTheme } = useTheme()

  // Fetch events
  const fetchEvents = async (
    currentPage = page,
    currentEventType = eventType,
    currentSortBy = sortBy,
    currentCategory = category,
    lat = userLocation?.latitude,
    lng = userLocation?.longitude,
  ) => {
    setLoading(true)
    try {
      const data = await fetchApproveEvents(currentPage, 8, currentEventType, currentSortBy, currentCategory, lat, lng)
      setEvents(Array.isArray(data?.events) ? data.events : [])
      setTotalPages(data?.totalPages || 1)
      setPage(data?.currentPage || 1)
      const initialImageIndices = {}
      if (Array.isArray(data?.events)) {
        data.events.forEach((event) => {
          initialImageIndices[event._id] = 0
        })
      }
      setCurrentImageIndex(initialImageIndices)
    } catch (error) {
      console.log("events fetching error", error)
      setEvents([])
      setTotalPages(1)
      setPage(1)
    } finally {
      setLoading(false)
    }
  }

  // Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          setGeolocationError(null)
        },
        (error) => {
          console.error("Geolocation error:", error)
          setGeolocationError("Unable to retrieve your location. 'Nearest Events' sorting may not be available.")
          setUserLocation(null)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      )
    } else {
      setGeolocationError("Geolocation is not supported by your browser. 'Nearest Events' sorting is unavailable.")
      setUserLocation(null)
    }
  }, [])

  // Refetch on filters/sort/location change
  useEffect(() => {
    fetchEvents(1, eventType, sortBy, category, userLocation?.latitude, userLocation?.longitude)
  }, [eventType, sortBy, category, userLocation])

  // Pagination fetch
  useEffect(() => {
    if (page !== 1) {
      fetchEvents(page, eventType, sortBy, category, userLocation?.latitude, userLocation?.longitude)
    }
  }, [page])

  // Hover image carousel (unchanged)
  useEffect(() => {
    let interval
    if (hoveredCard) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => {
          const event = events.find((e) => e._id === hoveredCard)
          if (event && Array.isArray(event.images) && event.images.length > 1) {
            return {
              ...prev,
              [hoveredCard]: ((prev?.[hoveredCard] || 0) + 1) % event.images.length,
            }
          }
          return prev
        })
      }, 1200)
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

  // Theme styles
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        cardBg: "#ffffff",
        cardBorder: "#e5e7eb",
        textPrimary: "#1f2937",
        textSecondary: "#6b7280",
        badgeFreeColor: "#166534",
        badgeFreeBg: "#dcfce7",
        badgePaidColor: "#92400e",
        badgePaidBg: "#fef3c7",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        accentColor: "#8b5cf6",
        secondaryAccent: "#3b82f6",
      }
    }
    return {
      cardBg: theme?.colors?.cardBg || "#374151",
      cardBorder: "#4b5563",
      textPrimary: "#ffffff",
      textSecondary: "#d1d5db",
      badgeFreeColor: "#ffffff",
      badgeFreeBg: "linear-gradient(45deg, #10b981, #059669)",
      badgePaidColor: "#ffffff",
      badgePaidBg: "linear-gradient(45deg, #f59e0b, #d97706)",
      shadowColor: "rgba(0, 0, 0, 0.3)",
      accentColor: theme?.colors?.primaryAccent || "#8b5cf6",
      secondaryAccent: theme?.colors?.secondaryAccent || "#3b82f6",
    }
  }
  const styles = getThemeStyles()

  const handlePageChange = (newPage) => setPage(newPage)

  function getEventTitle(event) {
    return (
      (event?.title && String(event.title).trim()) ||
      (event?.name && String(event.name).trim()) ||
      (event?.eventName && String(event.eventName).trim()) ||
      "Untitled Event"
    )
  }

  return (
    <div
      className="min-h-screen py-4 px-0"
      style={{ background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.primaryBg || "#111827" }}
    >
      {/* Scale everything to ~75% without altering your animation */}
      <div className="transform origin-top scale-75 md:scale-75">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Event Type */}
              <select
                value={eventType}
                onChange={(e) => {
                  setEventType(e.target.value)
                  setPage(1)
                }}
                className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                style={{
                  background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.inputBg || "#374151",
                  borderColor: currentTheme === "classic" ? "#d1d5db" : "#4b5563",
                  color: styles.textPrimary,
                }}
              >
                <option value="all">🎫 All Events</option>
                <option value="free">🆓 Free Events</option>
                <option value="paid_stage_with_seats">🎭 Reserved Seating</option>
                <option value="paid_stage_without_seats">💰 General Admission</option>
              </select>

              {/* Category */}
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  setPage(1)
                }}
                className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                style={{
                  background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.inputBg || "#374151",
                  borderColor: currentTheme === "classic" ? "#d1d5db" : "#4b5563",
                  color: styles.textPrimary,
                }}
              >
                <option value="">All Categories</option>
                <option value="Music">🎵 Music</option>
                <option value="Art">🎨 Art</option>
                <option value="Fashion">👗 Fashion</option>
                <option value="Motosports">🏎️ Motosports</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setPage(1)
                }}
                className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                style={{
                  background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.inputBg || "#374151",
                  borderColor: currentTheme === "classic" ? "#d1d5db" : "#4b5563",
                  color: styles.textPrimary,
                }}
              >
                <option value="latest">🕒 Latest First</option>
                <option value="upcoming">📅 Upcoming Events</option>
                <option value="price_low">💲 Price: Low to High</option>
                <option value="price_high">💰 Price: High to Low</option>
                <option value="most_selling">🔥 Most Popular</option>
                {userLocation && <option value="nearest">📍 Nearest Events</option>}
              </select>
            </div>

            <div className="text-xs sm:text-sm" style={{ color: styles.textSecondary }}>
              Showing {events.length} of {totalPages * 8} events
            </div>
          </div>
          {geolocationError && sortBy === "nearest" && <p className="mt-2 text-red-500 text-xs">{geolocationError}</p>}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="ml-3 text-base" style={{ color: styles.textSecondary }}>
              Loading events...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-stretch">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div
                  key={event._id}
                  className="magnetic-card-wrapper h-full"
                  onMouseEnter={() => setHoveredCard(event._id)}
                  onMouseLeave={() => {
                    setHoveredCard(null)
                    setCurrentImageIndex((prev) => ({ ...prev, [event._id]: 0 }))
                  }}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Link
                    to={`/your-event/${event._id}`}
                    className="magnetic-card h-full"
                    style={{
                      background: styles.cardBg,
                      borderColor: styles.cardBorder,
                      boxShadow: `0 4px 12px ${styles.shadowColor}`,
                    }}
                    aria-label={`View details for ${getEventTitle(event)}`}
                  >
                    {/* Image stack and indicators (unchanged animation) */}
                    <div className="image-container">
                      <div className="image-stack">
                        {Array.isArray(event.images) && event.images.length > 0 ? (
                          event.images.map((image, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`image-layer ${
                                imgIndex === (currentImageIndex[event._id] || 0) ? "active" : ""
                              }`}
                            >
                              <img
                                src={image || "/placeholder.svg"}
                                alt={getEventTitle(event)}
                                className="event-image"
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                          ))
                        ) : (
                          <div className="placeholder-image">
                            <svg
                              className="w-10 h-10"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              style={{ color: styles.textSecondary }}
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {Array.isArray(event.images) && event.images.length > 1 && (
                        <div className="image-indicators">
                          {event.images.map((_, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`indicator ${
                                imgIndex === (currentImageIndex[event._id] || 0) ? "active" : ""
                              }`}
                              style={{
                                background:
                                  imgIndex === (currentImageIndex[event._id] || 0)
                                    ? styles.accentColor
                                    : `${styles.textSecondary}50`,
                              }}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Content details */}
                    <div className="card-content">
                      <h3 className="card-title" style={{ color: styles.textPrimary }} title={getEventTitle(event)}>
                        {getEventTitle(event)}
                      </h3>

                      <div className="card-meta">
                        <p className="card-date" style={{ color: styles.textSecondary }}>
                          {event?.date ? formatDate(event.date) : "Date TBA"}
                        </p>
                        {event?.locationName && (
                          <p className="card-location text-xs line-ellipsis-1" style={{ color: styles.textSecondary }}>
                            {"📍 "}
                            {event.locationName}
                          </p>
                        )}
                      </div>

                      <span
                        className={`card-badge ${event?.eventType === "free" ? "badge-free" : "badge-paid"} mt-auto`}
                        style={{
                          background: event?.eventType === "free" ? styles.badgeFreeBg : styles.badgePaidBg,
                          color: event?.eventType === "free" ? styles.badgeFreeColor : styles.badgePaidColor,
                        }}
                      >
                        {event?.eventType === "free" ? "Free" : "Paid"}
                      </span>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-base" style={{ color: styles.textSecondary }}>
                  No events found.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-10">
            <button
              onClick={() => handlePageChange(Math.max(page - 1, 1))}
              disabled={page === 1}
              className={`px-5 sm:px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center ${
                page === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "text-white hover:shadow-lg"
              }`}
              style={{
                background:
                  page === 1
                    ? undefined
                    : `linear-gradient(to right, ${styles.accentColor}, ${styles.secondaryAccent})`,
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div
              className="px-5 py-2.5 rounded-full border shadow-md"
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#374151",
                borderColor: currentTheme === "classic" ? "#e5e7eb" : "#4b5563",
              }}
              aria-live="polite"
            >
              <span className="text-xs sm:text-sm font-semibold" style={{ color: styles.textPrimary }}>
                Page <span style={{ color: styles.accentColor }}>{page}</span> of{" "}
                <span style={{ color: styles.secondaryAccent }}>{totalPages}</span>
              </span>
            </div>

            <button
              onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-5 sm:px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center ${
                page === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "text-white hover:shadow-lg"
              }`}
              style={{
                background:
                  page === totalPages
                    ? undefined
                    : `linear-gradient(to right, ${styles.accentColor}, ${styles.secondaryAccent})`,
              }}
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* NOTE: use a plain <style> tag for Vite (not styled-jsx) */}
        <style>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Subtle card reveal */
          .magnetic-card-wrapper {
            animation: cardSlideIn 0.6s ease-out forwards;
            opacity: 0;
            transform: translateY(16px);
          }
          @keyframes cardSlideIn {
            to { opacity: 1; transform: translateY(0); }
          }

          /* Card: consistent size; use content flow for details */
          .magnetic-card {
            position: relative;
            display: flex;             /* was block */
            flex-direction: column;    /* new: let image + content stack */
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            height: 330px;             /* was 300px */
            width: 100%;
            margin: 0;
          }
          .magnetic-card:hover { transform: translateY(-6px); }

          /* Image (unchanged animation, slight height tweak) */
          .image-container {
            position: relative;
            height: 190px;             /* was 165px */
            overflow: hidden;
          }
          .image-stack { position: relative; width: 100%; height: 100%; }
          .image-layer {
            position: absolute; inset: 0;
            opacity: 0; transform: scale(1.1) rotate(2deg);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .image-layer.active { opacity: 1; transform: scale(1) rotate(0deg); }
          .event-image { width: 100%; height: 100%; object-fit: cover; transition: all 0.6s ease; }

          /* Indicators */
          .image-indicators {
            position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
            display: flex; gap: 6px; z-index: 10;
          }
          .indicator { width: 8px; height: 8px; border-radius: 50%; transition: all 0.3s ease; }
          .indicator.active { transform: scale(1.3); box-shadow: 0 0 10px currentColor; }

          /* Content layout to avoid hiding location and align badge */
          .card-content {
            padding: 14px;
            height: calc(330px - 190px);  /* was calc(300px - 165px) */
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .card-title {
            font-size: 16px;
            font-weight: 600;
            line-height: 1.35;
            margin-bottom: 2px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            min-height: 48px;           /* was 44px */
          }
          .card-meta {
            display: flex;
            flex-direction: column;
            gap: 4px;
            min-height: 40px;           /* was 36px */
          }

          /* Badge stays pinned to bottom */
          .card-badge {
            display: inline-block;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 500;
            border-radius: 20px;
            align-self: flex-start;
            margin-top: auto;           /* keeps badge at bottom */
          }

          /* Single-line ellipsis for location */
          .line-ellipsis-1 { 
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis; 
          }

          /* Subtle reveal for each card (unchanged) */
          .magnetic-card-wrapper {
            animation: cardSlideIn 0.6s ease-out forwards;
            opacity: 0; transform: translateY(16px);
          }
          @keyframes cardSlideIn { to { opacity: 1; transform: translateY(0); } }

          /* Mobile tweaks: scale proportionally */
          @media (max-width: 768px) {
            .magnetic-card { height: 300px; }             /* was 280px */
            .image-container { height: 165px; }           /* was 145px */
            .card-content { height: calc(300px - 165px); padding: 12px; }
          }
        `}</style>
      </div>
    </div>
  )
}

export default UserEvents
