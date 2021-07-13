import { defineConfig } from 'windicss/helpers'
import scrollSnapPlugin from 'windicss/plugin/scroll-snap'

export default defineConfig({
  mode: 'jit',
  attributify: true,
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    scrollSnapPlugin
  ],
})
