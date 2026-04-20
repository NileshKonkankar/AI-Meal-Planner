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
          primary: '#DC2626',
          secondary: '#F87171',
          cta: '#CA8A04',
          dark: '#450A0A',
        },
        warm: '#FEF2F2'
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      boxShadow: {
        'block': '6px 6px 0px 0px rgba(69, 10, 10, 1)',
        'block-hover': '2px 2px 0px 0px rgba(69, 10, 10, 1)',
      }
    },
  },
  plugins: [],
}
