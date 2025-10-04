"use client"
import BecomeHostForm from "../../components/HostComponets/BecomeHost/BecomeHostForm"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { useTheme } from "../../contexts/ThemeContext"
import Footer from "../../components/generalComponents/Footer"

//added a console.log for checking 


function BecomeHostPage() {
  const { role } = useSelector((state) => state.auth)
  const { currentTheme, theme } = useTheme()

  if (role === "host") {
    return <Navigate to="/host" replace />
  }

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
      <div className="flex-1 overflow-y-auto relative">
        <div className="p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            <div
              className={`rounded-lg shadow-sm ${styles.borderColor} border min-h-[calc(100vh-200px)]`}
              style={{
                background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
                animation: "fadeInUp 0.6s ease-out",
                animationDelay: "0.2s",
                animationFillMode: "both",
              }}
            >
              <BecomeHostForm />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`border-t flex-shrink-0 ${styles.borderColor}`}
        style={{
          background: currentTheme === "classic" ? "#ffffff" : theme?.colors?.secondaryBg || "#1f2937",
          animation: "fadeInUp 0.6s ease-out",
          animationDelay: "0.4s",
          animationFillMode: "both",
        }}
      >
        <Footer />
      </div>

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

      <style jsx>{`
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
      `}</style>

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
          // Smooth scroll behavior
          document.documentElement.style.scrollBehavior = 'smooth';
        `,
        }}
      />
    </div>
  )
}

export default BecomeHostPage
