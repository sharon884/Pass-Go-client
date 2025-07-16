"use client"

import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom" // Import Link
import { searchEvents } from "../../../services/user/userEventServices"
import { useTheme } from "../../../contexts/ThemeContext"

const SearchResultsPage = () => {
  const [params] = useSearchParams()
  const query = params.get("query")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState({})
  const [animationType, setAnimationType] = useState("magnetic") // Toggle between animations
  const { theme, currentTheme } = useTheme()

  // Theme-based styles (copied from UserEvents for consistency)
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
        inputBg: "#ffffff", // Added for select inputs
        inputBorder: "#d1d5db", // Added for select inputs
      }
    } else {
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
        inputBg: theme?.colors?.inputBg || "#374151", // Added for select inputs
        inputBorder: theme?.colors?.inputBorder || "#4b5563", // Added for select inputs
      }
    }
  }
  const styles = getThemeStyles()

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      setResults([]) // Clear previous results
      if (query) {
        try {
          const data = await searchEvents(query, 1, 12) // Assuming page 1, limit 12 for grid
          if (data.success) {
            setResults(data.events || [])
            // Initialize image indices for new results
            const initialImageIndices = {}
            if (data.events) {
              data.events.forEach((event) => {
                initialImageIndices[event._id] = 0
              })
            }
            setCurrentImageIndex(initialImageIndices)
          } else {
            setResults([]) // Ensure results are empty on failure
          }
        } catch (error) {
          console.error("Failed to fetch search results:", error)
          setResults([])
        }
      }
      setLoading(false)
    }
    fetchResults()
  }, [query])

  // Image carousel animation on hover (copied from UserEvents)
  useEffect(() => {
    let interval
    if (hoveredCard) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndices) => {
          const event = results.find((e) => e._id === hoveredCard)
          if (event && event.images && event.images.length > 1) {
            return {
              ...prevIndices,
              [hoveredCard]: (prevIndices[hoveredCard] + 1) % event.images.length,
            }
          }
          return prevIndices
        })
      }, 1200)
    }
    return () => clearInterval(interval)
  }, [hoveredCard, results]) // Depend on results to ensure correct event data

  // Function to format date (copied from EventDetails for consistency)
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{ background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.primaryBg || "#111827" }}
    >
      {/* Animation Toggle Button */}
      <div className="mb-4 flex justify-center">
        <button
          onClick={() => setAnimationType(animationType === "magnetic" ? "crystal" : "magnetic")}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Switch to {animationType === "magnetic" ? "Crystal Prism" : "Magnetic Levitation"} Animation
        </button>
      </div>

      <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${styles.textPrimary} text-center`}>
        Search Results for "{query}"
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className={`animate-pulse ${styles.loadingColor} text-xl font-semibold`}>Loading search results...</div>
        </div>
      ) : results.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className={`text-xl ${styles.textSecondary}`}>No events found for "{query}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((event, index) => (
            <div
              key={event._id}
              className={`${animationType}-card-wrapper`}
              onMouseEnter={() => setHoveredCard(event._id)}
              onMouseLeave={() => {
                setHoveredCard(null)
                setCurrentImageIndex((prev) => ({ ...prev, [event._id]: 0 }))
              }}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <Link
                to={`/your-event/${event._id}\`} {/* Corrected navigation path */}
                className={\`${animationType}-card ${hoveredCard === event._id ? "activated" : ""}`}
                style={{
                  background: styles.cardBg,
                  borderColor: styles.cardBorder,
                  boxShadow: `0 4px 15px ${styles.shadowColor}`, // Apply shadow based on theme
                }}
              >
                {/* Animation Effects */}
                {animationType === "magnetic" ? (
                  <>
                    {/* Magnetic Field Effect */}
                    <div className="magnetic-field">
                      <div className="field-line field-line-1"></div>
                      <div className="field-line field-line-2"></div>
                      <div className="field-line field-line-3"></div>
                      <div className="field-line field-line-4"></div>
                    </div>
                    {/* Floating Orbs */}
                    <div className="floating-orbs">
                      <div
                        className="orb orb-1"
                        style={{
                          background: `radial-gradient(circle, ${styles.accentColor}, ${styles.secondaryAccent})`,
                        }}
                      ></div>
                      <div
                        className="orb orb-2"
                        style={{
                          background: `radial-gradient(circle, ${styles.accentColor}, ${styles.secondaryAccent})`,
                        }}
                      ></div>
                      <div
                        className="orb orb-3"
                        style={{
                          background: `radial-gradient(circle, ${styles.accentColor}, ${styles.secondaryAccent})`,
                        }}
                      ></div>
                    </div>
                    {/* Liquid Ripple Effect */}
                    <div className="liquid-ripple">
                      <div className="ripple ripple-1" style={{ borderColor: `${styles.accentColor}66` }}></div>
                      <div className="ripple ripple-2" style={{ borderColor: `${styles.accentColor}66` }}></div>
                      <div className="ripple ripple-3" style={{ borderColor: `${styles.accentColor}66` }}></div>
                    </div>
                    {/* Levitation Shadow */}
                    <div
                      className="levitation-shadow"
                      style={{ background: `radial-gradient(ellipse, ${styles.accentColor}33, transparent)` }}
                    ></div>
                  </>
                ) : (
                  <>
                    {/* Crystal Prism Effects */}
                    <div className="crystal-facets">
                      <div
                        className="facet facet-1"
                        style={{ background: `linear-gradient(45deg, ${styles.accentColor}20, transparent)` }}
                      ></div>
                      <div
                        className="facet facet-2"
                        style={{ background: `linear-gradient(135deg, ${styles.secondaryAccent}20, transparent)` }}
                      ></div>
                      <div
                        className="facet facet-3"
                        style={{ background: `linear-gradient(225deg, ${styles.accentColor}15, transparent)` }}
                      ></div>
                      <div
                        className="facet facet-4"
                        style={{ background: `linear-gradient(315deg, ${styles.secondaryAccent}15, transparent)` }}
                      ></div>
                    </div>
                    {/* Light Refraction */}
                    <div className="light-refraction">
                      <div
                        className="light-beam beam-1"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${styles.accentColor}40, transparent)`,
                        }}
                      ></div>
                      <div
                        className="light-beam beam-2"
                        style={{
                          background: `linear-gradient(45deg, transparent, ${styles.secondaryAccent}40, transparent)`,
                        }}
                      ></div>
                      <div
                        className="light-beam beam-3"
                        style={{
                          background: `linear-gradient(135deg, transparent, ${styles.accentColor}30, transparent)`,
                        }}
                      ></div>
                    </div>
                    {/* Crystal Sparkles */}
                    <div className="crystal-sparkles">
                      <div className="sparkle sparkle-1" style={{ background: styles.accentColor }}></div>
                      <div className="sparkle sparkle-2" style={{ background: styles.secondaryAccent }}></div>
                      <div className="sparkle sparkle-3" style={{ background: styles.accentColor }}></div>
                      <div className="sparkle sparkle-4" style={{ background: styles.secondaryAccent }}></div>
                      <div className="sparkle sparkle-5" style={{ background: styles.accentColor }}></div>
                    </div>
                    {/* Prism Reflection */}
                    <div
                      className="prism-reflection"
                      style={{
                        background: `linear-gradient(45deg, ${styles.accentColor}10, ${styles.secondaryAccent}10, transparent)`,
                      }}
                    ></div>
                  </>
                )}
                {/* Image Container */}
                <div className="image-container">
                  <div className="image-stack">
                    {event.images && event.images.length > 0 ? (
                      event.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`image-layer ${imgIndex === (currentImageIndex[event._id] || 0) ? "active" : ""}`}
                        >
                          <img
                            src={image || "/placeholder.svg?height=160&width=280"}
                            alt={event.title}
                            className="event-image"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="placeholder-image">
                        <svg
                          className="w-12 h-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: styles.textSecondary }}
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
                  {/* Image Progress Indicators */}
                  {event.images && event.images.length > 1 && (
                    <div className="image-indicators">
                      {event.images.map((_, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`indicator ${imgIndex === (currentImageIndex[event._id] || 0) ? "active" : ""}`}
                          style={{
                            background:
                              imgIndex === (currentImageIndex[event._id] || 0)
                                ? styles.accentColor
                                : `${styles.textSecondary}50`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {/* Content Section */}
                <div className="card-content">
                  <h3 className="card-title hover-text" style={{ color: styles.textPrimary }}>
                    {event.title}
                  </h3>
                  <p className="card-date hover-text" style={{ color: styles.textSecondary }}>
                    {formatDate(event.date)}
                  </p>
                  <span
                    className={`card-badge ${event.eventType === "free" ? "badge-free" : "badge-paid"}`}
                    style={{
                      background: event.eventType === "free" ? styles.badgeFreeBg : styles.badgePaidBg,
                      color: event.eventType === "free" ? styles.badgeFreeColor : styles.badgePaidColor,
                    }}
                  >
                    {event.eventType === "free" ? "Free" : "Paid"}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Animation Styles (Copied directly from UserEvents) */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* Common Card Styles */
        .magnetic-card-wrapper,
        .crystal-card-wrapper {
          animation: cardSlideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        @keyframes cardSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .magnetic-card,
        .crystal-card {
          position: relative;
          display: block;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          height: 320px;
          width: 100%;
          max-width: 280px;
          margin: 0 auto;
        }
        /* MAGNETIC LEVITATION ANIMATION */
        .magnetic-card {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .magnetic-card.activated {
          transform: translateY(-15px) scale(1.03);
          box-shadow:
            0 25px 40px rgba(138, 43, 226, 0.2),
            0 15px 25px rgba(30, 144, 255, 0.15),
            0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .magnetic-field {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .magnetic-card.activated .magnetic-field {
          opacity: 1;
        }
        .field-line {
          position: absolute;
          border: 1px solid rgba(138, 43, 226, 0.3);
          border-radius: 50%;
          animation: magneticPulse 2s ease-in-out infinite;
        }
        .field-line-1 {
          top: 10%;
          left: 10%;
          right: 10%;
          bottom: 10%;
          animation-delay: 0s;
        }
        .field-line-2 {
          top: 20%;
          left: 20%;
          right: 20%;
          bottom: 20%;
          animation-delay: 0.5s;
        }
        .field-line-3 {
          top: 30%;
          left: 30%;
          right: 30%;
          bottom: 30%;
          animation-delay: 1s;
        }
        .field-line-4 {
          top: 40%;
          left: 40%;
          right: 40%;
          bottom: 40%;
          animation-delay: 1.5s;
        }
        @keyframes magneticPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
        }
        .floating-orbs {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .magnetic-card.activated .floating-orbs {
          opacity: 1;
        }
        .orb {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          box-shadow: 0 0 15px currentColor;
          animation: orbFloat 3s ease-in-out infinite;
        }
        .orb-1 {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }
        .orb-2 {
          top: 60%;
          right: 20%;
          animation-delay: 1s;
        }
        .orb-3 {
          bottom: 30%;
          left: 25%;
          animation-delay: 2s;
        }
        @keyframes orbFloat {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          33% {
            transform: translateY(-10px) scale(1.2);
          }
          66% {
            transform: translateY(5px) scale(0.8);
          }
        }
        .liquid-ripple {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .magnetic-card.activated .liquid-ripple {
          opacity: 1;
        }
        .ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid;
          border-radius: 50%;
          animation: liquidRipple 2.5s ease-out infinite;
        }
        .ripple-1 {
          animation-delay: 0s;
        }
        .ripple-2 {
          animation-delay: 0.8s;
        }
        .ripple-3 {
          animation-delay: 1.6s;
        }
        @keyframes liquidRipple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          70% {
            width: 200px;
            height: 200px;
            opacity: 0.3;
          }
          100% {
            width: 250px;
            height: 250px;
            opacity: 0;
          }
        }
        .levitation-shadow {
          position: absolute;
          bottom: -20px;
          left: 10%;
          right: 10%;
          height: 20px;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .magnetic-card.activated .levitation-shadow {
          opacity: 1;
          animation: shadowPulse 2s ease-in-out infinite;
        }
        @keyframes shadowPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }
        /* CRYSTAL PRISM ANIMATION */
        .crystal-card {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(5px);
        }
        .crystal-card.activated {
          transform: rotateY(5deg) rotateX(2deg) scale(1.05);
          box-shadow:
            0 20px 40px rgba(138, 43, 226, 0.25),
            0 10px 20px rgba(30, 144, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .crystal-facets {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .crystal-card.activated .crystal-facets {
          opacity: 1;
        }
        .facet {
          position: absolute;
          animation: facetShimmer 3s ease-in-out infinite;
        }
        .facet-1 {
          top: 0;
          left: 0;
          right: 50%;
          bottom: 50%;
          animation-delay: 0s;
        }
        .facet-2 {
          top: 0;
          left: 50%;
          right: 0;
          bottom: 50%;
          animation-delay: 0.7s;
        }
        .facet-3 {
          top: 50%;
          left: 0;
          right: 50%;
          bottom: 0;
          animation-delay: 1.4s;
        }
        .facet-4 {
          top: 50%;
          left: 50%;
          right: 0;
          bottom: 0;
          animation-delay: 2.1s;
        }
        @keyframes facetShimmer {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        .light-refraction {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .crystal-card.activated .light-refraction {
          opacity: 1;
        }
        .light-beam {
          position: absolute;
          height: 2px;
          animation: lightSweep 4s ease-in-out infinite;
        }
        .beam-1 {
          top: 30%;
          left: 0;
          right: 0;
          animation-delay: 0s;
        }
        .beam-2 {
          top: 50%;
          left: 0;
          right: 0;
          transform: rotate(45deg);
          animation-delay: 1.3s;
        }
        .beam-3 {
          top: 70%;
          left: 0;
          right: 0;
          transform: rotate(-45deg);
          animation-delay: 2.6s;
        }
        @keyframes lightSweep {
          0%,
          100% {
            transform: translateX(-100%) scaleX(0);
          }
          50% {
            transform: translateX(100%) scaleX(1);
          }
        }
        .crystal-sparkles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .crystal-card.activated .crystal-sparkles {
          opacity: 1;
        }
        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: sparkleGlow 2s ease-in-out infinite;
        }
        .sparkle-1 {
          top: 15%;
          left: 20%;
          animation-delay: 0s;
        }
        .sparkle-2 {
          top: 25%;
          right: 15%;
          animation-delay: 0.4s;
        }
        .sparkle-3 {
          top: 60%;
          left: 30%;
          animation-delay: 0.8s;
        }
        .sparkle-4 {
          bottom: 25%;
          right: 25%;
          animation-delay: 1.2s;
        }
        .sparkle-5 {
          bottom: 15%;
          left: 15%;
          animation-delay: 1.6s;
        }
        @keyframes sparkleGlow {
          0%,
          100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
            box-shadow: 0 0 15px currentColor;
          }
        }
        .prism-reflection {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.6s ease;
          mix-blend-mode: overlay;
        }
        .crystal-card.activated .prism-reflection {
          opacity: 1;
          animation: prismShift 5s ease-in-out infinite;
        }
        @keyframes prismShift {
          0%,
          100% {
            transform: translateX(-10%) skewX(-5deg);
          }
          50% {
            transform: translateX(10%) skewX(5deg);
          }
        }
        /* Common Image and Content Styles */
        .image-container {
          position: relative;
          height: 160px;
          overflow: hidden;
        }
        .image-stack {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .image-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transform: scale(1.1) rotate(2deg);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .image-layer.active {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s ease;
        }
        .magnetic-card.activated .event-image,
        .crystal-card.activated .event-image {
          transform: scale(1.05);
          filter: brightness(1.1) contrast(1.05) saturate(1.2);
        }
        .placeholder-image {
          width: 100%;
          height: 100%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .image-indicators {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 10;
        }
        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .indicator.active {
          transform: scale(1.3);
          box-shadow: 0 0 10px currentColor;
        }
        .card-content {
          padding: 16px;
          height: 160px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
          transition: color 0.3s ease;
        }
        .card-date {
          font-size: 14px;
          margin-bottom: 12px;
          transition: color 0.3s ease;
        }
        .card-badge {
          display: inline-block;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 20px;
          transition: all 0.3s ease;
          align-self: flex-start;
        }
        /* Enhanced Mobile optimizations */
        @media (max-width: 768px) {
          .magnetic-card,
          .crystal-card {
            max-width: 100%;
            height: 300px;
          }
          .image-container {
            height: 140px;
          }
          .card-content {
            height: 140px;
            padding: 12px;
          }
          /* Mobile animations - keep them active */
          .magnetic-card.activated {
            transform: translateY(-10px) scale(1.02);
          }
          .crystal-card.activated {
            transform: rotateY(3deg) rotateX(1deg) scale(1.02);
          }
          /* Ensure mobile animations work */
          .orb {
            width: 6px;
            height: 6px;
          }
          .field-line {
            border-width: 1px;
          }
          .sparkle {
            width: 3px;
            height: 3px;
          }
          .light-beam {
            height: 1.5px;
          }
        }
        /* Touch devices - activate on touch */
        @media (hover: none) and (pointer: coarse) {
          .magnetic-card:active,
          .crystal-card:active {
            transform: scale(0.98);
          }
          .magnetic-card:active .magnetic-field,
          .crystal-card:active .crystal-facets,
          .crystal-card:active .light-refraction,
          .crystal-card:active .crystal-sparkles,
          .magnetic-card:active .floating-orbs,
          .magnetic-card:active .liquid-ripple {
            opacity: 1;
          }
        }
        /* Text Hover Effects */
        .hover-text {
          transition: color 0.3s ease;
        }
        .magnetic-card:hover .hover-text,
        .crystal-card:hover .hover-text {
          color: ${currentTheme === "classic" ? "#8b5cf6" : "#a78bfa"} !important;
        }
        .magnetic-card.activated .hover-text,
        .crystal-card.activated .hover-text {
          color: ${currentTheme === "classic" ? "#7c3aed" : "#c4b5fd"} !important;
        }
      `}</style>
    </div>
  )
}

export default SearchResultsPage
