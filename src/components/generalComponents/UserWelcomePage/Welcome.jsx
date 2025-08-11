"use client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"

function Welcome() {
  const [isVisible, setIsVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [particlesVisible, setParticlesVisible] = useState(false)
  const { theme, currentTheme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 300)
    const timer2 = setTimeout(() => setTextVisible(true), 1500)
    const timer3 = setTimeout(() => setParticlesVisible(true), 2500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  // FORCE CONTAINER STYLES
  const containerStyle = {
    background: currentTheme === "classic" ? "#ffffff" : theme.colors.primaryBg,
    backgroundColor: currentTheme === "classic" ? "#ffffff" : theme.colors.primaryBg,
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  }

  // Get theme-aware text colors matching CTA component
  const getTextColors = () => {
    if (currentTheme === "classic") {
      return {
        title: "text-gray-800",
        subtitle: "text-gray-600",
        titleGradient: "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",
      }
    } else {
      return {
        title: theme.colors.primaryText,
        subtitle: theme.colors.secondaryText,
        titleGradient: null,
      }
    }
  }

  // Get theme-aware button styles matching CTA component
  const getButtonStyles = () => {
    if (currentTheme === "classic") {
      return {
        primary: {
          className:
            "group relative px-10 py-4 rounded-full font-semibold text-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white",
          style: {},
        },
        secondary: {
          className:
            "group relative px-10 py-4 backdrop-blur-sm rounded-full font-semibold text-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 border overflow-hidden bg-white/60 text-gray-800 border-purple-100/50 hover:bg-white/80",
          style: {},
        },
      }
    } else {
      return {
        primary: {
          className:
            "group relative px-10 py-4 rounded-full font-semibold text-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden",
          style: {
            background: theme.colors.primaryAccent,
            color: theme.colors.primaryText,
            boxShadow: `0 10px 30px ${theme.colors.glowColor}`,
          },
        },
        secondary: {
          className:
            "group relative px-10 py-4 backdrop-blur-sm rounded-full font-semibold text-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 border overflow-hidden",
          style: {
            backgroundColor: theme.colors.cardBg,
            color: theme.colors.primaryText,
            borderColor: theme.colors.borderColor,
            boxShadow: `0 10px 30px ${theme.colors.glowColor}`,
          },
        },
      }
    }
  }

  const textColors = getTextColors()
  const buttonStyles = getButtonStyles()

  return (
    <>
      {/* DEBUG PANEL */}
      <div className="fixed top-20 left-4 z-50 bg-black/90 text-white p-3 rounded-lg text-xs font-mono">
        <div>
          <strong>Current Theme:</strong> {currentTheme}
        </div>
        <div>
          <strong>Primary BG:</strong> {theme.colors.primaryBg}
        </div>
        <div>
          <strong>App BG:</strong> {theme.colors.appBg}
        </div>
        <div>
          <strong>Body Class:</strong> {document.body.className}
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={containerStyle}>
        {/* Conditional geometric patterns based on theme */}
        {currentTheme === "electric" && (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-96 h-96 opacity-20 animate-pulse"
              style={{
                background: theme.colors.shape1,
                clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 0% 80%)",
                transform: "rotate(15deg)",
              }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-80 h-80 opacity-15 animate-pulse delay-1000"
              style={{
                background: theme.colors.shape2,
                clipPath: "polygon(20% 0%, 100% 20%, 100% 100%, 0% 100%)",
                transform: "rotate(-20deg)",
              }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10"
              style={{
                background: theme.colors.shape3,
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                animation: "spin 30s linear infinite",
              }}
            ></div>
          </div>
        )}

        {/* Clean white theme gets pure white background */}
        {currentTheme === "classic" && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-white"></div>
          </div>
        )}

        {/* Floating orbs - different for each theme */}
        {currentTheme === "electric" && (
          <>
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-40"
              style={{ backgroundColor: `${theme.colors.particle1}33` }}
            ></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 opacity-40"
              style={{ backgroundColor: `${theme.colors.particle2}33` }}
            ></div>
          </>
        )}

        {currentTheme === "classic" && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-0"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 opacity-0"></div>
          </>
        )}

        {/* Main content */}
        <div
          className={`text-center z-10 relative transition-all duration-[4000ms] ease-out transform ${
            isVisible ? "translate-y-0 opacity-100 scale-100 blur-0" : "translate-y-20 opacity-0 scale-95 blur-sm"
          }`}
        >
          {/* Title */}
          <div className="mb-12">
            {currentTheme === "classic" ? (
              <h1 className={`text-6xl md:text-8xl font-bold drop-shadow-2xl ${textColors.titleGradient}`}>
                Welcome To PassGo
              </h1>
            ) : (
              <h1
                className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent drop-shadow-2xl"
                style={{
                  backgroundImage: theme.colors.primaryAccent,
                  textShadow: `0 0 30px ${theme.colors.glowColor}`,
                  color: theme.colors.primaryText,
                }}
              >
                Welcome To PassGo
              </h1>
            )}

            {/* Animated underline */}
            <div
              className={`h-1 mx-auto mt-8 rounded-full transition-all duration-[3000ms] delay-1000 ${
                isVisible ? "w-48 opacity-100" : "w-0 opacity-0"
              }`}
              style={{
                background:
                  currentTheme === "classic"
                    ? "linear-gradient(to right, #7c3aed, #2563eb)"
                    : theme.colors.primaryAccent,
                boxShadow:
                  currentTheme === "classic"
                    ? "0 0 20px rgba(124, 58, 237, 0.3)"
                    : `0 0 20px ${theme.colors.glowColor}`,
              }}
            ></div>
          </div>

          {/* Subtitle */}
          <div className="mb-16 overflow-hidden">
            <p
              className={`text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed transition-all duration-[2500ms] delay-1500 ${
                textVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              } ${currentTheme === "classic" ? textColors.subtitle : ""}`}
              style={currentTheme === "classic" ? {} : { color: theme.colors.secondaryText }}
            >
              Find your experience - buy ticket or become a host
            </p>
          </div>

          {/* Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-[2000ms] delay-2000 ${
              textVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
            }`}
          >
            <button
              className={buttonStyles.primary.className}
              style={buttonStyles.primary.style}
              onClick={() => navigate("/user/home")}
            >
              <span className="relative z-10 font-bold">Get Started</span>
            </button>

            <button className={buttonStyles.secondary.className} style={buttonStyles.secondary.style}>
              <span className="relative z-10">Learn More</span>
            </button>
          </div>
        </div>

        {/* Floating particles */}
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-[3000ms] delay-2500 ${
            particlesVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-float-slow opacity-80"
            style={{
              backgroundColor: currentTheme === "classic" ? "#7c3aed" : theme.colors.particle1,
              boxShadow: currentTheme === "classic" ? "0 0 10px #7c3aed" : `0 0 10px ${theme.colors.particle1}`,
            }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full animate-float-slow delay-1000 opacity-80"
            style={{
              backgroundColor: currentTheme === "classic" ? "#8b5cf6" : theme.colors.particle2,
              boxShadow: currentTheme === "classic" ? "0 0 8px #8b5cf6" : `0 0 8px ${theme.colors.particle2}`,
            }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full animate-float-slow delay-2000 opacity-80"
            style={{
              backgroundColor: currentTheme === "classic" ? "#a855f7" : theme.colors.particle3,
              boxShadow: currentTheme === "classic" ? "0 0 8px #a855f7" : `0 0 8px ${theme.colors.particle3}`,
            }}
          ></div>
          <div
            className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full animate-float-slow delay-3000 opacity-80"
            style={{
              backgroundColor: currentTheme === "classic" ? "#9333ea" : theme.colors.particle4,
              boxShadow: currentTheme === "classic" ? "0 0 10px #9333ea" : `0 0 10px ${theme.colors.particle4}`,
            }}
          ></div>
        </div>

        <style jsx>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
            25% { transform: translateY(-20px) translateX(10px); opacity: 1; }
            50% { transform: translateY(-10px) translateX(-5px); opacity: 0.9; }
            75% { transform: translateY(-30px) translateX(15px); opacity: 1; }
          }
          @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        `}</style>
      </div>
    </>
  )
}

export default Welcome
