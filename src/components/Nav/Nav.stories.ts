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
    template: `
      <div>
        <h1>主导航</h1>
        <Nav :list="list" :router="router" />
        <el-divider />
        <h1>带子级导航</h1>
        <Nav :list="list_with_sub" :router="router" />
      </div>
    `
  }
}

export const Navigation = Nav.bind({})

Navigation.args = {
  list: RouteJSON.data.map((item: any) => ({ ...item, children: null })),
  list_with_sub: RouteJSON.data,
  router: false
}
