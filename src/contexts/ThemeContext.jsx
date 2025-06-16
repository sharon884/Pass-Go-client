"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("passgo-theme")
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(systemPrefersDark ? "dark" : "light")
    }
  }, [])

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (!mounted) return
    
    const root = window.document.documentElement
    
    // Remove both classes first
    root.classList.remove("light", "dark")
    
    // Add the current theme class
    root.classList.add(theme)
    
    // Store in localStorage
    localStorage.setItem("passgo-theme", theme)
    
    console.log("Theme changed to:", theme, "Classes on html:", root.classList.toString())
    
    // Force a repaint to ensure styles are applied
    document.body.style.display = 'none'
    document.body.offsetHeight // Force a repaint
    document.body.style.display = ''
    
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light"
      console.log("Toggling theme from", prevTheme, "to", newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
