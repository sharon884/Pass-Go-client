"use client"
import { useState, useEffect } from "react"
import { approveEvent, rejectEvent } from "../../../services/admin/eventmanagement"
import { fetchEvents } from "../../../services/general/EventAnalytics"
import { toast } from "sonner"
// import { useTheme } from "../../../contexts/ThemeContext"

const EventVerificationAdmin = () => {
  const [pendingEvents, setPendingEvents] = useState([])
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [rejectionReason, setRejectionReason] = useState({})
  const [expandedEvent, setExpandedEvent] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  // const { currentTheme, theme } = useTheme()

  // Theme-based styling
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        containerBg: "bg-white",
        cardBg: "bg-white",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-700",
        textMuted: "text-gray-500",
        borderColor: "border-gray-200",
        inputBg: "bg-white",
        inputBorder: "border-gray-300",
        inputFocus: "focus:border-indigo-500 focus:ring-indigo-500",
        buttonSecondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
        linkColor: "text-indigo-600 hover:text-indigo-800",
      }
    } else {
      return {
        containerBg: theme?.colors?.secondaryBg || "bg-gray-800",
        cardBg: theme?.colors?.cardBg || "bg-gray-700",
        textPrimary: "text-white",
        textSecondary: "text-gray-200",
        textMuted: "text-gray-400",
        borderColor: "border-gray-600",
        inputBg: theme?.colors?.inputBg || "bg-gray-600",
        inputBorder: "border-gray-500",
        inputFocus: "focus:border-blue-400 focus:ring-blue-400",
        buttonSecondary: "bg-gray-600 hover:bg-gray-500 text-gray-200",
        linkColor: "text-blue-400 hover:text-blue-300",
      }
    }
  }
  const styles = getThemeStyles()

  const loadEvents = async (page = 1) => {
    try {
      setLoading(true)
      setSubmitting(true)
      const data = await fetchEvents({
        params: {
          page,
          limit: 10,
          status: "requested",
          advancePaid: true,
          isApproved: false,
          order: "desc",
          sortBy: "createdAt",
        },
      })
      setPendingEvents(data.events || [])
      setPagination(data.pagination)
    } catch (error) {
      toast.error("Failed to fetch events")
    } finally {
      setLoading(false)
      setSubmitting(false)
    }
  }

  useEffect(() => {
    loadEvents(pagination.page)
  }, [pagination.page])

  const handleApprove = async (id) => {
    try {
      setSubmitting(true)
      const response = await approveEvent(id)
      toast.success(response.message || "Event approved")
      loadEvents(pagination.page)
    } catch {
      toast.error("Approval failed")
    } finally {
      setSubmitting(false)
    }
  }

  const handleReject = async (id) => {
    try {
      if (!rejectionReason[id]) {
        toast.error("Enter a rejection reason")
        return
      }
      setSubmitting(true)
      const response = await rejectEvent(id, rejectionReason[id])
      toast.success(response.message || "Event rejected")
      loadEvents(pagination.page)
    } catch {
      toast.error("Rejection failed")
    } finally {
      setSubmitting(false)
    }
  }

  const handlePageChange = (delta) => {
    const newPage = pagination.page + delta
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }))
    }
  }

  return (
    <div
      className={`p-4 sm:p-6 relative ${styles.containerBg}`}
      style={{
        background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
      }}
    >
      <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${styles.textPrimary}`}>Pending Event Approvals</h2>
      {loading ? (
        <div className={`text-center py-8 ${styles.textMuted}`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mx-auto mb-2"></div>
          <p>Loading events...</p>
        </div>
      ) : pendingEvents.length === 0 ? (
        <div className={`text-center py-8 ${styles.textMuted}`}>
          <p className="text-lg">No pending events found.</p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {pendingEvents.map((event) => (
            <div
              key={event._id}
              className={`border ${styles.borderColor} p-4 sm:p-6 rounded-lg shadow-sm ${styles.cardBg}`}
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#374151",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                <h3 className={`text-lg sm:text-xl font-semibold ${styles.textPrimary} break-words`}>{event.title}</h3>
                <button
                  className={`text-sm ${styles.linkColor} hover:underline self-start sm:self-center flex-shrink-0`}
                  onClick={() => setExpandedEvent((prev) => (prev === event._id ? null : event._id))}
                >
                  {expandedEvent === event._id ? "Hide" : "View"} Details
                </button>
              </div>
              {expandedEvent === event._id && (
                <div className={`mt-4 sm:mt-6 text-sm space-y-3 sm:space-y-4 ${styles.textSecondary}`}>
                  <div className="space-y-2">
                    <p>
                      <strong className={styles.textPrimary}>Description:</strong> {event.description}
                    </p>
                    <p>
                      <strong className={styles.textPrimary}>Category:</strong> {event.category}
                    </p>
                    <p>
                      <strong className={styles.textPrimary}>Date:</strong> {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong className={styles.textPrimary}>Time:</strong> {event.time}
                    </p>
                    {/* Updated line for location display */}
                    <p>
                      <strong className={styles.textPrimary}>Location:</strong> {event.locationName ?? "N/A"}
                    </p>
                  </div>
                  {event.images && event.images.length > 0 && (
                    <div>
                      <strong className={styles.textPrimary}>Images:</strong>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {event.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img || "/placeholder.svg"}
                            alt="event"
                            className="w-20 h-16 sm:w-28 sm:h-20 object-cover rounded shadow cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSelectedImage(img)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                    {event.tickets?.VIP && (
                      <div className="p-2 rounded bg-opacity-50 bg-gray-100 dark:bg-gray-600">
                        <strong className={styles.textPrimary}>VIP:</strong> ₹{event.tickets.VIP.price} ×{" "}
                        {event.tickets.VIP.quantity}
                      </div>
                    )}
                    {event.tickets?.general && (
                      <div className="p-2 rounded bg-opacity-50 bg-gray-100 dark:bg-gray-600">
                        <strong className={styles.textPrimary}>General:</strong> ₹{event.tickets.general.price} ×{" "}
                        {event.tickets.general.quantity}
                      </div>
                    )}
                    {event.host?.name && (
                      <div className="p-2 rounded bg-opacity-50 bg-gray-100 dark:bg-gray-600">
                        <strong className={styles.textPrimary}>Host:</strong> {event.host.name}
                      </div>
                    )}
                    {event.businessInfo?.email && (
                      <div className="p-2 rounded bg-opacity-50 bg-gray-100 dark:bg-gray-600">
                        <strong className={styles.textPrimary}>Email:</strong> {event.businessInfo.email}
                      </div>
                    )}
                    {event.businessInfo?.organization_name && (
                      <div className="p-2 rounded bg-opacity-50 bg-gray-100 dark:bg-gray-600">
                        <strong className={styles.textPrimary}>Org:</strong> {event.businessInfo.organization_name}
                      </div>
                    )}
                    {event.businessInfo?.mobile && (
                      <div className="p-2 rounded bg-opacity-50 bg-gray-100 dark:bg-gray-600">
                        <strong className={styles.textPrimary}>Phone:</strong> {event.businessInfo.mobile}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-2 sm:items-center">
                <button
                  onClick={() => handleApprove(event._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-1 sm:order-none"
                  disabled={submitting}
                >
                  {submitting ? "Processing..." : "Approve"}
                </button>
                <input
                  type="text"
                  placeholder="Rejection reason"
                  value={rejectionReason[event._id] || ""}
                  onChange={(e) =>
                    setRejectionReason((prev) => ({
                      ...prev,
                      [event._id]: e.target.value,
                    }))
                  }
                  className={`border ${styles.inputBorder} ${styles.inputBg} ${styles.textPrimary} px-3 py-2 rounded-md w-full sm:w-64 ${styles.inputFocus} focus:outline-none focus:ring-1 order-2 sm:order-none`}
                  style={{
                    background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.inputBg || "#4b5563",
                  }}
                />
                <button
                  onClick={() => handleReject(event._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-3 sm:order-none"
                  disabled={submitting}
                >
                  {submitting ? "Processing..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-center items-center mt-6 sm:mt-8 gap-4">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={pagination.page === 1}
              className={`px-4 py-2 border ${styles.borderColor} rounded-md ${styles.buttonSecondary} disabled:opacity-40 disabled:cursor-not-allowed transition-colors w-full sm:w-auto`}
            >
              Previous
            </button>
            <span className={`text-sm ${styles.textMuted} order-first sm:order-none`}>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(1)}
              disabled={pagination.page === pagination.totalPages}
              className={`px-4 py-2 border ${styles.borderColor} rounded-md ${styles.buttonSecondary} disabled:opacity-40 disabled:cursor-not-allowed transition-colors w-full sm:w-auto`}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-[95vw] max-h-[95vh]">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Full preview"
              className="max-w-full max-h-full rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 sm:top-2 sm:right-2 bg-black bg-opacity-50 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold hover:bg-opacity-70 transition-colors"
              aria-label="Close image preview"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventVerificationAdmin
