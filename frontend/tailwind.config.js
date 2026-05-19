/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2DC572",       // subix green
        "primary-dark": "#24A660",
        "primary-light": "#E8F8F0",
        muted: "#6B7280",
        surface: "#F9FAFB",
      },
      fontFamily: {
        // Vazirmatn — best Persian font
        sans: ["Vazirmatn", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
