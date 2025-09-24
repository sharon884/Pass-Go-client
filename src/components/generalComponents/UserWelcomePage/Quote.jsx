"use client"

// import { useTheme } from "../../../contexts/ThemeContext"
import { useState, useEffect } from "react"

function Quote() {
  const quotes = [
    "Host with heart. Book with ease. PassGo is the way.",
    "Make every seat count",
    "No queues. No confusion. Just vibes.",
    "Your event, your audience, your rules.",
    "The easiest way to sell out your next show.",
    "Discover. Book. Celebrate.",
    "From local shows to mega fests — we power them all.",
    "Seats are limited, memories aren't.",
    "PassGo: where every ticket tells a story.",
    "Buy tickets in seconds. Host with confidence.",
  ]

  const [currentQuote, setCurrentQuote] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  // const { theme, currentTheme } = useTheme()

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
        setIsVisible(true)
      }, 500)
    }, 4000)
    return () => clearInterval(interval)
  }, [quotes.length, isPaused])

  const handleDotClick = (index) => {
    setIsPaused(true)
    setIsVisible(false)
    setTimeout(() => {
      setCurrentQuote(index)
      setIsVisible(true)
      setTimeout(() => setIsPaused(false), 2000)
    }, 300)
  }

  // Get theme-aware styles
  const getThemeStyles = () => {
    if (currentTheme === "classic") {
      return {
        containerBg: "#ffffff",
        overlayBg: "#ffffff",
        cardBg: "rgba(255, 255, 255, 0.95)",
        cardBorder: "rgba(147, 51, 234, 0.1)",
        cardShadow: "0 25px 50px rgba(0, 0, 0, 0.05)",
        quoteText: "#1f2937",
        instructionText: "#6b7280",
        iconBg: "linear-gradient(to right, #7c3aed, #8b5cf6)",
        iconShadow: "0 10px 25px rgba(124, 58, 237, 0.25)",
        dotActive: "linear-gradient(to right, #7c3aed, #8b5cf6)",
        dotActiveShadow: "0 0 15px rgba(124, 58, 237, 0.5)",
        dotInactive: "rgba(147, 51, 234, 0.2)",
        shape1: "rgba(255, 255, 255, 0.5)",
        shape2: "rgba(255, 255, 255, 0.3)",
        blur1: "rgba(147, 51, 234, 0.05)",
        blur2: "rgba(168, 85, 247, 0.05)",
      }
    } else {
      return {
        containerBg: theme.colors.primaryBg,
        overlayBg: `linear-gradient(90deg, rgba(0,191,255,0.1) 0%, rgba(59,130,246,0.1) 50%, rgba(0,196,255,0.1) 100%)`,
        cardBg: theme.colors.cardBg,
        cardBorder: theme.colors.borderColor,
        cardShadow: `0 25px 50px ${theme.colors.glowColor}`,
        quoteText: theme.colors.primaryText,
        instructionText: "#94a3b8",
        iconBg: theme.colors.primaryAccent,
        iconShadow: `0 10px 25px ${theme.colors.glowColor}`,
        dotActive: theme.colors.primaryAccent,
        dotActiveShadow: `0 0 15px ${theme.colors.glowColor}`,
        dotInactive: "rgba(148,163,184,0.3)",
        shape1: theme.colors.shape1,
        shape2: theme.colors.shape2,
        blur1: `linear-gradient(135deg, rgba(0,191,255,0.2), rgba(59,130,246,0.2))`,
        blur2: `linear-gradient(45deg, rgba(37,99,235,0.2), rgba(0,196,255,0.2))`,
      }
    }
  }

  const styles = getThemeStyles()

  return (
    <div className="py-12 md:py-20 relative overflow-hidden" style={{ background: styles.containerBg }}>
      {/* Geometric Background Effects - Theme Aware */}
      <div className="absolute inset-0 overflow-hidden">
        {currentTheme === "electric" ? (
          <>
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-15"
              style={{
                background: styles.shape1,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 20% 100%)",
                transform: "rotate(25deg)",
              }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-48 h-48 opacity-15"
              style={{
                background: styles.shape2,
                clipPath: "polygon(0% 20%, 80% 0%, 100% 100%, 0% 100%)",
                transform: "rotate(-15deg)",
              }}
            ></div>
          </>
        ) : (
          <>
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-10 rounded-full blur-3xl"
              style={{ background: styles.shape1 }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-48 h-48 opacity-10 rounded-full blur-3xl"
              style={{ background: styles.shape2 }}
            ></div>
          </>
        )}
      </div>

      {/* Professional background effects */}
      <div className="absolute inset-0" style={{ background: styles.overlayBg }}></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Quote Section */}
          <div
            className="backdrop-blur-lg rounded-3xl shadow-2xl border p-6 md:p-12 relative overflow-hidden mb-0"
            style={{
              backgroundColor: styles.cardBg,
              borderColor: styles.cardBorder,
              boxShadow: styles.cardShadow,
            }}
          >
            {/* Background decoration */}
            <div
              className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 rounded-full blur-2xl"
              style={{ background: styles.blur1 }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-16 md:w-24 h-16 md:h-24 rounded-full blur-2xl"
              style={{ background: styles.blur2 }}
            ></div>

            <div className="relative z-10">
              <div
                className={`text-center transition-all duration-500 transform ${
                  isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
                }`}
              >
                {/* Quote icon */}
                <div className="mb-4 md:mb-6">
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: styles.iconBg,
                      boxShadow: styles.iconShadow,
                    }}
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="#ffffff" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>

                {/* Quote text */}
                <blockquote
                  className="text-lg md:text-2xl lg:text-3xl font-medium leading-relaxed px-2 md:px-4"
                  style={{ color: styles.quoteText }}
                >
                  {quotes[currentQuote]}
                </blockquote>

                {/* Mouse cursor icon */}
                <div className="flex justify-center mt-6 md:mt-8 mb-4">
                  <div className="flex items-center space-x-2 text-sm" style={{ color: styles.instructionText }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span>Click dots to navigate</span>
                  </div>
                </div>

                {/* Clickable dots */}
                <div className="flex justify-center space-x-2 flex-wrap">
                  {quotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`transition-all duration-300 rounded-full cursor-pointer hover:scale-125 ${
                        index === currentQuote ? "w-6 md:w-8 h-2" : "w-2 h-2 hover:opacity-70"
                      }`}
                      style={{
                        background: index === currentQuote ? styles.dotActive : styles.dotInactive,
                        boxShadow: index === currentQuote ? styles.dotActiveShadow : "none",
                      }}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quote
