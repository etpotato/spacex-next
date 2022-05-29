module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'card': '1.5rem 1fr auto',
        'info-item': 'auto 1fr',
      },
      gridTemplateRows: {
        'card-text': '1fr auto auto',
      },
    },
  },
  plugins: [],
}
