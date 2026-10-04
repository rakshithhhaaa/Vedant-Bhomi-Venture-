/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#FAF2EE',
          100: '#F4E3DB',
          200: '#E8C5B4',
          300: '#DAA087',
          400: '#C87456',
          500: '#B55333',
          600: '#9C4123',
          700: '#7F3118',
          800: '#642614',
          900: '#4D1D10',
        },
        clay: {
          50: '#FBF9F6',
          100: '#F5EFE7',
          200: '#ECE0D2',
          300: '#DFCCBA',
          400: '#CEB298',
          500: '#B89578',
          600: '#9B785D',
          700: '#7B5D46',
          800: '#5F4635',
          900: '#443125',
        },
        forest: {
          50: '#F0F7F3',
          100: '#DEEEE3',
          200: '#BDDEC8',
          300: '#95C7A6',
          400: '#64A97D',
          500: '#3D8C5A',
          600: '#2D7045',
          700: '#235836',
          800: '#1C452C',
          900: '#153623',
        },
        sand: {
          50: '#FCFBF8',
          100: '#F7F4EC',
          200: '#EFEADB',
          300: '#E3DCB6',
          400: '#D5CC9A',
          500: '#C0B376',
          600: '#9F9154',
          700: '#7B703F',
          800: '#5E5530',
          900: '#443D23',
        },
        earth: {
          900: '#1A1412',
          800: '#2B221E',
          700: '#3E322D',
          600: '#5A4A43',
          500: '#7A685F',
          400: '#9C887E',
          300: '#BFB0A7',
          200: '#DDD5CE',
          100: '#EFEBE7',
          50: '#FAF8F6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Lora', 'Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
