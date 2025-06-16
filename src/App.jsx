import React, { useEffect } from "react";
import "./App.css";
import { Toaster } from 'sonner';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./AppRoutes";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import DebugTheme from "./components/generalComponents/DebugTheme";

// Wrapper component to apply theme classes
function ThemedApp() {
  const { theme } = useTheme();
  
  useEffect(() => {
    console.log("App theme:", theme);
    // This is a fallback to ensure the theme class is applied
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
  
  return (
    <div className={`min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300`}>
      <AppRoutes />
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
        toastClassName={theme === "dark" ? "bg-slate-800 text-white" : ""}
      />
      
      <DebugTheme />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
