"use client"

import { useState } from "react"
// import { useTheme } from "../../contexts/ThemeContext"

const AddOfferModal = ({ onClose, onSubmit }) => {
  const [discountType, setDiscountType] = useState("percentage")
  const [value, setValue] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [minTickets, setMinTickets] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
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
        inputFocus: "focus:border-blue-500 focus:ring-blue-500",
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!value || !expiryDate) {
      alert("Please fill all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      const offerData = {
        discountType,
        value: Number(value),
        expiryDate,
        miniiTickets: minTickets ? Number(minTickets) : undefined,
      }
      await onSubmit(offerData)
    } catch (error) {
      console.error("Error submitting offer:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${styles.overlayBg} flex items-center justify-center p-4`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modalBg} rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100`}
        style={{
          background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Add New Offer</h2>
                <p className={`text-sm ${styles.textMuted}`}>Create an attractive discount for your event</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className={`${styles.textMuted} hover:${styles.textPrimary} text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-50`}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Discount Type */}
            <div>
              <label htmlFor="discountType" className={`block text-sm font-medium ${styles.textSecondary} mb-2`}>
                Discount Type <span className="text-red-500">*</span>
              </label>
              <select
                id="discountType"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className={`w-full px-4 py-3 border ${styles.inputBorder} ${styles.inputBg} ${styles.textPrimary} rounded-lg ${styles.inputFocus} focus:outline-none focus:ring-2 transition-colors`}
                style={{
                  background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.inputBg || "#374151",
                }}
                disabled={isSubmitting}
              >
                <option value="percentage">Percentage Discount</option>
                <option value="flat">Flat Amount Discount</option>
              </select>
            </div>

            {/* Discount Value */}
            <div>
              <label htmlFor="discountValue" className={`block text-sm font-medium ${styles.textSecondary} mb-2`}>
                Discount Value <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="discountValue"
                  type="number"
                  min="1"
                  max={discountType === "percentage" ? "100" : undefined}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className={`w-full px-4 py-3 border ${styles.inputBorder} ${styles.inputBg} ${styles.textPrimary} rounded-lg ${styles.inputFocus} focus:outline-none focus:ring-2 transition-colors`}
                  style={{
                    background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.inputBg || "#374151",
                  }}
                  placeholder={discountType === "percentage" ? "e.g. 10 (for 10% off)" : "e.g. 100 (for ₹100 off)"}
                  required
                  disabled={isSubmitting}
                />
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${styles.textMuted} text-sm`}>
                  {discountType === "percentage" ? "%" : "₹"}
                </div>
              </div>
              {discountType === "percentage" && (
                <p className={`text-xs ${styles.textMuted} mt-1`}>Enter a value between 1-100</p>
              )}
            </div>

            {/* Expiry Date */}
            <div>
              <label htmlFor="expiryDate" className={`block text-sm font-medium ${styles.textSecondary} mb-2`}>
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full px-4 py-3 border ${styles.inputBorder} ${styles.inputBg} ${styles.textPrimary} rounded-lg ${styles.inputFocus} focus:outline-none focus:ring-2 transition-colors`}
                style={{
                  background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.inputBg || "#374151",
                }}
                required
                disabled={isSubmitting}
              />
              <p className={`text-xs ${styles.textMuted} mt-1`}>Offer will expire at the end of this date</p>
            </div>

            {/* Minimum Tickets (Optional) */}
            <div>
              <label htmlFor="minTickets" className={`block text-sm font-medium ${styles.textSecondary} mb-2`}>
                Minimum Tickets (Optional)
              </label>
              <input
                id="minTickets"
                type="number"
                min="1"
                value={minTickets}
                onChange={(e) => setMinTickets(e.target.value)}
                className={`w-full px-4 py-3 border ${styles.inputBorder} ${styles.inputBg} ${styles.textPrimary} rounded-lg ${styles.inputFocus} focus:outline-none focus:ring-2 transition-colors`}
                style={{
                  background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.inputBg || "#374151",
                }}
                placeholder="e.g. 2 (minimum tickets to apply offer)"
                disabled={isSubmitting}
              />
              <p className={`text-xs ${styles.textMuted} mt-1`}>Leave empty if no minimum ticket requirement</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className={`flex-1 px-6 py-3 border ${styles.buttonSecondary} rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !value || !expiryDate}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium transform hover:scale-105 active:scale-95"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Offer...
                  </div>
                ) : (
                  "Add Offer"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddOfferModal
