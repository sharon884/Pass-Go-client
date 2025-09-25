// Create: src/components/DebugTheme.jsx
import { useTheme } from "../../contexts/ThemeContext"
import { useEffect, useState } from "react"

function DebugTheme() {
  const { theme, toggleTheme } = useTheme()
  const [htmlClasses, setHtmlClasses] = useState("")
  
  useEffect(() => {
    // Update HTML classes for debugging
    const updateClasses = () => {
      const classes = document.documentElement.classList.toString()
      setHtmlClasses(classes)
    }
    
    updateClasses()
    
    // Set up a mutation observer to track class changes
    const observer = new MutationObserver(updateClasses)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <div className="fixed bottom-4 right-4 bg-red-500 dark:bg-red-700 text-white p-4 rounded z-50">
      <p>Current theme: <strong>{theme}</strong></p>
      <p className="text-xs mt-1">HTML classes: <code>{htmlClasses}</code></p>
      <button 
        onClick={toggleTheme}
        className="bg-white text-black dark:bg-slate-800 dark:text-white px-2 py-1 rounded mt-2"
      >
        Toggle Theme
      </button>
      <div className="mt-2">
        <div className="w-10 h-10 bg-white dark:bg-black border"></div>
        <p className="text-xs">This box should change color</p>
      </div>
      <div className="mt-2 text-xs">
        <p className="text-green-500 dark:text-green-300">This text should change shade</p>
      </div>
    </div>
  )
}

export default DebugTheme
