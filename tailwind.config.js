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
        primary: '#1E3A8A',
        accent: '#0D9488',
        surface: '#F8FAFC',
        backgroundDark: '#0F172A',
        ink: '#1C1B17',
        cream: '#F6F1E7',
        paper: '#FBF8F1',
        line: '#D9D2C2',
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
      },
    },
  },
  plugins: [],
}
