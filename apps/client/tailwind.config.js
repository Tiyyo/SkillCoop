/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  theme: {
    extend: {
      height: {
        10.5: '42px',
        18: '72px',
        18.5: '76px',
      },
      width: {
        18: '72px',
        18.5: '76px',
      },
      colors: {
        dark: '#12161F',
        'base-light': 'hsl(110, 20.0%, 99.0%)',
        base: 'hsl(120, 16.7%, 97.6%)',
        grey: {
          regular: '#B6B7BA',
          off: '#F6F6F6',
          light: '#D9D9D9',
          constrast: ' #F8FBFF',
          'sub-text': '#717379',
        },
        primary: {
          100: 'hsla(131, 42%, 46%, 1)',
          20: 'hsla(131, 42%, 46%, 0.2)',
          200: 'hsla(120, 98.0%, 35.5%, 0.079)',
          210: 'hsla(120, 98.0%, 35.5%, 0.03)',
          300: 'hsla(120, 98.7%, 31.5%, 0.126)',
          400: 'hsla(122, 98.5%, 29.9%, 0.193)',
          500: 'hsla(125, 99.2%, 27.9%, 0.283)',
          600: 'hsla(125, 99.9%, 27.0%, 0.408)',
          700: 'hsla(131, 100%, 27.6%, 0.604)',
          800: 'hsla(131, 99.7%, 26.3%, 0.726)',
          900: 'hsla(132, 99.9%, 24.0%, 0.761)',
          1000: 'hsla(133, 99.5%, 19.5%, 0.840)',
          1100: 'hsla(131, 99.1%, 6.3%, 0.875)',
          gradient: 'hsl(120deg, 100%, 98.1%)',
        },
        'primary-light': {
          100: '#F0F8F1',
        },
        accent: {
          300: 'rgb(160, 1, 160, 0.8)',
          700: '#850801',
        },
        error: 'hsl(348, 83.3%, 47.1%)',
        'error-mid': '#C63A46',
        'error-light': '#FCE8E8',
        success: 'hsl(128.8,27.9%,28.8%)',
        info: 'hsl(217, 59%, 41%)',
        light: 'rgba(61,65,63,0.7)',
      },
      backgroundImage: {
        button: `linear-gradient(90deg, rgba(12,159,21,1) 6%, rgba(46,198,120,1) 
          53%, rgba(17,163,110,1) 94%)`,
        'home-page-gradient': `linear-gradient(180deg, hsl(120, 16%, 98%) ,
                                                       hsl(120deg, 100%, 98.1%))`,
        box: 'radial-gradient(circle, rgba(248,250,248,1) 24%, rgba(237,241,237,1) 100%)',
        stadium: "url('/images/stadium-showcase.jpg')",
        home: "url('/images/stadium.png')",
        title:
          'linear-gradient(135deg, rgba(68,167,86,1) 0%, rgba(3,78,19,0.87718837535014) 63%)',
        subtitle:
          'linear-gradient(135deg, rgba(68,167,86,1) 0%, rgba(0,83,16,1) 19%, rgba(0,32,6,1) 63%)',
      },
      aspectRatio: {
        '1/4': '1/4',
        '4/1': '4/1',
      },
      fontSize: {
        xxs: '0.625rem',
        md: '1rem',
        'relative-sm': '0.875em',
        'relative-md': '1em',
        'relative-lg': '1.125em',
      },
      borderWidth: {
        3: '3px',
      },
      fontFamily: {
        paytone: ['Paytone One', 'sans-serif'],
      },
      transitionTimingFunction: {
        cubic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },
      gridTemplateColumns: {
        'particpant-layout': 'repeat(auto-fit, minmax(150px, 2fr))',
      },
      animation: {
        'fade-in': '2s linear ',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
    plugins: [],
  },
};
