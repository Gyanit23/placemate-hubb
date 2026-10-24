/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14173A',
        pink: { DEFAULT: '#FF4F8B', tint: '#FFE3EE' },
        sun: { DEFAULT: '#FFC93C', tint: '#FFF1C9' },
        teal: { DEFAULT: '#0FBFA5', tint: '#D3F6EF' },
        royal: { DEFAULT: '#3D6BFF', tint: '#DFE7FF' },
        tang: { DEFAULT: '#FF7A3D', tint: '#FFE5D6' },
        night: { DEFAULT: '#0A0F1C', card: '#131A2E', line: '#252E4D' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Noto Sans Devanagari"', '"Trebuchet MS"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        pop: '4px 4px 0 0 #14173A',
        popsm: '3px 3px 0 0 #14173A',
        poplg: '8px 8px 0 0 var(--shadow, #FF4F8B)',
      },
    },
  },
  plugins: [],
}
