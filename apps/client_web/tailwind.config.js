/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'base-light' : "hsl(110, 20.0%, 99.0%)",
         base : "hsl(120, 16.7%, 97.6%)",
         primary : {
        200 : "hsla(120, 98.0%, 35.5%, 0.079)",
        300 : "hsla(120, 98.7%, 31.5%, 0.126)",
        400 : "hsla(122, 98.5%, 29.9%, 0.193)",
        500 : "hsla(125, 99.2%, 27.9%, 0.283)",
        600 :"hsla(125, 99.9%, 27.0%, 0.408)",
        700 : "hsla(131, 100%, 27.6%, 0.604)",
        800 : "hsla(131, 99.7%, 26.3%, 0.726)",
        900: "hsla(132, 99.9%, 24.0%, 0.761)",
        1000: "hsla(133, 99.5%, 19.5%, 0.840)",
        1100 :"hsla(131, 99.1%, 6.3%, 0.875)",
      },
      accent : {
        700 : "#850801"
      },
      error : "hsl(348, 83.3%, 47.1%)",
      success : "hsl(128.8,27.9%,28.8%)",
      info : "hsl(217, 59%, 41%)" 
    },
    backgroundImage : {
      button : "linear-gradient(90deg, rgba(12,159,21,1) 6%, rgba(46,198,120,1) 53%, rgba(17,163,110,1) 94%)",
      box : "radial-gradient(circle, rgba(248,250,248,1) 24%, rgba(237,241,237,1) 100%)"
      },
    fontSize : {
        xxs : "0.625rem",
      }
  },
  },
  plugins: [],
}

