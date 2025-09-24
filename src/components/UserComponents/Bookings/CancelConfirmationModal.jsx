"use client"

const CancelConfirmationModal = ({ isOpen, onClose, onConfirm, amountToRefund, bookingType }) => {
  // Theme-based styling
  const getThemeStyles = () => {
    // Force classic white theme only
    return {
      modalBg: "bg-white",
      overlayBg: "bg-black bg-opacity-50",
      textPrimary: "text-gray-900",
      textSecondary: "text-gray-700",
      textMuted: "text-gray-500",
      borderColor: "border-gray-200",
      buttonSecondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300",
    }
  }

  const styles = getThemeStyles()

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 ${styles.overlayBg} flex items-center justify-center z-50 p-4`}>
      <div
        className={`${styles.modalBg} rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all`}
        style={{ background: "#ffffff" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Confirm Cancellation</h2>
            <button
              onClick={onClose}
              className={`${styles.textMuted} hover:${styles.textPrimary} text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors`}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <p className={`text-base ${styles.textSecondary} mb-4`}>
              Are you sure you want to cancel this {bookingType === "order" ? "paid ticket" : "free ticket"}?
            </p>
            {bookingType === "order" && amountToRefund !== undefined && (
              <p className={`text-lg font-semibold ${styles.textPrimary}`}>
                You will receive a refund of{" "}
                <span className="text-green-600">₹{amountToRefund.toFixed(2)}</span>.
              </p>
            )}
            {bookingType === "ticket" && (
              <p className={`text-lg font-semibold ${styles.textPrimary}`}>
                This action cannot be undone.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={onClose}
              className={`px-4 py-2 border ${styles.buttonSecondary} rounded-md transition-colors font-medium order-2 sm:order-1`}
            >
              No, Keep It
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium order-1 sm:order-2"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CancelConfirmationModal
