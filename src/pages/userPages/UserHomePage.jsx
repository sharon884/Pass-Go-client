"use client"
// import { useTheme } from "../../contexts/ThemeContext"
import Footer from "../../components/generalComponents/Footer"
import UserEvents from "../../components/UserComponents/UserEvent"
import UserSidebar from "../../components/generalComponents/SideBars/UserEventSideBar"
import UserEventPageNavbar from "../../components/UserComponents/Navbar/UserEventPageNavbar"

function UserHomePage() {
  // const { currentTheme, theme } = useTheme()

  // Theme-based styling
  const getThemeStyles = () => {
    // Force classic white theme styles
    return {
      mainBg: "bg-gray-50",
      contentBg: "bg-white",
      borderColor: "border-gray-200",
      headerBg: "bg-white",
      headerShadow: "shadow-sm",
    }
  }

  const styles = getThemeStyles()

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        // Classic white background
        background: "#f9fafb",
      }}
    >
      {/* User Navbar - Fixed at top */}
      <div className="flex-shrink-0 z-10">
        <header
          className={`${styles.headerShadow} border-b ${styles.borderColor} sticky top-0`}
          style={{
            // Classic white header background
            background: "#ffffff",
          }}
        >
          <UserEventPageNavbar />
        </header>
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
              {/* Content wrapper with theme support */}
              <div
                className={`rounded-lg shadow-sm ${styles.borderColor} border min-h-[calc(100vh-200px)]`}
                style={{
                  // Classic white content background
                  background: "#ffffff",
                }}
              >
                <UserEvents />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div
        className={`border-t flex-shrink-0 ${styles.borderColor}`}
        style={{
          // Classic white footer background
          background: "#ffffff",
        }}
      >
        <Footer />
      </div>
    </div>
  )
}

export default UserHomePage
