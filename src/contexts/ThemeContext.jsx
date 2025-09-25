// contexts/ThemeContext.jsx
import { useMemo } from "react"

// Import your classic theme object directly
const classicTheme = {
  name: "Clean White",
  colors: {
    primaryBg: "#ffffff",
    secondaryBg: "rgba(147, 51, 234, 0.02)",
    cardBg: "rgba(255, 255, 255, 0.8)",
    primaryText: "#1f2937",
    secondaryText: "#6b7280",
    accentText: "#7c3aed",
    inputBg: "#ffffff",
    inputText: "#1f2937",
    inputPlaceholder: "#9ca3af",
    inputBorder: "rgba(147, 51, 234, 0.2)",
    inputFocus: "rgba(147, 51, 234, 0.4)",
    primaryAccent: "linear-gradient(to right, #7c3aed, #8b5cf6)",
    secondaryAccent: "linear-gradient(to right, #8b5cf6, #a855f7)",
    glowColor: "rgba(124, 58, 237, 0.15)",
    particle1: "#7c3aed",
    particle2: "#8b5cf6",
    particle3: "#a855f7",
    particle4: "#9333ea",
    borderColor: "rgba(147, 51, 234, 0.1)",
    borderHover: "rgba(147, 51, 234, 0.2)",
    shape1: "rgba(147, 51, 234, 0.06)",
    shape2: "rgba(168, 85, 247, 0.06)",
    shape3: "rgba(124, 58, 237, 0.02)",
    appBg: "#ffffff",
    toasterBg: "rgba(255, 255, 255, 0.95)",
    statsMainBg: "#ffffff",
    statsOverlayBg: "rgba(147, 51, 234, 0.02)",
    statsCardBg: "rgba(255, 255, 255, 0.8)",
    statsIconBg: "linear-gradient(to right, #7c3aed, #8b5cf6)",
    statsTextGradient: "linear-gradient(to right, #7c3aed, #8b5cf6)",
    statsBlurOrb1: "rgba(147, 51, 234, 0.08)",
    statsBlurOrb2: "rgba(139, 92, 246, 0.08)",
  },
}

export function useTheme() {
  return {
    currentTheme: "classic",
    theme: classicTheme,
    themes: { classic: classicTheme },
    switchTheme: () => {}, // noop
    isTransitioning: false,
  }
}

export function ThemeProvider({ children }) {
  return children
}
