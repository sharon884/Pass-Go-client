"use client"

import "./App.css"
import { Toaster } from "sonner"
import AppRoutes from "./routes/AppRoutes"
import useAuthInitializer from "./hooks/useAuthInitializer"
import { ThemeProvider, useTheme } from "./contexts/ThemeContext"
import ThemeSwitcher from "./components/generalComponents/ThemeSwitcher"
import useGlobalSocketConnections from "./hooks/useGlobalSocketConnections"

function ToasterWrapper() {
  const { currentTheme } = useTheme()

  return (
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        style: {
          fontSize: "14px",
          padding: "12px 16px",
          borderRadius: "8px",
          background:
            currentTheme === "classic"
              ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
              : "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          color: currentTheme === "classic" ? "#1f2937" : "#ffffff",
          border: currentTheme === "classic" ? "1px solid #e0e7ff" : "1px solid #4c1d95",
          boxShadow:
            currentTheme === "classic"
              ? "0 4px 6px -1px rgba(99, 102, 241, 0.1), 0 2px 4px -1px rgba(99, 102, 241, 0.06)"
              : "0 4px 6px -1px rgba(139, 92, 246, 0.2), 0 2px 4px -1px rgba(139, 92, 246, 0.1)",
          backdropFilter: "blur(8px)",
        },
        success: {
          background:
            currentTheme === "classic"
              ? "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
              : "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
          border: currentTheme === "classic" ? "1px solid #bbf7d0" : "1px solid #065f46",
          color: currentTheme === "classic" ? "#166534" : "#6ee7b7",
        },
        error: {
          background:
            currentTheme === "classic"
              ? "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)"
              : "linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)",
          border: currentTheme === "classic" ? "1px solid #fecaca" : "1px solid #991b1b",
          color: currentTheme === "classic" ? "#dc2626" : "#fca5a5",
        },
        warning: {
          background:
            currentTheme === "classic"
              ? "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)"
              : "linear-gradient(135deg, #78350f 0%, #451a03 100%)",
          border: currentTheme === "classic" ? "1px solid #fed7aa" : "1px solid #92400e",
          color: currentTheme === "classic" ? "#d97706" : "#fbbf24",
        },
        info: {
          background:
            currentTheme === "classic"
              ? "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"
              : "linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)",
          border: currentTheme === "classic" ? "1px solid #bfdbfe" : "1px solid #3730a3",
          color: currentTheme === "classic" ? "#2563eb" : "#93c5fd",
        },
      }}
    />
  )
}

function App() {
  useAuthInitializer()
  useGlobalSocketConnections()
  return (
    <ThemeProvider>
      <div
        className="min-h-screen transition-colors duration-300"
        style={{
          // Force override any inherited styles
          background: "var(--color-appBg, #ffffff)",
          color: "var(--color-primaryText, #1f2937)",
        }}
      >
        {/* Theme Switcher - Always visible */}
        <ThemeSwitcher />
        <AppRoutes />
        <ToasterWrapper />
      </div>
    </ThemeProvider>
  )
}
export default App
