// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/shadcn-vue/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        stroke: '#E5E7EB',
      },
    },
  },
 plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
