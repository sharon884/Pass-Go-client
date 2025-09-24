"use client"
// import { useTheme } from "../../contexts/ThemeContext"
import HostEvents from "../../components/HostComponets/HostEvent"
import Footer from "../../components/generalComponents/Footer"
import HostSidebar from "../../components/generalComponents/SideBars/HostSideBar"
import HostNavbar from "../../components/HostComponets/Navbar/HostNavbar"

function HostEventManagementPage() {
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
        background: "#f9fafb",
      }}
    >
      {/* Host Navbar - Fixed at top */}
      <div className="flex-shrink-0 z-10">
        <header
          className={`${styles.headerShadow} border-b ${styles.borderColor} sticky top-0`}
          style={{
            background: "#ffffff",
            animation: "slideInDown 0.6s ease-out",
          }}
        >
          <HostNavbar />
        </header>
      </div>

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed width, hidden on mobile */}
        <div
          className="flex-shrink-0 hidden lg:block"
          style={{
            animation: "slideInLeft 0.6s ease-out",
            animationDelay: "0.2s",
            animationFillMode: "both",
          }}
        >
          <HostSidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        <div id="mobile-sidebar-overlay" className="lg:hidden fixed inset-0 z-40" style={{ display: "none" }}>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => {
              document.getElementById("mobile-sidebar-overlay").style.display = "none"
            }}
          ></div>
          {/* Sidebar */}
          <div
            className="relative w-64 h-full"
            style={{
              animation: "slideInLeft 0.3s ease-out",
            }}
          >
            <HostSidebar />
          </div>
        </div>

        {/* Main content - Flexible width */}
        <div className="flex-1 overflow-y-auto relative">
          {/* Mobile Menu Button */}
          <div className="lg:hidden fixed top-20 left-4 z-30">
            <button
              onClick={() => {
                document.getElementById("mobile-sidebar-overlay").style.display = "block"
              }}
              className={`p-2 rounded-lg shadow-lg border ${styles.borderColor} transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            >
              <svg
                className={`w-6 h-6 ${currentTheme === "classic" ? "text-gray-900" : "text-white"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Content wrapper with theme support */}
              <div
                className={`rounded-lg shadow-sm ${styles.borderColor} border min-h-[calc(100vh-200px)]`}
                style={{
                  background: "#ffffff",
                  animation: "fadeInUp 0.6s ease-out",
                  animationDelay: "0.4s",
                  animationFillMode: "both",
                }}
              >
                <HostEvents />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div
        className={`border-t flex-shrink-0 ${styles.borderColor}`}
        style={{
          background: "#ffffff",
          animation: "fadeInUp 0.6s ease-out",
          animationDelay: "0.6s",
          animationFillMode: "both",
        }}
      >
        <Footer />
      </div>

      {/* Scroll to Top Button */}
      <button
        id="scroll-to-top"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg border ${styles.borderColor} transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-50`}
        style={{
          background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
          display: "none",
          animation: "bounceIn 0.5s ease-out",
        }}
      >
        <svg
          className={`w-6 h-6 ${currentTheme === "classic" ? "text-gray-900" : "text-white"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Inline Styles and Scripts */}
      <style jsx>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Smooth transitions */
        * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity,
            box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }

        /* Focus styles for accessibility */
        button:focus,
        a:focus {
          outline: 2px solid ${currentTheme === "classic" ? "#6366f1" : "#60a5fa"};
          outline-offset: 2px;
        }

        /* Responsive utilities */
        @media (max-width: 1024px) {
          .sidebar-offset {
            margin-left: 0 !important;
          }
        }
      `}</style>

      {/* JavaScript for interactive features */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          // Scroll to top button visibility
          window.addEventListener('scroll', function() {
            const scrollButton = document.getElementById('scroll-to-top');
            if (window.pageYOffset > 300) {
              scrollButton.style.display = 'block';
            } else {
              scrollButton.style.display = 'none';
            }
          });

          // Close mobile sidebar when clicking outside
          document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('mobile-sidebar-overlay');
            const menuButton = event.target.closest('button');
            
            if (sidebar && sidebar.style.display === 'block' && !event.target.closest('.sidebar-content') && !menuButton) {
              sidebar.style.display = 'none';
            }
          });

          // Keyboard navigation
          document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
              const sidebar = document.getElementById('mobile-sidebar-overlay');
              if (sidebar && sidebar.style.display === 'block') {
                sidebar.style.display = 'none';
              }
            }
          });

          // Smooth scroll behavior
          document.documentElement.style.scrollBehavior = 'smooth';
        `,
        }}
      />
    </div>
  )
}

export default HostEventManagementPage
