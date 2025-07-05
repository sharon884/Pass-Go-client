import "./App.css"
import { Toaster } from "sonner"
import AppRoutes from "./AppRoutes"
import useHostSocketAndUser from "./hooks/useHostSocketAndUser"
import useAuthInitializer from "./hooks/useAuthInitializer"
import { ThemeProvider } from "./contexts/ThemeContext"
import ThemeSwitcher from "./components/generalComponents/ThemeSwitcher"

function App() {
  // Initialize sockets and auth
  useHostSocketAndUser()
  useAuthInitializer()

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
        <Toaster position="top-right" richColors />
      </div>
    </ThemeProvider>
  )
}

export default App
