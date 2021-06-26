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
      colors: {
        'black': '#000',
        'off-black': '#1F1F1F',
        'white': '#FFF',
        'teal': '#2AF4E8',
        'red': '#F02A2A'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: []
}