"use client"
import { useTheme } from "../../contexts/ThemeContext"
import PaymentSuccess from "../../components/UserComponents/Payment/PaymentSuccess"
import UserEventPageNavbar from "../../components/UserComponents/Navbar/UserEventPageNavbar"
import UserSidebar from "../../components/generalComponents/SideBars/UserEventSideBar"
import Footer from "../../components/generalComponents/Footer"

function UserPaymentSuccess() {
  const { currentTheme, theme } = useTheme()

  // Theme-based styling
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        mainBg: "bg-gray-50",
        contentBg: "bg-white",
        borderColor: "border-gray-200",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-600",
        textMuted: "text-gray-500",
      }
    } else {
      return {
        mainBg: theme?.colors?.primaryBg || "bg-gray-900",
        contentBg: theme?.colors?.cardBg || "bg-gray-800",
        borderColor: "border-gray-700",
        textPrimary: "text-white",
        textSecondary: "text-gray-200",
        textMuted: "text-gray-400",
      }
    }
  }

  const styles = getThemeStyles()

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: currentTheme === "classic" ? "#f9fafb" : theme?.colors?.primaryBg || "#111827",
      }}
    >
      {/* Navbar - Fixed at top */}
      <div className="flex-shrink-0 z-10">
        <UserEventPageNavbar />
      </div>

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed width */}
        <div className="flex-shrink-0">
          <UserSidebar />
        </div>

        {/* Main content - Flexible width */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb Navigation */}
              <div className="mb-6">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2 text-sm">
                    <li>
                      <a
                        href="/dashboard"
                        className={`${
                          currentTheme === "classic"
                            ? "text-gray-500 hover:text-gray-700"
                            : "text-gray-400 hover:text-gray-200"
                        } transition-colors`}
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <svg className={`w-4 h-4 ${styles.textMuted}`} fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </li>
                    <li>
                      <a
                        href="/bookings"
                        className={`${
                          currentTheme === "classic"
                            ? "text-gray-500 hover:text-gray-700"
                            : "text-gray-400 hover:text-gray-200"
                        } transition-colors`}
                      >
                        My Bookings
                      </a>
                    </li>
                    <li>
                      <svg className={`w-4 h-4 ${styles.textMuted}`} fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </li>
                    <li>
                      <span className={`${styles.textPrimary} font-medium`}>Payment Success</span>
                    </li>
                  </ol>
                </nav>
              </div>

              {/* Page Header */}
              <div className="mb-6">
                <div
                  className={`rounded-lg shadow-sm p-6 border ${styles.borderColor}`}
                  style={{
                    background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {/* Success Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <h1 className={`text-2xl sm:text-3xl font-bold ${styles.textPrimary}`}>Payment Successful!</h1>
                      </div>
                      <p className={`text-sm sm:text-base ${styles.textSecondary}`}>
                        Your payment has been processed successfully. Thank you for your purchase!
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        className={`
                        px-4 py-2 rounded-md text-sm font-medium transition-colors border
                        ${
                          currentTheme === "classic"
                            ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                            : "bg-gray-600 hover:bg-gray-500 text-gray-200 border-gray-500"
                        }
                      `}
                      >
                        Download Receipt
                      </button>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors border border-transparent">
                        View Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-6">
                <div
                  className={`rounded-lg shadow-sm border ${styles.borderColor}`}
                  style={{
                    background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
                  }}
                >
                  <PaymentSuccess />
                </div>

                {/* Additional Information Card */}
                <div
                  className={`rounded-lg shadow-sm border ${styles.borderColor} p-6`}
                  style={{
                    background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
                  }}
                >
                  <h3 className={`text-lg font-semibold ${styles.textPrimary} mb-4`}>What's Next?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-lg ${currentTheme === "classic" ? "bg-gray-50" : "bg-gray-700"}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <h4 className={`font-medium ${styles.textPrimary}`}>Check Your Email</h4>
                      </div>
                      <p className={`text-sm ${styles.textSecondary}`}>
                        A confirmation email with your ticket details has been sent to your registered email address.
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg ${currentTheme === "classic" ? "bg-gray-50" : "bg-gray-700"}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                            />
                          </svg>
                        </div>
                        <h4 className={`font-medium ${styles.textPrimary}`}>Your Tickets</h4>
                      </div>
                      <p className={`text-sm ${styles.textSecondary}`}>
                        Your tickets are now available in your account. You can view and download them anytime.
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg ${currentTheme === "classic" ? "bg-gray-50" : "bg-gray-700"}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 2m8-2l2 2m-2-2v6a2 2 0 01-2 2H10a2 2 0 01-2-2v-6"
                            />
                          </svg>
                        </div>
                        <h4 className={`font-medium ${styles.textPrimary}`}>Event Day</h4>
                      </div>
                      <p className={`text-sm ${styles.textSecondary}`}>
                        Present your ticket (digital or printed) at the event venue for entry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div
        className={`border-t flex-shrink-0 ${styles.borderColor}`}
        style={{
          background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.cardBg || "#1f2937",
        }}
      >
        <Footer />
      </div>
    </div>
  )
}

export default UserPaymentSuccess
