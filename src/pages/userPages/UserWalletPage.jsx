"use client"
import UserEventPageNavbar from "../../components/UserComponents/Navbar/UserEventPageNavbar"
import UserSidebar from "../../components/generalComponents/SideBars/UserEventSideBar"
import UserWallet from "../../components/UserComponents/wallet/UserWallet"
import Footer from "../../components/generalComponents/Footer"
import { useTheme } from "../../contexts/ThemeContext"

function UserWalletPage() {
  const { currentTheme, theme } = useTheme()

  // Theme-based styling
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        mainBg: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
        containerBg: "bg-white",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-700",
        textMuted: "text-gray-500",
        borderColor: "border-gray-200",
        shadowColor: "shadow-gray-200/50",
      }
    } else {
      return {
        mainBg: "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900",
        containerBg: theme?.colors?.secondaryBg || "bg-gray-800",
        textPrimary: "text-white",
        textSecondary: "text-gray-200",
        textMuted: "text-gray-400",
        borderColor: "border-gray-600",
        shadowColor: "shadow-gray-900/50",
      }
    }
  }

  const styles = getThemeStyles()

  return (
    <div
      className={`min-h-screen ${styles.mainBg} flex flex-col`}
      style={{
        background:
          currentTheme === "classic"
            ? "linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #f3f4f6 100%)"
            : theme?.colors?.primaryBg || "linear-gradient(135deg, #111827 0%, #1f2937 50%, #0f172a 100%)",
      }}
    >
      {/* Navigation Bar - Fixed at top */}
      <div
        className="sticky top-0 z-50 w-full"
        style={{
          animation: "slideInDown 0.6s ease-out",
        }}
      >
        <UserEventPageNavbar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 relative">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div
          className="hidden lg:block fixed left-0 top-0 h-full z-40 pt-16"
          style={{
            animation: "slideInLeft 0.6s ease-out",
            animationDelay: "0.2s",
            animationFillMode: "both",
          }}
        >
          <UserSidebar />
        </div>

        {/* Mobile Sidebar Overlay - Only visible when sidebar is open */}
        <div className="lg:hidden fixed inset-0 z-40 pt-16" id="mobile-sidebar-overlay" style={{ display: "none" }}>
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
            <UserSidebar />
          </div>
        </div>

        {/* Main Content Container */}
        <div
          className="flex-1 w-full lg:ml-64 transition-all duration-300"
          style={{
            animation: "fadeInUp 0.6s ease-out",
            animationDelay: "0.4s",
            animationFillMode: "both",
          }}
        >
          {/* Content Wrapper */}
          <div className="min-h-screen flex flex-col">
            {/* Main Content */}
            <main className="flex-1 relative">
              {/* Mobile Menu Button - Only visible on mobile */}
              <div className="lg:hidden fixed top-20 left-4 z-30">
                <button
                  onClick={() => {
                    document.getElementById("mobile-sidebar-overlay").style.display = "block"
                  }}
                  className={`p-2 rounded-lg ${styles.containerBg} ${styles.shadowColor} shadow-lg border ${styles.borderColor} transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  style={{
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                >
                  <svg
                    className={`w-6 h-6 ${styles.textPrimary}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Wallet Component */}
              <div
                className="w-full"
                style={{
                  animation: "slideInUp 0.6s ease-out",
                  animationDelay: "0.6s",
                  animationFillMode: "both",
                }}
              >
                <UserWallet />
              </div>
            </main>

            {/* Footer */}
            <div
              className="w-full mt-auto"
              style={{
                animation: "fadeInUp 0.6s ease-out",
                animationDelay: "0.8s",
                animationFillMode: "both",
              }}
            >
              <Footer />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        id="scroll-to-top"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        className={`fixed bottom-6 right-6 p-3 rounded-full ${styles.containerBg} ${styles.shadowColor} shadow-lg border ${styles.borderColor} transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-50`}
        style={{
          display: "none",
          animation: "bounceIn 0.5s ease-out",
        }}
      >
        <svg className={`w-6 h-6 ${styles.textPrimary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Loading Overlay - Hidden by default */}
      <div
        id="loading-overlay"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        style={{ display: "none" }}
      >
        <div className={`${styles.containerBg} rounded-2xl p-8 shadow-2xl border ${styles.borderColor}`}>
          <div className="flex flex-col items-center space-y-4">
            <div
              className={`w-12 h-12 border-4 ${currentTheme === "classic" ? "border-indigo-200 border-t-indigo-600" : "border-blue-200 border-t-blue-400"} rounded-full`}
              style={{
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <p className={`text-lg font-semibold ${styles.textPrimary}`}>Loading...</p>
          </div>
        </div>
      </div>

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

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
          background: ${currentTheme === "classic" ? "#f1f5f9" : "#374151"};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: ${currentTheme === "classic" ? "#cbd5e1" : "#6b7280"};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme === "classic" ? "#94a3b8" : "#9ca3af"};
        }

        /* Smooth transitions for all elements */
        * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }

        /* Responsive utilities */
        @media (max-width: 1024px) {
          .sidebar-offset {
            margin-left: 0 !important;
          }
        }

        /* Focus styles for accessibility */
        button:focus,
        a:focus {
          outline: 2px solid ${currentTheme === "classic" ? "#6366f1" : "#60a5fa"};
          outline-offset: 2px;
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
            // Close sidebar with Escape key
            if (event.key === 'Escape') {
              const sidebar = document.getElementById('mobile-sidebar-overlay');
              if (sidebar && sidebar.style.display === 'block') {
                sidebar.style.display = 'none';
              }
            }
          });

          // Loading state management
          window.showLoading = function() {
            document.getElementById('loading-overlay').style.display = 'flex';
          };

          window.hideLoading = function() {
            document.getElementById('loading-overlay').style.display = 'none';
          };

          // Smooth scroll behavior
          document.documentElement.style.scrollBehavior = 'smooth';
        `,
        }}
      />
    </div>
  )
}

export default UserWalletPage
