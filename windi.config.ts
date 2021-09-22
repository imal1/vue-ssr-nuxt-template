/*
 * @Description:
 * @version:
 * @Author: imali
 * @Date: 2021-07-14 11:21:08
 * @LastEditors: imali
 * @LastEditTime: 2021-09-18 14:26:50
 */
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  mode: 'jit',
  attributify: true,
  important: true,
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
    require('windicss/plugin/scroll-snap'),
    require('@windicss/plugin-scrollbar'),
    require('windicss/plugin/line-clamp'),
  ],
})
