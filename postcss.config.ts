/*
 * @Description:
 * @version:
 * @Author: imali
 * @Date: 2021-07-14 11:21:08
 * @LastEditors: imali
 * @LastEditTime: 2021-07-14 14:55:29
 */
export default {
  syntax: 'postcss-scss',
  parser: 'postcss-scss',
  plugins: [
    require('windicss'),
    require('autoprefixer'),
  ],
};
