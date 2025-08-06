"use client"
import { useEffect, useState } from "react"
import { getUserBookings } from "../../../services/user/userBookingsServices"
import { useTheme } from "../../../contexts/ThemeContext"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const formatStatus = (status) => (status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown")

const formatDate = (dateString) => {
  if (!dateString) return "Date not available"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const formatTime = (timeString) => {
  if (!timeString) return "Time not available"
  return timeString
}

const BookingsComponent = () => {
  const [orders, setOrders] = useState([])
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all") // all, orders, tickets
  const [filter, setFilter] = useState("all") // all, upcoming, past, cancelled
  const { currentTheme, theme } = useTheme()
  const navigate = useNavigate()

  const handleViewDetails = (booking) => {
    navigate(`/booking-details/${booking._id}`, {
      state: {
        bookingType: booking.bookingType, // "order" or "ticket"
      },
    })
  }

  // Theme-based styling
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        mainBg: "bg-gray-50",
        containerBg: "bg-white",
        cardBg: "bg-white",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-700",
        textMuted: "text-gray-500",
        borderColor: "border-gray-200",
        hoverBg: "hover:bg-gray-50",
        tabActiveBg: "border-indigo-500 text-indigo-600",
        tabInactiveBg: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
        buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
        buttonSecondary: "bg-indigo-100 hover:bg-indigo-200 text-indigo-700",
      }
    } else {
      return {
        mainBg: theme?.colors?.primaryBg || "bg-gray-900",
        containerBg: theme?.colors?.secondaryBg || "bg-gray-800",
        cardBg: theme?.colors?.cardBg || "bg-gray-700",
        textPrimary: "text-white",
        textSecondary: "text-gray-200",
        textMuted: "text-gray-400",
        borderColor: "border-gray-600",
        hoverBg: "hover:bg-gray-600",
        tabActiveBg: "border-blue-400 text-blue-400",
        tabInactiveBg: "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500",
        buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
        buttonSecondary: "bg-blue-100 hover:bg-blue-200 text-blue-700",
      }
    }
  }

  const styles = getThemeStyles()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { orders: fetchedOrders, tickets: fetchedTickets } = await getUserBookings()
        console.log("✅ Received Orders:", fetchedOrders)
        console.log("✅ Received Tickets:", fetchedTickets)
        setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : [])
        setTickets(Array.isArray(fetchedTickets) ? fetchedTickets : [])
      } catch (error) {
        console.error("❌ Booking Fetch Error:", error.message)
        toast.error(error.message || "Failed to fetch bookings")
        setOrders([])
        setTickets([])
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  // Combine and filter bookings based on active tab and filter
  const getFilteredBookings = () => {
    let allBookings = []
    // Add orders with type identifier
    if (activeTab === "all" || activeTab === "orders") {
      const ordersWithType = orders.map((order) => ({
        ...order,
        bookingType: "order",
        eventDate: order.event?.date,
        eventTitle: order.event?.title,
        eventLocation: order.event?.locationName || "Location not specified",
        eventCategory: order.event?.category,
        eventImages: order.event?.images,
        eventTime: order.event?.time,
      }))
      allBookings = [...allBookings, ...ordersWithType]
    }
    // Add tickets with type identifier
    if (activeTab === "all" || activeTab === "tickets") {
      const ticketsWithType = tickets.map((ticket) => ({
        ...ticket,
        bookingType: "ticket",
        eventDate: ticket.event?.date,
        eventTitle: ticket.event?.title,
        eventLocation: ticket.event?.locationName || "Location not specified",
        eventCategory: ticket.event?.category,
        eventImages: ticket.event?.images,
        eventTime: ticket.event?.time,
        amount: 0, // Free tickets
      }))
      allBookings = [...allBookings, ...ticketsWithType]
    }

    // Apply date filter
    return allBookings
      .filter((booking) => {
        if (filter === "all") return true
        const eventDate = new Date(booking.eventDate)
        const now = new Date()
        switch (filter) {
          case "upcoming":
            return eventDate > now && booking.status !== "cancelled"
          case "past":
            return eventDate <= now
          case "cancelled":
            return booking.status === "cancelled"
          default:
            return true
        }
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by creation date, newest first
  }

  const filteredBookings = getFilteredBookings()

  const getStatusColor = (status, bookingType) => {
    if (bookingType === "ticket") {
      switch (status?.toLowerCase()) {
        case "booked":
          return "bg-green-100 text-green-800"
        case "used":
          return "bg-blue-100 text-blue-800"
        case "cancelled":
          return "bg-red-100 text-red-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    } else {
      switch (status?.toLowerCase()) {
        case "paid":
          return "bg-green-100 text-green-800"
        case "created":
          return "bg-yellow-100 text-yellow-800"
        case "failed":
          return "bg-red-100 text-red-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    }
  }

  const getCategoryBadgeColor = (category) => {
    return category === "VIP" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
  }

  const getBookingTypeColor = (bookingType) => {
    return bookingType === "order" ? "bg-indigo-100 text-indigo-800" : "bg-emerald-100 text-emerald-800"
  }

  if (loading) {
    return (
      <div
        className={`min-h-screen ${styles.mainBg} flex flex-col items-center justify-center p-4`}
        style={{
          background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.primaryBg || "#111827",
        }}
      >
        <div className="w-16 h-16 relative mb-6">
          <div
            className={`absolute top-0 right-0 bottom-0 left-0 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin`}
          ></div>
        </div>
        <h2 className={`text-xl font-semibold ${styles.textSecondary}`}>Loading your bookings...</h2>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen ${styles.mainBg} py-4 sm:py-6 lg:py-8`}
      style={{
        background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.primaryBg || "#111827",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div
            className={`${styles.containerBg} rounded-lg shadow-sm p-4 sm:p-6 border ${styles.borderColor}`}
            style={{
              background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className={`text-2xl sm:text-3xl font-bold ${styles.textPrimary} flex items-center`}>
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  My Bookings
                </h2>
                <p className={`mt-1 text-sm sm:text-base ${styles.textMuted}`}>
                  View and manage all your event bookings and tickets in one place.
                </p>
              </div>
              {/* Summary Stats */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${styles.textPrimary}`}>{orders.length + tickets.length}</div>
                  <div className={`text-xs ${styles.textMuted}`}>Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold text-green-600`}>{orders.length}</div>
                  <div className={`text-xs ${styles.textMuted}`}>Paid Orders</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold text-emerald-600`}>{tickets.length}</div>
                  <div className={`text-xs ${styles.textMuted}`}>Free Tickets</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Type Tabs */}
        <div className="mb-4">
          <div
            className={`${styles.containerBg} rounded-lg shadow-sm border ${styles.borderColor} overflow-hidden`}
            style={{
              background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
            }}
          >
            <div className={`border-b ${styles.borderColor}`}>
              <nav className="flex overflow-x-auto">
                {[
                  {
                    key: "all",
                    label: "All Bookings",
                    count: orders.length + tickets.length,
                  },
                  { key: "orders", label: "Paid Orders", count: orders.length },
                  {
                    key: "tickets",
                    label: "Free Tickets",
                    count: tickets.length,
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`whitespace-nowrap py-3 px-4 sm:px-6 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key ? styles.tabActiveBg : styles.tabInactiveBg
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{tab.label}</span>
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          activeTab === tab.key ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div
            className={`${styles.containerBg} rounded-lg shadow-sm border ${styles.borderColor} overflow-hidden`}
            style={{
              background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
            }}
          >
            <div className={`border-b ${styles.borderColor}`}>
              <nav className="flex overflow-x-auto">
                {[
                  {
                    key: "all",
                    label: "All Events",
                    count: filteredBookings.length,
                  },
                  {
                    key: "upcoming",
                    label: "Upcoming",
                    count: filteredBookings.filter(
                      (b) => new Date(b.eventDate) > new Date() && b.status !== "cancelled",
                    ).length,
                  },
                  {
                    key: "past",
                    label: "Past Events",
                    count: filteredBookings.filter((b) => new Date(b.eventDate) <= new Date()).length,
                  },
                  {
                    key: "cancelled",
                    label: "Cancelled",
                    count: filteredBookings.filter((b) => b.status === "cancelled").length,
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={`whitespace-nowrap py-3 px-4 sm:px-6 border-b-2 font-medium text-sm transition-colors ${
                      filter === tab.key ? styles.tabActiveBg : styles.tabInactiveBg
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{tab.label}</span>
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          filter === tab.key ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div
            className={`${styles.containerBg} shadow-sm rounded-xl border ${styles.borderColor} p-6 sm:p-8 text-center`}
            style={{
              background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
            }}
          >
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className={`text-lg font-medium ${styles.textPrimary} mb-2`}>
              {filter === "all" ? "No Bookings Found" : `No ${filter} bookings found`}
            </h3>
            <p className={`${styles.textMuted} mb-6`}>
              {filter === "all"
                ? "You haven't booked any events yet. Start exploring events now!"
                : `You don't have any ${filter} bookings at the moment.`}
            </p>
            {filter === "all" && (
              <a
                href="/events"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${styles.buttonPrimary} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
              >
                Browse Events
              </a>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div
              className={`hidden xl:block overflow-hidden shadow-sm rounded-lg border ${styles.borderColor} ${styles.containerBg}`}
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
              }}
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className={`${currentTheme === "classic" ? "bg-gray-50" : "bg-gray-800"}`}>
                    <tr>
                      <th
                        className={`px-4 py-3 text-left text-xs font-medium ${styles.textMuted} uppercase tracking-wider`}
                      >
                        Event Details
                      </th>
                      <th
                        className={`px-4 py-3 text-left text-xs font-medium ${styles.textMuted} uppercase tracking-wider`}
                      >
                        Date & Time
                      </th>
                      <th
                        className={`px-4 py-3 text-left text-xs font-medium ${styles.textMuted} uppercase tracking-wider`}
                      >
                        Ticket Info
                      </th>
                      <th
                        className={`px-4 py-3 text-left text-xs font-medium ${styles.textMuted} uppercase tracking-wider`}
                      >
                        Amount
                      </th>
                      <th
                        className={`px-4 py-3 text-left text-xs font-medium ${styles.textMuted} uppercase tracking-wider`}
                      >
                        Status
                      </th>
                      <th
                        className={`px-4 py-3 text-left text-xs font-medium ${styles.textMuted} uppercase tracking-wider`}
                      >
                        Booked On
                      </th>
                      <th className="relative px-4 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${styles.borderColor}`}>
                    {filteredBookings.map((booking) => (
                      <tr
                        key={`${booking.bookingType}-${booking._id}`}
                        className={`${styles.hoverBg} transition-colors`}
                      >
                        <td className="px-4 py-4 min-w-0">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              {booking.eventImages?.[0] ? (
                                <img
                                  className="h-12 w-12 rounded-lg object-cover"
                                  src={booking.eventImages[0] || "/placeholder.svg"}
                                  alt={booking.eventTitle}
                                />
                              ) : (
                                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-semibold">
                                  {booking.eventTitle?.charAt(0).toUpperCase() || "E"}
                                </div>
                              )}
                            </div>
                            <div className="ml-4 min-w-0 flex-1">
                              <div className={`text-sm font-medium ${styles.textPrimary}`}>
                                {booking.eventTitle || "Event not found"}
                              </div>
                              <div className={`text-sm ${styles.textMuted}`}>{booking.eventLocation}</div>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`text-xs ${styles.textMuted}`}>
                                  {booking.eventCategory || "Category not specified"}
                                </span>
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getBookingTypeColor(
                                    booking.bookingType,
                                  )}`}
                                >
                                  {booking.bookingType === "order" ? "Paid" : "Free"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 min-w-0">
                          <div className={`text-sm ${styles.textPrimary} font-medium`}>
                            {formatDate(booking.eventDate)}
                          </div>
                          <div className={`text-sm ${styles.textMuted}`}>{formatTime(booking.eventTime)}</div>
                        </td>
                        <td className="px-4 py-4 min-w-0">
                          <div className="space-y-1">
                            {booking.category && (
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadgeColor(
                                  booking.category,
                                )}`}
                              >
                                {booking.category}
                              </span>
                            )}
                            {booking.seats && booking.seats.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {booking.seats.slice(0, 2).map((seat, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                  >
                                    {seat.seatNumber || seat}
                                  </span>
                                ))}
                                {booking.seats.length > 2 && (
                                  <span className={`text-xs ${styles.textMuted}`}>
                                    +{booking.seats.length - 2} more
                                  </span>
                                )}
                              </div>
                            ) : booking.quantity ? (
                              <span className={`text-sm ${styles.textSecondary}`}>Qty: {booking.quantity}</span>
                            ) : booking.seatNumber ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {booking.seatNumber}
                              </span>
                            ) : (
                              <span className={`text-sm ${styles.textMuted}`}>General Admission</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 min-w-0">
                          {booking.bookingType === "order" ? (
                            <div>
                              <div className={`text-sm ${styles.textPrimary} font-semibold`}>
                                ₹{booking.amount || 0}
                              </div>
                              {booking.gstAmount && (
                                <div className={`text-xs ${styles.textMuted}`}>GST: ₹{booking.gstAmount}</div>
                              )}
                            </div>
                          ) : (
                            <div className="text-sm text-green-600 font-semibold">FREE</div>
                          )}
                        </td>
                        <td className="px-4 py-4 min-w-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              booking.status,
                              booking.bookingType,
                            )}`}
                          >
                            {formatStatus(booking.status)}
                          </span>
                        </td>
                        <td className={`px-4 py-4 text-sm ${styles.textMuted} min-w-0`}>
                          {formatDate(booking.createdAt || booking.bookedAt)}
                        </td>
                        <td className="px-4 py-4 text-right text-sm font-medium min-w-0">
                          <button
                            onClick={() => handleViewDetails(booking)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="xl:hidden space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={`${booking.bookingType}-${booking._id}`}
                  className={`${styles.containerBg} shadow-sm rounded-lg border ${styles.borderColor} overflow-hidden`}
                  style={{
                    background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
                  }}
                >
                  {/* Card Header */}
                  <div
                    className={`px-4 py-4 bg-opacity-50 ${
                      currentTheme === "classic" ? "bg-gray-50" : "bg-gray-800"
                    } border-b ${styles.borderColor}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          {booking.eventImages?.[0] ? (
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={booking.eventImages[0] || "/placeholder.svg"}
                              alt={booking.eventTitle}
                            />
                          ) : (
                            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-semibold">
                              {booking.eventTitle?.charAt(0).toUpperCase() || "E"}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-base font-medium ${styles.textPrimary}`}>
                            {booking.eventTitle || "Event not found"}
                          </h3>
                          <p className={`text-sm ${styles.textMuted}`}>{booking.eventLocation}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getBookingTypeColor(
                                booking.bookingType,
                              )}`}
                            >
                              {booking.bookingType === "order" ? "Paid" : "Free"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status,
                          booking.bookingType,
                        )} ml-2 flex-shrink-0`}
                      >
                        {formatStatus(booking.status)}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-4 py-4 space-y-3">
                    {/* Event Date & Time */}
                    <div className="flex items-center text-sm">
                      <svg
                        className={`w-4 h-4 ${styles.textMuted} mr-2 flex-shrink-0`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className={`${styles.textPrimary} font-medium`}>{formatDate(booking.eventDate)}</span>
                      <span className={`${styles.textMuted} ml-2`}>{formatTime(booking.eventTime)}</span>
                    </div>

                    {/* Category & Amount */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        {booking.category && (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadgeColor(
                              booking.category,
                            )}`}
                          >
                            {booking.category}
                          </span>
                        )}
                        <span className={`text-xs ${styles.textMuted}`}>{booking.eventCategory}</span>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {booking.bookingType === "order" ? (
                          <div>
                            <div className={`text-lg font-semibold ${styles.textPrimary}`}>₹{booking.amount || 0}</div>
                            {booking.gstAmount && (
                              <div className={`text-xs ${styles.textMuted}`}>GST: ₹{booking.gstAmount}</div>
                            )}
                          </div>
                        ) : (
                          <div className="text-lg font-semibold text-green-600">FREE</div>
                        )}
                      </div>
                    </div>

                    {/* Seats/Quantity Info */}
                    {booking.seats && booking.seats.length > 0 ? (
                      <div>
                        <div className={`text-xs ${styles.textMuted} mb-1`}>Seats:</div>
                        <div className="flex flex-wrap gap-1">
                          {booking.seats.map((seat, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {seat.seatNumber || seat}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : booking.quantity ? (
                      <div className={`text-sm ${styles.textSecondary}`}>Quantity: {booking.quantity}</div>
                    ) : booking.seatNumber ? (
                      <div className={`text-sm ${styles.textSecondary}`}>Seat: {booking.seatNumber}</div>
                    ) : (
                      <div className={`text-sm ${styles.textSecondary}`}>General Admission</div>
                    )}

                    {/* Booking Date */}
                    <div className={`text-xs ${styles.textMuted}`}>
                      Booked on {formatDate(booking.createdAt || booking.bookedAt)}
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <a
                        href={`/booking/${booking._id}`}
                        className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${styles.buttonSecondary} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BookingsComponent
