/*
 * @Description:
 * @version:
 * @Author: imali
 * @Date: 2021-07-14 11:21:08
 * @LastEditors: imali
 * @LastEditTime: 2021-07-15 17:49:59
 */
import { defineConfig } from 'windicss/helpers'
import scrollSnapPlugin from 'windicss/plugin/scroll-snap'

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
    colors: {
      primary: '#409EFF',
      'primary-light-1': '#53a8ff',
      'primary-light-2': '#66b1ff',
      'primary-light-3': '#79bbff',
      'primary-light-4': '#8cc5ff',
      'primary-light-5': '#a0cfff',
      'primary-light-6': '#b3d8ff',
      'primary-light-7': '#c6e2ff',
      'primary-light-8': '#d9ecff',
      'primary-light-9': '#ecf5ff',
      success: '#67C23A',
      'success-light': '#e1f3d8',
      'success-lighter': '#f0f9eb',
      warning: '#E6A23C',
      'warning-light': '#faecd8',
      'warning-lighter': '#fdf6ec',
      danger: '#F56C6C',
      'danger-light': '#fde2e2',
      'danger-lighter': '#fef0f0',
      info: '#909399',
      'info-light': '#e9e9eb',
      'info-lighter': '#f4f4f5',
      'text-primary': '#303133',
      'text-regular': '#606266',
      'text-secondary': '#909399',
      'text-placeholder': '#c0c4cc',
      'border-base': '#dcdfe6',
      'border-light': '#e4e7ed',
      'border-lighter': '#ebeef5',
      'border-extra-light': '#f2f6fc',
      'background-base': '#f5f7fa',
      'link-color': '#66b1ff',
    }
  },
  variants: {},
  plugins: [
    scrollSnapPlugin
  ],
})
