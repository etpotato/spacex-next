module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'card': '1.5rem 1fr auto',
      },
      gridTemplateRows: {
        'card-text': '1fr auto auto',
      },
    },
  },
  plugins: [],
}
