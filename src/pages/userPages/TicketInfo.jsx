"use client"
import { useTheme } from "../../contexts/ThemeContext"
import TicketInfo from "../../components/UserComponents/FreeTicket/TicketInfo"
import UserEventPageNavbar from "../../components/UserComponents/Navbar/UserEventPageNavbar"
import UserSidebar from "../../components/generalComponents/SideBars/UserEventSideBar"
import Footer from "../../components/generalComponents/Footer"

function TicketInfoPage() {
  const { currentTheme, theme } = useTheme()

  // Theme-based styling
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        mainBg: "bg-gray-50",
        contentBg: "bg-white",
        borderColor: "border-gray-200",
      }
    } else {
      return {
        mainBg: theme?.colors?.primaryBg || "bg-gray-900",
        contentBg: theme?.colors?.secondaryBg || "bg-gray-800",
        borderColor: "border-gray-700",
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
                        href="/user/home"
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
                      <svg
                        className={`w-4 h-4 ${currentTheme === "classic" ? "text-gray-400" : "text-gray-500"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </li>
                    <li>
                      <a
                        href="/tickets"
                        className={`${
                          currentTheme === "classic"
                            ? "text-gray-500 hover:text-gray-700"
                            : "text-gray-400 hover:text-gray-200"
                        } transition-colors`}
                      >
                        My Tickets
                      </a>
                    </li>
                    <li>
                      <svg
                        className={`w-4 h-4 ${currentTheme === "classic" ? "text-gray-400" : "text-gray-500"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </li>
                    <li>
                      <span className={`${currentTheme === "classic" ? "text-gray-900" : "text-white"} font-medium`}>
                        Ticket Details
                      </span>
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
                      <h1
                        className={`text-2xl sm:text-3xl font-bold ${
                          currentTheme === "classic" ? "text-gray-900" : "text-white"
                        }`}
                      >
                        Ticket Information
                      </h1>
                      <p
                        className={`mt-1 text-sm sm:text-base ${
                          currentTheme === "classic" ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        View and manage your ticket details
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
                        Download Ticket
                      </button>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors border border-transparent">
                        Share Ticket
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
                  <TicketInfo />
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

export default TicketInfoPage
