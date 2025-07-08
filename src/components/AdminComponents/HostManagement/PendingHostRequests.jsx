"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  fetchPendingHostRequests,
  approveHostRequest,
  rejectHostVerifyRequest,
} from "../../../services/admin/hostMangementServices"
import { useTheme } from "../../../contexts/ThemeContext"
import RejectionModal from "./RejectionModal"

const FetchPendingHostRequests = () => {
  const [pendingHosts, setPendingHosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [expandedHost, setExpandedHost] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const { currentTheme, theme } = useTheme()

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

  useEffect(() => {
    const loadHosts = async () => {
      try {
        setLoading(true)
        const response = await fetchPendingHostRequests()
        setPendingHosts(response.data)
      } catch (error) {
        toast.error("Failed to load host requests")
      } finally {
        setLoading(false)
      }
    }
    loadHosts()
  }, [])

  const handleApprove = async (userId) => {
    try {
      setSubmitting(true)
      await approveHostRequest(userId)
      toast.success("Host approved successfully!")
      setPendingHosts((prev) => prev.filter((user) => user._id !== userId))
    } catch {
      toast.error("Approval failed")
    } finally {
      setSubmitting(false)
    }
  }

  const handleReject = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const submitRejection = async (reason) => {
    try {
      setSubmitting(true)
      await rejectHostVerifyRequest(selectedUser._id, reason)
      toast.success("Host rejected successfully")
      setPendingHosts((prev) => prev.filter((user) => user._id !== selectedUser._id))
    } catch {
      toast.error("Rejection failed")
    } finally {
      setSubmitting(false)
      setShowModal(false)
    }
  }

  return (
    <div
      className={`p-4 sm:p-6 relative ${styles.containerBg}`}
      style={{
        background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
      }}
    >
      <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${styles.textPrimary}`}>Pending Host Requests</h2>

      {loading ? (
        <div className={`text-center py-8 ${styles.textMuted}`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mx-auto mb-2"></div>
          <p>Loading host requests...</p>
        </div>
      ) : pendingHosts.length === 0 ? (
        <div className={`text-center py-8 ${styles.textMuted}`}>
          <p className="text-lg">No pending host requests found.</p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {pendingHosts.map((host) => (
            <div
              key={host._id}
              className={`border ${styles.borderColor} p-4 sm:p-6 rounded-lg shadow-sm ${styles.cardBg}`}
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#374151",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                <h3 className={`text-lg sm:text-xl font-semibold ${styles.textPrimary} break-words`}>{host.name}</h3>
                <button
                  className={`text-sm ${styles.linkColor} hover:underline self-start sm:self-center flex-shrink-0`}
                  onClick={() => setExpandedHost((prev) => (prev === host._id ? null : host._id))}
                >
                  {expandedHost === host._id ? "Hide" : "View"} Details
                </button>
              </div>

              {host.panImage && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <strong className={`text-sm ${styles.textPrimary}`}>PAN Card:</strong>
                  </div>
                  <img
                    src={host.panImage || "/placeholder.svg"}
                    alt="PAN Card"
                    className="w-40 h-24 sm:w-48 sm:h-28 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-80 transition-opacity border border-gray-200 dark:border-gray-600"
                    onClick={() => setSelectedImage(host.panImage)}
                  />
                </div>
              )}

              <div className={`mt-3 text-sm ${styles.textSecondary} space-y-1`}>
                <p>
                  <strong className={styles.textPrimary}>Mobile:</strong> {host.mobile}
                </p>
                <p>
                  <strong className={styles.textPrimary}>Requested:</strong>{" "}
                  {new Date(host.verifyRequestedAt).toLocaleDateString()}
                </p>
              </div>

              {expandedHost === host._id && (
                <div className={`mt-4 sm:mt-6 text-sm space-y-3 sm:space-y-4 ${styles.textSecondary}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="p-3 rounded bg-opacity-50 bg-gray-100 dark:bg-gray-600">
                      <strong className={styles.textPrimary}>Name:</strong> {host.name}
                    </div>
                    <div className="p-3 rounded bg-opacity-50 bg-gray-100 dark:bg-gray-600">
                      <strong className={styles.textPrimary}>Mobile:</strong> {host.mobile}
                    </div>
                    <div className="p-3 rounded bg-opacity-50 bg-gray-100 dark:bg-gray-600">
                      <strong className={styles.textPrimary}>Email:</strong> {host.email || "N/A"}
                    </div>
                    <div className="p-3 rounded bg-opacity-50 bg-gray-100 dark:bg-gray-600">
                      <strong className={styles.textPrimary}>Requested At:</strong>{" "}
                      {new Date(host.verifyRequestedAt).toLocaleString()}
                    </div>
                    {host.address && (
                      <div className="p-3 rounded bg-opacity-50 bg-gray-100 dark:bg-gray-600 sm:col-span-2">
                        <strong className={styles.textPrimary}>Address:</strong> {host.address}
                      </div>
                    )}
                  </div>

                  {host.panImage && (
                    <div>
                      <strong className={styles.textPrimary}>PAN Card:</strong>
                      <div className="mt-2">
                        <img
                          src={host.panImage || "/placeholder.svg"}
                          alt="PAN Card"
                          className="w-32 h-20 sm:w-40 sm:h-24 object-cover rounded shadow cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedImage(host.panImage)}
                        />
                      </div>
                    </div>
                  )}

                  {host.documents && host.documents.length > 0 && (
                    <div>
                      <strong className={styles.textPrimary}>Additional Documents:</strong>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {host.documents.map((doc, idx) => (
                          <img
                            key={idx}
                            src={doc || "/placeholder.svg"}
                            alt={`Document ${idx + 1}`}
                            className="w-20 h-16 sm:w-28 sm:h-20 object-cover rounded shadow cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSelectedImage(doc)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => handleApprove(host._id)}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  disabled={submitting}
                >
                  {submitting ? "Processing..." : "Approve"}
                </button>
                <button
                  onClick={() => handleReject(host)}
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  disabled={submitting}
                >
                  {submitting ? "Processing..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
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

      <RejectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={submitRejection}
        currentTheme={currentTheme}
        theme={theme}
      />
    </div>
  )
}

export default FetchPendingHostRequests
