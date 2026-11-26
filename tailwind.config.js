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
        display: ['Instrument Serif', 'Merriweather', 'serif'],
      },
      colors: {
        primary: '#A34A07',
        accent: '#A34A07',
        signal: '#F5C542',
        surface: '#F8FAFC',
        backgroundDark: '#0F172A',
        ink: '#17150F',
        cream: '#F7F2E7',
        paper: '#FDFBF5',
        line: '#DED6C3',
        mist: '#DDE9EC',
        sage: {
          50: '#F1F3EA',
          100: '#E4E8D7',
          200: '#D0D6BC',
          300: '#B4BD97',
          500: '#7C8865',
          700: '#4D5940',
          900: '#2C3324',
        },
        amber: {
          300: '#FDE68A',
          400: '#FCD34D',
          500: '#F5C542',
          600: '#EAB308',
          700: '#A34A07',
        },
      },
    },
  },
  plugins: [],
}
