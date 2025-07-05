"use client"

import { useState } from "react"
import { useTheme } from "../../contexts/ThemeContext";

function ThemeSwitcher() {
  const { currentTheme, themes, switchTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const getThemePreview = (themeName) => {
    const theme = themes[themeName]
    return (
      <div className="flex space-x-1">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.particle1 }}></div>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.particle2 }}></div>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.particle3 }}></div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        {/* Theme Switcher Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-105 shadow-lg"
          style={{
            backgroundColor: themes[currentTheme].colors.cardBg,
            borderColor: themes[currentTheme].colors.borderColor,
            boxShadow: `0 10px 25px ${themes[currentTheme].colors.glowColor}`,
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke={themes[currentTheme].colors.primaryText} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2V5z"
            />
          </svg>
        </button>

        {/* Theme Options Dropdown */}
        {isOpen && (
          <div
            className="absolute top-full right-0 mt-2 w-64 rounded-2xl backdrop-blur-lg border shadow-2xl overflow-hidden"
            style={{
              backgroundColor: themes[currentTheme].colors.cardBg,
              borderColor: themes[currentTheme].colors.borderColor,
              boxShadow: `0 25px 50px ${themes[currentTheme].colors.glowColor}`,
            }}
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4" style={{ color: themes[currentTheme].colors.primaryText }}>
                Choose Theme
              </h3>

              <div className="space-y-3">
                {Object.entries(themes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => {
                      switchTheme(key)
                      setIsOpen(false)
                    }}
                    className={`w-full p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                      currentTheme === key ? "ring-2" : ""
                    }`}
                    style={{
                      backgroundColor: currentTheme === key ? themes[currentTheme].colors.secondaryBg : "transparent",
                      borderColor:
                        currentTheme === key
                          ? themes[currentTheme].colors.borderHover
                          : themes[currentTheme].colors.borderColor,
                      ringColor: currentTheme === key ? theme.colors.glowColor : "transparent",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className="font-medium text-left"
                          style={{ color: themes[currentTheme].colors.primaryText }}
                        >
                          {theme.name}
                        </div>
                        <div
                          className="text-sm text-left mt-1"
                          style={{ color: themes[currentTheme].colors.secondaryText }}
                        >
                          {key === "electric" && "Bright electric blue energy"}
                          {key === "classic" && "Classic purple elegance"}
                        </div>
                      </div>
                      {getThemePreview(key)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ThemeSwitcher
