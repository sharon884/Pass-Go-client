"use client"
import { createContext, useContext, useState, useEffect } from "react"

// Define your two completely independent color themes
const themes = {
  dark: {
    name: "Dark Mode",
    colors: {
      // Backgrounds
      primaryBg: "#0a0a0a",
      secondaryBg: "rgba(255, 255, 255, 0.05)",
      cardBg: "rgba(255, 255, 255, 0.08)",

      // Text - Better contrast for dark theme
      primaryText: "#ffffff",
      secondaryText: "#d1d5db", // lighter gray for better visibility
      accentText: "#f9fafb",

      // Input specific colors
      inputBg: "rgba(255, 255, 255, 0.1)",
      inputText: "#ffffff",
      inputPlaceholder: "#9ca3af",
      inputBorder: "rgba(255, 255, 255, 0.2)",
      inputFocus: "rgba(255, 255, 255, 0.3)",

      // Accents & Buttons
      primaryAccent: "linear-gradient(to right, #374151, #4b5563)",
      secondaryAccent: "linear-gradient(to right, #4b5563, #6b7280)",
      glowColor: "rgba(255, 255, 255, 0.1)",

      // Particles & Effects
      particle1: "#374151",
      particle2: "#4b5563",
      particle3: "#6b7280",
      particle4: "#9ca3af",

      // Borders
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderHover: "rgba(255, 255, 255, 0.2)",

      // Geometric shapes
      shape1: "rgba(255, 255, 255, 0.03)",
      shape2: "rgba(255, 255, 255, 0.05)",
      shape3: "rgba(255, 255, 255, 0.02)",

      // App specific
      appBg: "#0a0a0a",
      toasterBg: "rgba(0, 0, 0, 0.9)",

      // Stats component
      statsMainBg: "#0a0a0a",
      statsOverlayBg: "rgba(255, 255, 255, 0.02)",
      statsCardBg: "rgba(255, 255, 255, 0.08)",
      statsIconBg: "linear-gradient(to right, #374151, #4b5563)",
      statsTextGradient: "linear-gradient(to right, #f4f4f5, #e5e7eb)",
      statsBlurOrb1: "rgba(255, 255, 255, 0.05)",
      statsBlurOrb2: "rgba(255, 255, 255, 0.03)",
    },
  },
  classic: {
    name: "Clean White",
    colors: {
      // Backgrounds - PURE WHITE (no gradients)
      primaryBg: "#ffffff",
      secondaryBg: "rgba(147, 51, 234, 0.02)",
      cardBg: "rgba(255, 255, 255, 0.8)",

      // Text - Clean and readable
      primaryText: "#1f2937",
      secondaryText: "#6b7280",
      accentText: "#7c3aed",

      // Input specific colors
      inputBg: "#ffffff",
      inputText: "#1f2937",
      inputPlaceholder: "#9ca3af",
      inputBorder: "rgba(147, 51, 234, 0.2)",
      inputFocus: "rgba(147, 51, 234, 0.4)",

      // Accents & Buttons - ONLY PURPLE
      primaryAccent: "linear-gradient(to right, #7c3aed, #8b5cf6)",
      secondaryAccent: "linear-gradient(to right, #8b5cf6, #a855f7)",
      glowColor: "rgba(124, 58, 237, 0.15)",

      // Particles & Effects - ONLY PURPLE SHADES
      particle1: "#7c3aed",
      particle2: "#8b5cf6",
      particle3: "#a855f7",
      particle4: "#9333ea",

      // Borders - Light purple only
      borderColor: "rgba(147, 51, 234, 0.1)",
      borderHover: "rgba(147, 51, 234, 0.2)",

      // Background shapes - ONLY PURPLE
      shape1: "rgba(147, 51, 234, 0.06)",
      shape2: "rgba(168, 85, 247, 0.06)",
      shape3: "rgba(124, 58, 237, 0.02)",

      // App specific colors - Pure white
      appBg: "#ffffff",
      toasterBg: "rgba(255, 255, 255, 0.95)",

      // Stats component specific colors
      statsMainBg: "#ffffff",
      statsOverlayBg: "rgba(147, 51, 234, 0.02)",
      statsCardBg: "rgba(255, 255, 255, 0.8)",
      statsIconBg: "linear-gradient(to right, #7c3aed, #8b5cf6)",
      statsTextGradient: "linear-gradient(to right, #7c3aed, #8b5cf6)",
      statsBlurOrb1: "rgba(147, 51, 234, 0.08)",
      statsBlurOrb2: "rgba(139, 92, 246, 0.08)",
    },
  },
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("dark")
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("passgo-theme")
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  // SMOOTH THEME APPLICATION WITH ANIMATIONS
  useEffect(() => {
    setIsTransitioning(true)

    localStorage.setItem("passgo-theme", currentTheme)
    const theme = themes[currentTheme]
    const root = document.documentElement
    const body = document.body

    // Add transition classes for smooth animation
    body.style.transition = "background-color 0.3s ease, color 0.3s ease"
    root.style.transition = "all 0.3s ease"

    // CLEAR ALL EXISTING THEME CLASSES
    body.className = body.className.replace(/theme-\w+/g, "")

    // ADD NEW THEME CLASS
    body.classList.add(`theme-${currentTheme}`)

    // APPLY CSS VARIABLES WITH SMOOTH TRANSITION
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    // APPLY BODY STYLES WITH SMOOTH TRANSITION
    body.style.setProperty("background-color", theme.colors.appBg)
    body.style.setProperty("color", theme.colors.primaryText)

    // Add global input styles
    const inputStyles = `
      input, textarea, select {
        background-color: ${theme.colors.inputBg} !important;
        color: ${theme.colors.inputText} !important;
        border-color: ${theme.colors.inputBorder} !important;
        transition: all 0.3s ease !important;
      }
      input::placeholder, textarea::placeholder {
        color: ${theme.colors.inputPlaceholder} !important;
      }
      input:focus, textarea:focus, select:focus {
        border-color: ${theme.colors.inputFocus} !important;
        box-shadow: 0 0 0 2px ${theme.colors.glowColor} !important;
      }
      * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
      }
    `

    // Remove existing theme styles
    const existingStyle = document.getElementById("theme-styles")
    if (existingStyle) {
      existingStyle.remove()
    }

    // Add new theme styles
    const styleElement = document.createElement("style")
    styleElement.id = "theme-styles"
    styleElement.textContent = inputStyles
    document.head.appendChild(styleElement)

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }, [currentTheme])

  const switchTheme = (themeName) => {
    if (themes[themeName] && !isTransitioning) {
      setCurrentTheme(themeName)
    }
  }

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    switchTheme,
    isTransitioning,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
