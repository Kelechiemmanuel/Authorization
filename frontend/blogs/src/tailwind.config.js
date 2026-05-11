export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // clean single pattern
  ],
  theme: {
    extend: {},
    screens: {
      sm: "500px",
      md: "700px",
      lg: "1000px",
      xl: "1300px",
    },
  },
  plugins: [],
}