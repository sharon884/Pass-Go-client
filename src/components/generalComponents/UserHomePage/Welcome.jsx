"use client"

import { useEffect, useState } from "react"
import { useTheme } from "../../../contexts/ThemeContext"

function Welcome() {
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme() // Get current theme
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Add console log to debug
  useEffect(() => {
    console.log("Current theme in Welcome component:", theme)
  }, [theme])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden transition-all duration-500">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-blue-100/20 dark:from-green-400/5 dark:to-green-500/5 transition-all duration-500"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200/30 dark:bg-green-400/10 rounded-full blur-3xl animate-pulse transition-all duration-500"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/30 dark:bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-500"></div>

      <div
        className={`text-center z-10 transition-all duration-1500 transform ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-95"
        }`}
      >
        <div className="mb-8">
          <h1
            className={`text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 dark:from-green-400 dark:via-green-300 dark:to-green-500 bg-clip-text text-transparent transition-all duration-2000 transform ${
              isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
            }`}
          >
            Welcome To PassGo
          </h1>
          <div
            className={`h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 dark:from-green-400 dark:to-green-300 mx-auto mt-4 rounded-full transition-all duration-1500 delay-500 transform ${
              isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
          ></div>
        </div>

        <p
          className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed transition-all duration-1500 delay-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Find your experience - buy ticket or become a host
        </p>

        <div
          className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1500 delay-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-green-400 dark:to-green-300 text-white dark:text-black rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-blue-700">
            Get Started
          </button>
          <button className="px-8 py-4 bg-white dark:bg-slate-900 text-purple-600 dark:text-green-400 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-purple-200 dark:border-green-400 hover:border-purple-400 dark:hover:border-green-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome
