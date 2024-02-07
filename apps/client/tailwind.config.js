/* eslint-disable*/
const plugin = require('tailwindcss/plugin.js');

/** @type {import('tailwindcss').Config} */

export default {
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant('nth-child-2', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`nth-child-2${separator}${className}`)}:nth-child(2)`;
        });
      });
    }),
  ],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': '2s linear ',
        'opacity-in': 'opacity-in 0.3s linear forwards',
        'reverse-opacity-in': 'reverse-opacity-in 0.7s linear forwards',
        'fade-up': 'fade-up 0.6s ease-in-out 0.12s 1 forwards',
        'circle-fade-in': 'circle-fade-in 0.3s ease-in-out 0.12s 1 forwards',
        'expand-page-in': 'expand-page-in 0.4s ease-in-out 0.12s 1 forwards',
        'open-vertical': 'open-vertical 0.3s ease-in-out 0.12s 1 forwards',
      },
      aspectRatio: {
        '1/4': '1/4',
        '4/1': '4/1',
      },
      backgroundImage: {
        button: `linear-gradient(90deg, rgba(12,159,21,1) 6%, rgba(46,198,120,1) 
          53%, rgba(17,163,110,1) 94%)`,
        'home-page-gradient': 'var(--home-page-gradient)',
        box: 'radial-gradient(circle, rgba(248,250,248,1) 24%, rgba(237,241,237,1) 100%)',
        stadium: "url('/images/stadium-showcase.jpg')",
        home: "url('/images/stadium.png')",
        title: 'var(--title)',
        subtitle: 'var(--subtitle)',
      },
      borderWidth: {
        3: '3px',
      },
      colors: {
        dark: 'var(--dark)',
        'base-light': 'var(--base-light)',
        base: 'var(--base)',
        grey: {
          regular: '#B6B7BA',
          off: 'var(--grey-off)',
          light: 'var(--grey-light)',
          constrast: ' #F8FBFF',
          'sub-text': 'var(--grey-sub-text)',
        },
        'text-base': 'var(--text-base)',
        primary: {
          100: 'var(--primary-100)',
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
          1100: 'var(--primary-1100)',
          gradient: 'var(--primary-gradient)',
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
        light: 'var(--light)',
        border: 'var(--border)',
        bubble: 'var(--bubble)',
        footer: 'var(--footer)',
        white: 'var(--white)',
      },
      fontFamily: {
        paytone: ['Paytone One', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.625rem',
        md: '1rem',
        'relative-sm': '0.875em',
        'relative-md': '1em',
        'relative-lg': '1.125em',
      },
      gridTemplateColumns: {
        'particpant-layout': 'repeat(auto-fit, minmax(150px, 2fr))',
      },
      height: {
        10.5: '42px',
        18: '72px',
        18.5: '76px',
        '75vh': '75vh',
        '50vh': '50vh',
        '60vh': '60vh',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'opacity-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'reverse-opacity-in': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'circle-fade-in': {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'expand-page-in': {
          '0%': {
            opacity: '0',
            flexGrow: '0',
            transformOrigin: 'top',
            height: '0',
            top: '0',
          },
          '100%': {
            opacity: '1',
            flexGrow: '1',
            transformOrigin: 'top',
            height: '100%',
          },
        },
        'open-vertical': {
          '0%': {
            opacity: '0',
            transformOrigin: 'top',
            height: '0',
          },
          '100%': {
            opacity: '1',
            transformOrigin: 'top',
            height: '26rem',
          },
        },
      },
      minHeight: {
        'screen-mobile': '100svh',
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      transitionTimingFunction: {
        cubic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },
      width: {
        18: '72px',
        18.5: '76px',
      },
    },
    plugins: [],
  },
};
