/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ['./public/**/*.html',
  './src/**/*.{js,jsx,ts,tsx,vue}',],
  theme: {
    extend: {
      colors:{
        gray:{
          950:'#2D2B2B',
          960:'#5E5E5E'
        }
      }
    },
    fontFamily:{
      'sans': ['Proxima Nova'],
      'figma':['coda', 'regular'],
      'nunito': ['nunito', 'sans-serif'],
    }
  },
  plugins: [],
}
