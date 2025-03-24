/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode support
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
          colors: {
              darkBg: "#000000",          // Deep black background
              darkText: "#F0F0F0",       // White text for dark mode
              accent: "#00FFFF",         // Neon Cyan for highlights
              highlight: "#FFD700",      // Bright Yellow for accents
          },
      },
  },
  plugins: [],
}
