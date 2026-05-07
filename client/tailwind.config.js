/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#10b981', // Emerald 500
          secondary: '#2dd4bf', // Teal 400
          cta: '#f97316', // Orange 500
          dark: '#064e3b', // Emerald 900
        },
        warm: '#f8fafc' // Slate 50
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(16, 185, 129, 0.1)',
        'glass': '0 8px 32px 0 rgba(16, 185, 129, 0.15)',
      }
    },
  },
  plugins: [],
}
