/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#020617",
          900: "#0f172a",
        },
        green: {
          300: "#86efac", 
          400: "#4ade80",
          500: "#22c55e",
        },
      },
      
      // 🛑 FIX: ADD CUSTOM TRANSITION EXTENSIONS HERE 🛑
      transitionDuration: {
        '2500': '2500ms', // Adds duration-[2500ms]
      },
      transitionTimingFunction: {
        // Adds ease-[cubic-bezier(0.25,1,0.5,1)] utility class
        'custom-flow': 'cubic-bezier(0.25, 1, 0.5, 1)', 
      },
      // 🛑 END FIX 🛑
    },
  },
  plugins: [],
}