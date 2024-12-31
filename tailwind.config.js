/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    container: {

      center: true,
      screens: {
      
        sm: '590px',
        // => @media (min-width: 640px) 

        md: '708px',
        // => @media (min-width: 768px) 

        lg: '944px',
        // => @media (min-width: 1024px) 

        xl: '1200px',
        // => @media (min-width: 1280px) 

        '2xl': '1336px',
        // => @media (min-width: 1536px) 

      },
    },

    extend: {
      fontFamily: {
        cairo: 'Cairo Variable',
      },


      colors: {
        primary: {
          50: "#ceefce",
          100: "#b6e6b6",
          200: "#9dde9d",
          300: "#85d685",
          400: "#6cce6c",
          500: "#54c654",
          600: "#3bbd3b",
          700: "#23b523",
          800: "#0aad0a",
          900: "#099c09",
          950: "#077907",
        }
      }


    },
  },
  plugins: [],
}

