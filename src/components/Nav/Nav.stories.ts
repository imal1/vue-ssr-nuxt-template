/*
 * @Description:
 * @version:
 * @Author: imali
 * @Date: 2021-07-14 13:07:43
 * @LastEditors: imali
 * @LastEditTime: 2021-07-14 14:40:11
 */

const RouteJSON = require('../../static/routes.json')
const list: any[] = RouteJSON.data.map((route: any) => ({
  ...route,
  index: route.path
}))

export default {
  title: 'Layout',
}

export const Navigation = () => `<Nav :list='${JSON.stringify(list)}' />`
