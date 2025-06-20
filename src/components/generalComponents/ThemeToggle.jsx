"use client"
import { useTheme } from "../../contexts/ThemeContext"
import { useEffect, useState } from "react"

function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [isClient, setIsClient] = useState(false)
  
  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Log theme changes
  useEffect(() => {
    if (isClient && mounted) {
      console.log("ThemeToggle component - current theme:", theme);
    }
  }, [theme, isClient, mounted]);
  
  // Don't render anything until mounted on client
  if (!isClient || !mounted) {
    return null
  }

  return (
    <button
      onClick={() => {
        console.log("Theme toggle clicked, current theme:", theme);
        toggleTheme();
      }}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300 group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      type="button"
    >
      {/* Sun Icon (Light Mode) */}
      <svg
        className={`absolute w-5 h-5 text-yellow-500 transition-all duration-500 transform ${
          theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon Icon (Dark Mode) */}
      <svg
        className={`absolute w-5 h-5 text-blue-400 transition-all duration-500 transform ${
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* Ripple Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 dark:from-blue-400/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  )
}

export default ThemeToggle
