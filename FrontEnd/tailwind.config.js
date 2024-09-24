export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes:{
        slideTeam:{
          '0%, 100%':{transform:'translateX(0)'},
          '50%':{transform:'translateX(50%)'},
        },
        fadeIn:{
          '0%':{opacity:0},
          '100%':{opacity:1},
        },
      },
      fontFamily:{
        'sans': ['Poppins','sans-serif'],
      },
      animation:{
        fadeIn:'fadeIn 1.5s ease-in-out',
      },
    },
  },
  variants:{},
  plugins: [],
}

