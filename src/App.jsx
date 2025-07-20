import "./App.css"
import { Toaster } from "sonner"
import AppRoutes from "./routes/AppRoutes"
import useAuthInitializer from "./hooks/useAuthInitializer"
import { ThemeProvider } from "./contexts/ThemeContext"
import ThemeSwitcher from "./components/generalComponents/ThemeSwitcher"
import useGlobalSocketConnections from "./hooks/useGlobalSocketConnections"

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
        <AppRoutes/>
        <Toaster position="top-right" richColors />
      </div>
    </ThemeProvider>
  )
}

export default App
