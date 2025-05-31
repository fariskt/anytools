// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        rotateBack: 'rotateBack 3s linear infinite',
        rotateBackReverse: 'rotateBackReverse 4s linear infinite reverse',
      },
      keyframes: {
        rotateBack: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        rotateBackReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
};
