/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Shader-portal world. Contrast on void: mist 13.6, dim 7.2, ember 6.9, lilac 5.8.
        void: '#090B18',
        ink: '#12152A',
        night: '#1B1F3D',
        line: '#2A2F57', // hairlines and outlines only, never text
        lilac: { DEFAULT: '#7C7EF8', soft: '#A3A5FF' },
        mist: { DEFAULT: '#C9D6FF', dim: '#8F9BCB' },
        ember: '#FF6B3D',
      },
      fontFamily: {
        display: ['Antonio', 'Impact', 'sans-serif'],
        sans: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Martian Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        label: '0.22em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
