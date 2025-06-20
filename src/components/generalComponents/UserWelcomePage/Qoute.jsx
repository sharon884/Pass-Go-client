"use client"

import { useState, useEffect } from "react"

function Qoute() {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
        setIsVisible(true)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-blue-50/50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100/50 p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div
                className={`text-center transition-all duration-500 transform ${
                  isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
                }`}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>

                <blockquote className="text-2xl md:text-3xl font-medium text-gray-700 leading-relaxed">
                  {quotes[currentQuote]}
                </blockquote>

                <div className="flex justify-center mt-8 space-x-2">
                  {quotes.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentQuote ? "bg-gradient-to-r from-purple-500 to-blue-500 w-8" : "bg-gray-300"
                      }`}
                    ></div>
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

export default Qoute
