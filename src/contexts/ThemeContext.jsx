"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Define your two completely independent color themes
const themes = {
  electric: {
    name: "Electric Blue",
    colors: {
      // Backgrounds
      primaryBg: "linear-gradient(135deg, #0a1d3a 0%, #14274e 25%, #1e3a8a 50%, #274690 75%, #0a1d3a 100%)",
      secondaryBg: "rgba(0, 191, 255, 0.1)",
      cardBg: "rgba(249, 250, 251, 0.05)",

      // Text
      primaryText: "#f9fafb",
      secondaryText: "#e0f2ff",
      accentText: "#00BFFF",

      // Accents & Buttons
      primaryAccent: "linear-gradient(to right, #2563eb, #00c4ff)",
      secondaryAccent: "linear-gradient(to right, #1e40af, #0284c7)",
      glowColor: "rgba(0, 191, 255, 0.5)",

      // Particles & Effects
      particle1: "#00BFFF",
      particle2: "#3b82f6",
      particle3: "#00c4ff",
      particle4: "#2563eb",

      // Borders
      borderColor: "rgba(0, 191, 255, 0.2)",
      borderHover: "rgba(0, 191, 255, 0.4)",

      // Geometric shapes
      shape1: "linear-gradient(45deg, #00BFFF 0%, #3b82f6 100%)",
      shape2: "linear-gradient(135deg, #2563eb 0%, #00c4ff 100%)",
      shape3: "conic-gradient(from 0deg, #00BFFF, #3b82f6, #2563eb, #00c4ff, #00BFFF)",

      // App specific colors
      appBg: "#0a1d3a",
      toasterBg: "rgba(249, 250, 251, 0.1)",
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
  const [currentTheme, setCurrentTheme] = useState("electric")

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("passgo-theme")
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  // AGGRESSIVE THEME APPLICATION
  useEffect(() => {
    console.log("🎨 Applying theme:", currentTheme)
    localStorage.setItem("passgo-theme", currentTheme)

    const theme = themes[currentTheme]
    const root = document.documentElement
    const body = document.body

    // CLEAR ALL EXISTING THEME CLASSES
    body.className = body.className.replace(/theme-\w+/g, "")

    // ADD NEW THEME CLASS
    body.classList.add(`theme-${currentTheme}`)

    // FORCE CLEAR ALL EXISTING CSS VARIABLES
    for (let i = root.style.length - 1; i >= 0; i--) {
      const prop = root.style[i]
      if (prop.startsWith("--color-")) {
        root.style.removeProperty(prop)
      }
    }

    // APPLY CSS VARIABLES
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    // FORCE BODY STYLES WITH IMPORTANT
    body.style.setProperty("background", theme.colors.appBg, "important")
    body.style.setProperty("background-color", theme.colors.appBg, "important")
    body.style.setProperty("color", theme.colors.primaryText, "important")

    console.log("✅ Theme applied:", {
      theme: currentTheme,
      bodyClass: body.className,
      background: theme.colors.appBg,
      primaryBg: theme.colors.primaryBg,
    })
  }, [currentTheme])

  const switchTheme = (themeName) => {
    console.log("🔄 Switching to theme:", themeName)
    if (themes[themeName]) {
      setCurrentTheme(themeName)
    }
  }

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    switchTheme,
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
