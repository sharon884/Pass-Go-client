"use client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Welcome() {
  // Use separate states to control the staggered flow
  const [isVisible, setIsVisible] = useState(false) // Title and Underline
  const [textVisible, setTextVisible] = useState(false) // Subtitle
  const [buttonsVisible, setButtonsVisible] = useState(false) // Buttons
  const [particlesVisible, setParticlesVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Staggered delays for the smooth flow (Ozhukku style)
    const TITLE_DELAY = 300
    const SUBTITLE_DELAY = 700 
    const BUTTONS_DELAY = 1000 
    const PARTICLE_DELAY = 1500
    
    const timer1 = setTimeout(() => setIsVisible(true), TITLE_DELAY) 
    const timer2 = setTimeout(() => setTextVisible(true), SUBTITLE_DELAY) 
    const timer3 = setTimeout(() => setButtonsVisible(true), BUTTONS_DELAY) 
    const timer4 = setTimeout(() => setParticlesVisible(true), PARTICLE_DELAY) 
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  // FORCE CONTAINER STYLES - Hardcoded to classic white theme
  const containerStyle = {
    background: "#ffffff",
    backgroundColor: "#ffffff",
    // Retained fix to show other components below
    minHeight: "85vh", 
    position: "relative",
    overflow: "hidden",
  }

  const getTextColors = () => {
    return {
      title: "text-gray-800",
      subtitle: "text-gray-600",
      titleGradient: "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",
    }
  }

  const getButtonStyles = () => {
    const baseClassName = "group relative px-8 py-3 rounded-full font-semibold text-base shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-0.5 overflow-hidden"

    return {
      primary: {
        className:
          `${baseClassName} bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white`,
        style: {},
      },
      secondary: {
        className:
          `${baseClassName} backdrop-blur-sm border bg-white/60 text-gray-800 border-purple-100/50 hover:bg-white/80`,
        style: {},
      },
    }
  }

  const textColors = getTextColors()
  const buttonStyles = getButtonStyles()

  // 🛑 CHANGE: Updated transition variables for the "Melting Text" effect.
  const MELTING_TRANSITION = "transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] transform"
  // Stronger initial vertical offset and added strong blur
  const INITIAL_STATE = "translate-y-10 opacity-0 blur-lg" 
  // Resolves to no vertical offset and no blur
  const FINAL_STATE = "translate-y-0 opacity-100 blur-0" 


  return (
    <>
    
      <div 
        className="flex items-center justify-center relative overflow-hidden" 
        style={containerStyle}
      >
        {/* Clean white background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-white"></div>
        </div>

        {/* Main content wrapper */}
        <div className="text-center z-10 relative px-4 max-w-full"> 
          
          {/* Title - Uses 'isVisible' state */}
          {/* Applying the Melting Transition */}
          <div className={`mb-8 md:mb-10 ${MELTING_TRANSITION} ${isVisible ? FINAL_STATE : INITIAL_STATE}`}>
            <h1 className={`text-5xl md:text-7xl font-bold drop-shadow-lg ${textColors.titleGradient}`}>
              Welcome To PassGo
            </h1>

            {/* Animated underline - Synchronized with the title */}
            <div
              className={`h-[3px] mx-auto mt-6 rounded-full transition-all duration-1000 ease-out ${
                isVisible ? "w-32 md:w-48 opacity-100" : "w-0 opacity-0"
              }`}
              style={{
                background: "linear-gradient(to right, #7c3aed, #2563eb)",
                boxShadow: "0 0 15px rgba(124, 58, 237, 0.3)",
              }}
            ></div>
          </div>

          {/* Subtitle - Uses 'textVisible' state for flow */}
          {/* Applying the Melting Transition */}
          <div className={`mb-12 overflow-hidden ${MELTING_TRANSITION} ${textVisible ? FINAL_STATE : INITIAL_STATE}`}>
            <p
              className={`text-lg md:text-xl max-w-xl mx-auto leading-relaxed ${textColors.subtitle}`}
            >
              Find your experience - buy ticket or become a host
            </p>
          </div>

          {/* Buttons - Uses 'buttonsVisible' state for final flow step */}
          {/* Applying the Melting Transition */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${MELTING_TRANSITION} ${buttonsVisible ? FINAL_STATE : INITIAL_STATE}`}>
            <button
              className={buttonStyles.primary.className}
              style={buttonStyles.primary.style}
              onClick={() => navigate("/user/home")}
            >
              <span className="relative z-10 font-bold">Get Started</span>
            </button>

            <button className={buttonStyles.secondary.className} style={buttonStyles.secondary.style}>
              <span className="relative z-10">Learn More</span>
            </button>
          </div>
        </div>

        {/* Floating particles - Uses a separate state/transition */}
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-2000 ${
            particlesVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Particles code remains the same... */}
          <div
            className="absolute top-[10%] left-[10%] w-2 h-2 rounded-full animate-float-slow opacity-80"
            style={{ backgroundColor: "#7c3aed", boxShadow: "0 0 8px #7c3aed", }}
          ></div>
          <div
            className="absolute top-[30%] right-[20%] w-1 h-1 rounded-full animate-float-slow delay-1500 opacity-80"
            style={{ backgroundColor: "#8b5cf6", boxShadow: "0 0 6px #8b5cf6", }}
          ></div>
          <div
            className="absolute bottom-[20%] left-[40%] w-1 h-1 rounded-full animate-float-slow delay-3000 opacity-80"
            style={{ backgroundColor: "#a855f7", boxShadow: "0 0 6px #a855f7", }}
          ></div>
          <div
            className="absolute top-[70%] right-[5%] w-2 h-2 rounded-full animate-float-slow delay-[4500ms] opacity-80"
            style={{ backgroundColor: "#9333ea", boxShadow: "0 0 8px #9333ea", }}
          ></div>
        </div>

        <style jsx>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
            25% { transform: translateY(-15px) translateX(10px); opacity: 0.9; }
            50% { transform: translateY(-5px) translateX(-5px); opacity: 0.8; }
            75% { transform: translateY(-20px) translateX(15px); opacity: 0.95; }
          }
          .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        `}</style>
      </div>
    </>
  )
}

export default Welcome