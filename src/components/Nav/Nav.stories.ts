/*
 * @Description:
 * @version:
 * @Author: imali
 * @Date: 2021-07-14 13:07:43
 * @LastEditors: imali
 * @LastEditTime: 2021-07-15 17:51:14
 */

const RouteJSON = require('../../static/routes.json')

export default {
  title: 'Layout'
}

const Nav: any = (_args: any, { argTypes }: any) => {
  return {
    props: Object.keys(argTypes),
    template: `<Nav :list="list" :router="router" />`
  }
}

export const Navigation = Nav.bind({})

Navigation.args = {
  list: RouteJSON.data.map((route: any) => ({
    ...route,
    index: route.path
  })),
  router: false
}
