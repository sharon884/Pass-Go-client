"use client"

import { useTheme } from "../../../contexts/ThemeContext"
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
  const { theme, currentTheme } = useTheme()

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
      setTimeout(() => setIsPaused(false), 3000) // Pause for a few seconds after manual change
    }, 500)
  }

  const styles = {
    containerBg: currentTheme === "classic" ? "#ffffff" : theme.colors.primaryBg,
    quoteText: currentTheme === "classic" ? "#1f2937" : theme.colors.primaryText,
    instructionText: currentTheme === "classic" ? "#6b7280" : theme.colors.secondaryText,
    dotColor: theme.colors.primaryAccent,
  }

  return (
    <div
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: styles.containerBg }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="min-h-[150px] md:min-h-[200px] flex items-center justify-center relative">
          {/* Increased Text Size and Enhanced Transition */}
          <p
            key={currentQuote} // Re-render forces the transition to run
            className={`text-center font-serif text-2xl md:text-4xl italic font-bold max-w-3xl leading-relaxed
              transition-all duration-500 ease-out absolute 
              ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
            `}
            style={{ color: styles.quoteText }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            “{quotes[currentQuote]}”
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="flex items-center space-x-2 text-sm" style={{ color: styles.instructionText }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>Click dots to navigate</span>
          </div>

          {/* Clickable dots (Kept unchanged structurally) */}
          <div className="flex justify-center space-x-2 flex-wrap mt-4">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full cursor-pointer hover:scale-125 ${
                  index === currentQuote ? "w-6 md:w-8 h-2" : "w-2 h-2 hover:opacity-70"
                }`}
                style={{
                  background: index === currentQuote ? styles.dotColor : styles.instructionText,
                }}
                aria-label={`Show quote ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quote