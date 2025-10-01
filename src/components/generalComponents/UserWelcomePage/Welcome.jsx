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

  // FORCE CONTAINER STYLES (Kept unchanged)
  const containerStyle = {
    background: currentTheme === "classic" ? "#ffffff" : theme.colors.primaryBg,
    backgroundColor: currentTheme === "classic" ? "#ffffff" : theme.colors.primaryBg,
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  }

  // Get theme-aware text colors matching CTA component (Kept unchanged)
  const getTextColors = () => {
    if (currentTheme === "classic") {
      return {
        title: "#1f2937",
        subtitle: "#4b5563",
        buttonText: "#ffffff",
        buttonBg: theme.colors.primaryAccent,
      }
    }
    return {
      title: theme.colors.primaryText,
      subtitle: theme.colors.secondaryText,
      buttonText: "#ffffff",
      buttonBg: theme.colors.primaryAccent,
    }
  }

  return (
    <div className="relative pt-24 pb-48 text-center transition-all duration-1000" style={containerStyle}>
      {/* Background Particles (Animated) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${particlesVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div
          className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full animate-float-slow delay-0 opacity-80"
          style={{
            backgroundColor: currentTheme === "classic" ? "#6366f1" : theme.colors.particle1,
            boxShadow: currentTheme === "classic" ? "0 0 12px #6366f1" : `0 0 12px ${theme.colors.particle1}`,
          }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full animate-float-slow delay-1000 opacity-80"
          style={{
            backgroundColor: currentTheme === "classic" ? "#c026d3" : theme.colors.particle2,
            boxShadow: currentTheme === "classic" ? "0 0 15px #c026d3" : `0 0 15px ${theme.colors.particle2}`,
          }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full animate-float-slow delay-2000 opacity-80"
          style={{
            backgroundColor: currentTheme === "classic" ? "#a855f7" : theme.colors.particle3,
            boxShadow: currentTheme === "classic" ? "0 0 8px #a855f7" : `0 0 8px ${theme.colors.particle3}`,
          }}
        ></div>
        <div
          className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full animate-float-slow delay-3000 opacity-80"
          style={{
            backgroundColor: currentTheme === "classic" ? "#9333ea" : theme.colors.particle4,
            boxShadow: currentTheme === "classic" ? "0 0 10px #9333ea" : `0 0 10px ${theme.colors.particle4}`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Title (Increased Size and Staggered Animation) */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 leading-tight tracking-tighter relative z-20"
          style={{ color: getTextColors().title }}
        >
          {/* Staggered text animation with `textVisible` */}
          <span className={`block transition-all duration-1000 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            The Future of{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: theme.colors.primaryAccent }}
            >
              Live Events
            </span>
          </span>
          <span className={`block transition-all duration-1000 delay-500 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Is Here.
          </span>
        </h1>

        {/* Subtitle (Increased Size and Animated) */}
        <p
          className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-medium transition-all duration-1000 delay-[1000ms]"
          style={{ color: getTextColors().subtitle, opacity: textVisible ? 1 : 0 }}
        >
          Discover unforgettable experiences, sell out shows, and manage everything with unparalleled ease.
        </p>

        {/* CTA Button (Enhanced Styling and Animated) */}
        <button
          onClick={() => navigate("/user/events")}
          className={`px-10 py-3 text-xl font-semibold rounded-full shadow-2xl transition-all duration-700 delay-[1500ms]
            transform hover:scale-[1.05] hover:shadow-indigo-500/60
            ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          style={{
            backgroundColor: getTextColors().buttonBg,
            color: getTextColors().buttonText,
          }}
        >
          Explore Events Now
        </button>
      </div>

      {/* Existing CSS for float-slow animation */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 1; }
          50% { transform: translateY(-10px) translateX(-5px); opacity: 0.9; }
          75% { transform: translateY(-30px) translateX(15px); opacity: 1; }
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite alternate;
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-3000 { animation-delay: 3s; }
      `}</style>
    </div>
  )
}

export default Welcome