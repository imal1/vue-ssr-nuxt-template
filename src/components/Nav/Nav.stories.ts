/*
 * @Description:
 * @version:
 * @Author: imali
 * @Date: 2021-07-14 13:07:43
 * @LastEditors: imali
 * @LastEditTime: 2021-07-15 16:11:40
 */

const RouteJSON = require('../../static/routes.json')

export default {
  title: 'Layout',
  args: {
    list: RouteJSON.data.map((route: any) => ({
      ...route,
      index: route.path
    })),
    router: false
  }
}

const Nav = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  template: `
    <div v-bind="$props">
      <Nav :list="list" />
    </div>
  `
})

export const Navigation = Nav.bind({})
