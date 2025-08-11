"use client"
import { useState } from "react"
import { useTheme } from "../../contexts/ThemeContext"
import { Sun, Moon } from "lucide-react"

function ThemeSwitcher() {
  const { currentTheme, themes, switchTheme, isTransitioning } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const getThemePreview = (themeName) => {
    const theme = themes[themeName]
    return (
      <div className="flex space-x-1">
        <div
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{ backgroundColor: theme.colors.particle1 }}
        ></div>
        <div
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{ backgroundColor: theme.colors.particle2 }}
        ></div>
        <div
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{ backgroundColor: theme.colors.particle3 }}
        ></div>
      </div>
    )
  }

  const getThemeIcon = () => {
    return currentTheme === "dark" ? (
      <Moon
        className="w-5 h-5 transition-all duration-300"
        style={{ color: themes[currentTheme].colors.primaryText }}
      />
    ) : (
      <Sun className="w-5 h-5 transition-all duration-300" style={{ color: themes[currentTheme].colors.primaryText }} />
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        {/* Theme Switcher Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isTransitioning}
          className="p-3 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50"
          style={{
            backgroundColor: themes[currentTheme].colors.cardBg,
            borderColor: themes[currentTheme].colors.borderColor,
            boxShadow: `0 10px 25px ${themes[currentTheme].colors.glowColor}`,
          }}
        >
          {getThemeIcon()}
        </button>

        {/* Theme Options Dropdown */}
        {isOpen && (
          <div
            className="absolute top-full right-0 mt-2 w-64 rounded-2xl backdrop-blur-lg border shadow-2xl overflow-hidden transition-all duration-300 animate-in slide-in-from-top-2"
            style={{
              backgroundColor: themes[currentTheme].colors.cardBg,
              borderColor: themes[currentTheme].colors.borderColor,
              boxShadow: `0 25px 50px ${themes[currentTheme].colors.glowColor}`,
            }}
          >
            <div className="p-4">
              <h3
                className="text-lg font-semibold mb-4 transition-colors duration-300"
                style={{ color: themes[currentTheme].colors.primaryText }}
              >
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
                    disabled={isTransitioning}
                    className={`w-full p-3 rounded-xl border transition-all duration-300 hover:scale-105 disabled:opacity-50 ${
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
                      <div className="flex items-center space-x-3">
                        <div
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-opacity-20 transition-all duration-300"
                          style={{ backgroundColor: theme.colors.particle1 }}
                        >
                          {key === "dark" ? (
                            <Moon
                              className="w-4 h-4 transition-colors duration-300"
                              style={{ color: theme.colors.primaryText }}
                            />
                          ) : (
                            <Sun
                              className="w-4 h-4 transition-colors duration-300"
                              style={{ color: theme.colors.primaryText }}
                            />
                          )}
                        </div>
                        <div>
                          <div
                            className="font-medium text-left transition-colors duration-300"
                            style={{ color: themes[currentTheme].colors.primaryText }}
                          >
                            {theme.name}
                          </div>
                          <div
                            className="text-sm text-left mt-1 transition-colors duration-300"
                            style={{ color: themes[currentTheme].colors.secondaryText }}
                          >
                            {key === "dark" && "Dark theme with subtle grays"}
                            {key === "classic" && "Classic purple elegance"}
                          </div>
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
