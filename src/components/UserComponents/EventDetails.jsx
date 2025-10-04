"use client"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { socket } from "../../utils/socket/socket"
import { fetchApprovedEventsById } from "../../services/user/userEventServices"
import { useTheme } from "../../contexts/ThemeContext"
import EventDistanceMap from "./EventDistanceMap"

const EventDetails = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [offer, setOffer] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate()
  const { currentTheme, theme } = useTheme()

  // Theme-based styling - Keeping as is
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        containerBg: "bg-white",
        cardBg: "bg-gray-50",
        cardBorder: "border-gray-200",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-700",
        textMuted: "text-gray-500",
        ticketCardBg: "bg-white",
        buttonPrimary: "bg-purple-600 hover:bg-purple-700",
        categoryBadgeBg: "bg-purple-600",
        loadingColor: "text-purple-600",
        shadowColor: "shadow-md",
        offerBg: "bg-green-50",
        offerText: "text-green-800",
        offerBorder: "border-green-200",
      }
    } else {
      return {
        containerBg: theme?.colors?.secondaryBg || "bg-gray-800",
        cardBg: theme?.colors?.cardBg || "bg-gray-700",
        cardBorder: "border-gray-600",
        textPrimary: "text-white",
        textSecondary: "text-gray-200",
        textMuted: "text-gray-400",
        ticketCardBg: theme?.colors?.secondaryBg || "bg-gray-800",
        buttonPrimary: "bg-purple-600 hover:bg-purple-700",
        categoryBadgeBg: "bg-purple-600",
        loadingColor: "text-purple-400",
        shadowColor: "shadow-lg",
        offerBg: theme?.colors?.successBg || "bg-green-900",
        offerText: "text-green-200",
        offerBorder: "border-green-800",
      }
    }
  }
  const styles = getThemeStyles()

  const handleNavigate = () => {
    if (event.eventType === "free") {
      navigate(`/user/event/${id}/ticket-info`)
    } else if (event.eventType === "paid_stage_with_seats") {
      navigate(`/user/event/${id}/select-seat-counts`)
    } else if (event.eventType === "paid_stage_without_seats") {
      navigate(`/user/event/${id}/ticket-info`)
    } else {
      toast.error("Invalid event type")
    }
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { event: fetchedEvent, offer: fetchedOffer } = await fetchApprovedEventsById(id)
        setEvent(fetchedEvent)
        setOffer(fetchedOffer)
        if (id) {
          socket.emit("join-event-room", id)
        }
      } catch (error) {
        console.log("Failed to fetch event", error)
        toast.error("Failed to fetch event details.")
      }
    }
    fetchEvent()
    return () => {
      if (id) {
        socket.emit("leave-event-room", id)
      }
    }
  }, [id])

  useEffect(() => {
    const handleFreeTicketCancelled = ({ eventId: cancelledEventId, category }) => {
      if (cancelledEventId === id) {
        console.log(`Ticket in category '${category}' was cancelled. Refreshing...`)
        fetchApprovedEventsById(id)
          .then(({ event: fetchedEvent, offer: fetchedOffer }) => {
            setEvent(fetchedEvent)
            setOffer(fetchedOffer)
          })
          .catch(console.error)
      }
    }
    socket.on("free-ticket-cancelled", handleFreeTicketCancelled)
    return () => {
      socket.off("free-ticket-cancelled", handleFreeTicketCancelled)
    }
  }, [id])

  useEffect(() => {
    if (!event || !event.images || event.images.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % event.images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [event])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!event)
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
        }}
      >
        <div className={`animate-pulse ${styles.loadingColor} text-xl font-semibold`}>Loading....</div>
      </div>
    )

  console.log("Business Info: ", event.businessInfo)
  return (
    <div
      className={`max-w-4xl mx-auto p-4 md:p-6 ${styles.containerBg}`}
      style={{
        background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
      }}
    >
      {/* Hero Section with Image Carousel */}
      <div className={`relative rounded-xl overflow-hidden mb-8 ${styles.shadowColor}`}>
        {event.images && event.images.length > 0 && (
          <div className="relative h-64 md:h-96">
            {event.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${event.title} - image ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Carousel indicators */}
            {event.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {event.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "w-8 bg-purple-600" : "w-2 bg-white/70"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`${styles.categoryBadgeBg} text-white text-sm font-medium px-3 py-1.5 rounded-full`}>
                {event.category}
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Event Title */}
      <h1 className={`text-3xl md:text-4xl font-bold ${styles.textPrimary} mb-4`}>{event.title}</h1>
      {/* Event Details */}
      {/* This grid is responsive: stacks on mobile (col-span-1) and splits 2/3 and 1/3 on medium screens (md:grid-cols-3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 md:col-span-2">
          <div
            className={`${styles.cardBg} rounded-xl p-6 ${styles.shadowColor} border ${styles.cardBorder}`}
            style={{
              background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.cardBg || "#374151",
            }}
          >
            <h2 className={`text-xl font-semibold ${styles.textPrimary} mb-4`}>
              About This Event
              <div className="mb-4">
                <span
                  className="inline-block text-xs font-medium px-3 py-1 rounded-full text-white"
                  style={{
                    background:
                      event.eventType === "free"
                        ? "linear-gradient(to right, #34D399, #10B981)"
                        : "linear-gradient(to right, #F59E0B, #F97316)",
                  }}
                >
                  {event.eventType === "free" ? "Free Event" : "Paid Event"}
                </span>
                {event.eventType === "paid_stage_with_seats" && (
                  <p className={`text-xs mt-2 ${styles.textMuted}`}>🎭 This event has reserved seating.</p>
                )}
              </div>
            </h2>
            <p className={`${styles.textSecondary} mb-6 leading-relaxed`}>{event.description}</p>
            <div className="space-y-3">
              {/* Date Detail Row - FIXED: Adjusted w-24 to be w-20 on mobile, w-24 on sm+ */}
              <div className="flex items-start">
                <div className={`w-20 sm:w-24 flex-shrink-0 ${styles.textMuted} font-medium`}>Date:</div>
                <div className={styles.textPrimary}>{formatDate(event.date)}</div>
              </div>
              {/* Time Detail Row - FIXED: Adjusted w-24 to be w-20 on mobile, w-24 on sm+ */}
              <div className="flex items-start">
                <div className={`w-20 sm:w-24 flex-shrink-0 ${styles.textMuted} font-medium`}>Time:</div>
                <div className={styles.textPrimary}>{event.time}</div>
              </div>
              {/* Location Detail Row - FIXED: Adjusted w-24 to be w-20 on mobile, w-24 on sm+ */}
              <div className="flex items-start">
                <div className={`w-20 sm:w-24 flex-shrink-0 ${styles.textMuted} font-medium`}>Location:</div>
                {/* UPDATED: Display locationName instead of coordinates */}
                <div className={styles.textPrimary}>{event.locationName ?? "N/A"}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Tickets Section */}
        <div className="col-span-1">
          <div
            className={`${styles.cardBg} rounded-xl p-6 ${styles.shadowColor} border ${styles.cardBorder}`}
            style={{
              background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.cardBg || "#374151",
            }}
          >
            <h3 className={`text-xl font-semibold ${styles.textPrimary} mb-4`}>Tickets</h3>
            {/* Offer Display Section - Improved Alignment and UI */}
            {offer && (
              <div
                className={`mb-6 p-5 rounded-xl border ${styles.offerBorder} ${styles.offerBg} shadow-inner`}
                style={{
                  background: currentTheme === "classic" ? "#ecfdf5" : theme?.colors?.successBg || "#064e3b",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <h4 className={`text-lg font-semibold ${styles.offerText}`}>Special Offer Available!</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className={`w-24 font-medium ${styles.offerText}`}>Discount:</span>
                    <span className={`flex-1 font-bold ${styles.textPrimary}`}>
                      {offer.discountType === "percentage" ? `${offer.value}% OFF` : `₹${offer.value} OFF`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`w-24 font-medium ${styles.offerText}`}>Expires:</span>
                    <span className={`flex-1 font-bold ${styles.textPrimary}`}>
                      {new Date(offer.expiryDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  {offer.minTickets && (
                    <div className="flex items-center">
                      <span className={`w-24 font-medium ${styles.offerText}`}>Min. Tickets:</span>
                      <span className={`flex-1 font-bold ${styles.textPrimary}`}>{offer.minTickets}</span>
                    </div>
                  )}
                </div>
                <p className={`mt-3 text-xs ${styles.offerText}`}>This offer will be applied at checkout.</p>
              </div>
            )}
            {/* VIP Ticket */}
            <div
              className={`mb-4 p-4 ${styles.ticketCardBg} rounded-lg border ${styles.cardBorder}`}
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`font-medium ${styles.textPrimary}`}>VIP</span>
                {/* Added currency icon */}
                <span className="text-purple-600 font-bold">₹{event?.tickets?.VIP?.price ?? "N/A"}</span>
              </div>
              <div className={`text-sm ${styles.textMuted}`}>Available: {event?.tickets?.VIP?.quantity ?? "N/A"}</div>
            </div>
            {/* General Ticket */}
            <div
              className={`mb-4 p-4 ${styles.ticketCardBg} rounded-lg border ${styles.cardBorder}`}
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`font-medium ${styles.textPrimary}`}>General</span>
                {/* Added currency icon */}
                <span className="text-purple-600 font-bold">₹{event?.tickets?.general?.price ?? "N/A"}</span>
              </div>
              <div className={`text-sm ${styles.textMuted}`}>
                Available: {event?.tickets?.general?.quantity ?? "N/A"}
              </div>
            </div>
            <button
              onClick={handleNavigate}
              className={`w-full ${styles.buttonPrimary} text-white font-medium py-3 rounded-lg transition-colors duration-300 mt-2`}
            >
              Get Tickets
            </button>
          </div>
        </div>
      </div>
      {/* Business Info Section */}
      {/* This grid is responsive: stacks on mobile and splits into two columns on medium screens (md:grid-cols-2) */}
      <div
        className={`${styles.cardBg} rounded-xl p-6 ${styles.shadowColor} border ${styles.cardBorder} mb-8`}
        style={{
          background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.cardBg || "#374151",
        }}
      >
        <h2 className={`text-xl font-semibold ${styles.textPrimary} mb-4`}>Organizer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className={`font-medium ${styles.textPrimary}`}>
              {event.businessInfo ? event.businessInfo.name : "N/A"}
            </p>
            <p className={styles.textSecondary}>{event.businessInfo ? event.businessInfo.organization_name : "N/A"}</p>
          </div>
          <div>
            <p className={`flex items-center ${styles.textSecondary} mb-2`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-purple-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {event.businessInfo?.email ?? "N/A"}
            </p>
            <p className={`flex items-center ${styles.textSecondary}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-purple-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {event.businessInfo?.mobile ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
      {/* Event Distance Map */}
      {event?.location?.coordinates && (
        <EventDistanceMap
          eventCoords={{
            lat: event.location.coordinates[1], // Latitude
            lng: event.location.coordinates[0], // Longitude
          }}
        />
      )}
    </div>
  )
}

export default EventDetails