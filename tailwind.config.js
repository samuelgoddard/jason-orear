module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      'sans': ['Suisse Int', 'Arial', 'sans-serif'],
      'mono': ['Matter SQ Mono', 'Monaco', 'Lucida Console', 'monospace'],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
      "3xl": "1920px"
    },
    extend: {
      animation: {
        'caret': 'caret 1s ease-in-out infinite',
      },
      keyframes: {
        caret: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        }
      },
      colors: {
        'black': '#000',
        'off-black': '#1F1F1F',
        'white': '#FFF',
        'purple': '#F02AAD',
        'burnt-purple': '#D70D92',
        'green': '#2AF09D',
        'burnt-green': '#1DC77F',
        'red': '#F02A2A',
        'burnt-red': '#D10000',
        'yellow': '#FFB31F',
        'burnt-yellow': '#FF7D1F',
        'blue': '#64A2FF',
        'burnt-blue': '#4489F0',
        'teal': '#09E4D7',
        'burnt-teal': '#1FC1B8',
        'pink': '#FC048E',
        'burnt-pink': '#D20075'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: []
}