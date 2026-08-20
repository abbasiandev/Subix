/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6",
        "primary-dark": "#0d9488",
        "primary-light": "#ccfbf1",
        muted: "#636E72",
        surface: "#F8F9FA",
      },
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      keyframes: {
        slideUp: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) translateZ(0)' },
          '50%': { transform: 'translateY(-8px) translateZ(4px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        "slide-up": "slideUp 0.25s ease-out",
        "fade-in": "fadeIn 200ms ease-out",
        "float-gentle": "floatGentle 4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "float-slow": "floatSlow 6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "gradient-shift": "gradientShift 15s ease infinite",
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'apple': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
