import React, { useEffect } from "react";
import "./App.css";
import { Toaster } from 'sonner';
import AppRoutes from "./AppRoutes";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import DebugTheme from "./components/generalComponents/DebugTheme";
import useHostSocketAndUser from "./hooks/useHostSocketAndUser";

// Wrapper component to apply theme classes
function ThemedApp() {
  const { theme } = useTheme();
  const { user, statuChanged } = useHostSocketAndUser();
  
  useEffect(() => {
    console.log("App theme:", theme);
    // This is a fallback to ensure the theme class is applied
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
  
  return (
    <div className={`min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300`}>
      <AppRoutes />
    
      <Toaster position="top-right" richColors theme={theme} />

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
