"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Welcome() {
  const [isVisible, setIsVisible] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [buttonsVisible, setButtonsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Staggered animation sequence - elements drop from top
    const timer1 = setTimeout(() => setIsVisible(true), 100)
    const timer2 = setTimeout(() => setTitleVisible(true), 400)
    const timer3 = setTimeout(() => setSubtitleVisible(true), 800)
    const timer4 = setTimeout(() => setButtonsVisible(true), 1200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-blue-100/20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="text-center z-10 relative">
        {/* Title - drops from top */}
        <div className="mb-8">
          <h1
            className={`text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent transition-all duration-1000 ease-out transform ${
              titleVisible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-20 opacity-0 scale-95"
            }`}
          >
            Welcome To PassGo
          </h1>

          {/* Underline - slides in from left after title lands */}
          <div
            className={`h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full transition-all duration-800 delay-200 ${
              titleVisible ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
          ></div>
        </div>

        {/* Subtitle - drops from top with delay */}
        <p
          className={`text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-800 ease-out transform ${
            subtitleVisible ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0"
          }`}
        >
          Find your experience - buy ticket or become a host
        </p>

        {/* Buttons - drop from top with bounce effect */}
        <div
          className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out transform ${
            buttonsVisible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-12 opacity-0 scale-90"
          }`}
        >
          <button
            className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-blue-700 ${
              buttonsVisible ? "animate-land-bounce" : ""
            }`}
            onClick={() => navigate("/user-home-page")}
          >
            Get Started
          </button>

          <button
            className={`px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-purple-200 hover:border-purple-400 ${
              buttonsVisible ? "animate-land-bounce" : ""
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Custom CSS for landing animations */}
      <style jsx>{`
        @keyframes land-bounce {
          0% {
            transform: translateY(-30px) scale(0.9);
            opacity: 0;
          }
          50% {
            transform: translateY(5px) scale(1.02);
            opacity: 0.8;
          }
          70% {
            transform: translateY(-2px) scale(1.01);
            opacity: 0.9;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        .animate-land-bounce {
          animation: land-bounce 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Welcome;
