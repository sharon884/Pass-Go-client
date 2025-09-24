import "./App.css"
import { Toaster } from "sonner"
import AppRoutes from "./routes/AppRoutes"
import useAuthInitializer from "./hooks/useAuthInitializer"
import useGlobalSocketConnections from "./hooks/useGlobalSocketConnections"

function ToasterWrapper() {
  return (
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        style: {
          fontSize: "14px",
          padding: "12px 16px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          color: "#1f2937",
          border: "1px solid #e0e7ff",
          boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.1), 0 2px 4px -1px rgba(99, 102, 241, 0.06)",
          backdropFilter: "blur(8px)",
        },
        success: {
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
          border: "1px solid #bbf7d0",
          color: "#166534",
        },
        error: {
          background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
          border: "1px solid #fecaca",
          color: "#dc2626",
        },
        warning: {
          background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
          border: "1px solid #fed7aa",
          color: "#d97706",
        },
        info: {
          background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
          border: "1px solid #bfdbfe",
          color: "#2563eb",
        },
      }}
    />
  )
}

function App() {
  // Initialize authentication context when the app loads.
  useAuthInitializer()
  // Activate global socket listeners once per app instance.
  useGlobalSocketConnections()

  return (
    <>
      <AppRoutes />
      <ToasterWrapper />
    </>
  )
}

export default App
