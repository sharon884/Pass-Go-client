"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Define your two completely independent color themes
const themes = {
electric: {
  name: "Neon Green Dark",
  colors: {
    // Backgrounds
    primaryBg: "#000000", // pure black base
    secondaryBg: "rgba(0, 255, 132, 0.08)", // neon green light overlay
    cardBg: "rgba(255, 255, 255, 0.04)",

    // Text
    primaryText: "#e5ffe5", // off-white green tint
    secondaryText: "#a1fca1",
    accentText: "#00ff84", // exact neon green

    // Accents & Buttons
    primaryAccent: "linear-gradient(to right, #00ff84, #00ffaa)",
    secondaryAccent: "linear-gradient(to right, #00ffaa, #66ffc2)",
    glowColor: "rgba(0, 255, 132, 0.3)",

    // Particles & Effects
    particle1: "#00ff84",
    particle2: "#00ffaa",
    particle3: "#66ffc2",
    particle4: "#00cc66",

    // Borders
    borderColor: "rgba(0, 255, 132, 0.12)",
    borderHover: "rgba(0, 255, 132, 0.3)",

    // Geometric shapes
    shape1: "rgba(0, 255, 132, 0.05)",
    shape2: "rgba(0, 204, 102, 0.06)",
    shape3: "rgba(0, 153, 76, 0.07)",

    // App specific
    appBg: "#000000", // full dark
    toasterBg: "rgba(0, 255, 132, 0.05)",

    // Stats component if used
    statsMainBg: "#000000",
    statsOverlayBg: "rgba(0, 255, 132, 0.03)",
    statsCardBg: "rgba(255, 255, 255, 0.06)",
    statsIconBg: "linear-gradient(to right, #00ff84, #00ffaa)",
    statsTextGradient: "linear-gradient(to right, #00ff84, #00ffaa)",
    statsBlurOrb1: "rgba(0, 255, 132, 0.1)",
    statsBlurOrb2: "rgba(0, 204, 102, 0.1)",
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
