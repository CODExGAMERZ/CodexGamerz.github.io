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
          dark: '#050505',
          maroon: '#50000A',
          red: '#B91C1C',
          accent: '#FF0033',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
        'scan': 'scan 2s linear infinite',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'fadeInLeft': 'fadeInLeft 0.8s ease-out forwards',
        'fadeInRight': 'fadeInRight 0.8s ease-out forwards',
        'glitch': 'glitch 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'typing': 'typing 3.5s steps(30) 1s forwards, blink 0.75s step-end infinite',
      }
    },
  },
  plugins: [],
}
