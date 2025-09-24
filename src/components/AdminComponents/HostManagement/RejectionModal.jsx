"use client"

import { useState } from "react"
// import { useTheme } from "../../../contexts/ThemeContext"

const RejectionModal = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState("")
  // const { currentTheme, theme } = useTheme()

  // Theme-based styling
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        modalBg: "bg-white",
        overlayBg: "bg-black bg-opacity-50",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-700",
        textMuted: "text-gray-500",
        borderColor: "border-gray-200",
        inputBg: "bg-white",
        inputBorder: "border-gray-300",
        inputFocus: "focus:border-indigo-500 focus:ring-indigo-500",
        buttonSecondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300",
      }
    } else {
      return {
        modalBg: theme?.colors?.cardBg || "bg-gray-800",
        overlayBg: "bg-black bg-opacity-70",
        textPrimary: "text-white",
        textSecondary: "text-gray-200",
        textMuted: "text-gray-400",
        borderColor: "border-gray-600",
        inputBg: theme?.colors?.inputBg || "bg-gray-700",
        inputBorder: "border-gray-500",
        inputFocus: "focus:border-blue-400 focus:ring-blue-400",
        buttonSecondary: "bg-gray-600 hover:bg-gray-500 text-gray-200 border-gray-500",
      }
    }
  }

  const styles = getThemeStyles()

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason)
      setReason("")
    }
  }

  const handleClose = () => {
    setReason("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 ${styles.overlayBg} flex items-center justify-center z-50 p-4`}>
      <div
        className={`${styles.modalBg} rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all`}
        style={{
          background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Rejection Reason</h2>
            <button
              onClick={handleClose}
              className={`${styles.textMuted} hover:${styles.textPrimary} text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <label htmlFor="rejection-reason" className={`block text-sm font-medium ${styles.textSecondary} mb-2`}>
              Please provide a reason for rejection:
            </label>
            <textarea
              id="rejection-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Type the reason here..."
              rows={4}
              className={`w-full px-3 py-2 border ${styles.inputBorder} ${styles.inputBg} ${styles.textPrimary} rounded-md ${styles.inputFocus} focus:outline-none focus:ring-1 resize-none`}
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.inputBg || "#374151",
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={handleClose}
              className={`px-4 py-2 border ${styles.buttonSecondary} rounded-md transition-colors font-medium order-2 sm:order-1`}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!reason.trim()}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium order-1 sm:order-2"
            >
              Submit Rejection
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RejectionModal
