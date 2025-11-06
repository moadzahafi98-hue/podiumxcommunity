/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0d0d0d',
        electric: '#39ff14',
        surface: '#151515'
      },
      boxShadow: {
        neon: '0 0 10px rgba(57, 255, 20, 0.8)'
      }
    }
  },
  plugins: []
}
