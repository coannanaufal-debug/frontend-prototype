// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        reading: ['Merriweather', 'serif'],
      },
      colors: {
        primary: '#1E3A8A',
        accent: '#0D9488',
        surface: '#F8FAFC',
        backgroundDark: '#0F172A',
      },
    },
  },
  plugins: [],
}
