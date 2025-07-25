"use client"
import { useTheme } from "../../contexts/ThemeContext"
import EventDetails from "../../components/UserComponents/EventDetails"
import Footer from "../../components/generalComponents/Footer"
import UserEventPageNavbar from "../../components/UserComponents/Navbar/UserEventPageNavbar"
import UserSidebar from "../../components/generalComponents/SideBars/UserEventSideBar"
import Breadcrumb from "@/components/UI/Breadcrumb/Breadcrumb"

function UserEventDetailPage() {
  const { currentTheme, theme } = useTheme()

  // Theme-based styling
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        mainBg: "bg-gray-50",
        contentBg: "bg-white",
        borderColor: "border-gray-200",
        headerBg: "bg-white",
        headerShadow: "shadow-sm",
      }
    } else {
      return {
        mainBg: theme?.colors?.primaryBg || "bg-gray-900",
        contentBg: theme?.colors?.secondaryBg || "bg-gray-800",
        borderColor: "border-gray-700",
        headerBg: theme?.colors?.secondaryBg || "bg-gray-800",
        headerShadow: "shadow-lg",
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
      {/* User Navbar - Fixed at top */}
      <div className="flex-shrink-0 z-10">
        <Breadcrumb/>
        <header
          className={`${styles.headerShadow} border-b ${styles.borderColor} sticky top-0`}
          style={{
            background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
          }}
        >
          <UserEventPageNavbar />
        </header>
      </div>

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed width */}
        <div className="flex-shrink-0">
          <aside>
            <UserSidebar />
          </aside>
        </div>

        {/* Main content - Flexible width */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Content wrapper with theme support */}
              <div
                className={`rounded-lg shadow-sm ${styles.borderColor} border min-h-[calc(100vh-200px)]`}
                style={{
                  background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
                }}
              >
                <EventDetails />
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

export default UserEventDetailPage
