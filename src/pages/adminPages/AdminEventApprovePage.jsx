"use client"
import { useTheme } from "../../contexts/ThemeContext"
import Footer from "../../components/generalComponents/Footer"
import AdminNavbar from "../../components/AdminComponents/Navbar"
import EventVerificationAdmin from "../../components/AdminComponents/EventManagement/EventVerification"
import AdminSidebar from "../../components/generalComponents/SideBar"

function AdminEventApprovePage() {
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
      {/* Admin Navbar - Fixed at top */}
      <div className="flex-shrink-0 z-10">
        <AdminNavbar />
      </div>

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed width */}
        <div className="flex-shrink-0">
          <AdminSidebar />
        </div>

        {/* Main content - Flexible width */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Content wrapper with theme support */}
              <div
                className={`rounded-lg shadow-sm ${styles.borderColor} border`}
                style={{
                  background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
                }}
              >
                <EventVerificationAdmin />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div
        className={`border-t flex-shrink-0 ${styles.borderColor}`}
        style={{
          background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
        }}
      >
        <Footer />
      </div>
    </div>
  )
}

export default AdminEventApprovePage
