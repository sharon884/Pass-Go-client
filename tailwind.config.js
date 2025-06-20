/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Changed back to 'class' which is more reliable
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
    },
  },
  plugins: [],
}
