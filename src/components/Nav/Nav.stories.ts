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
      <el-collapse :value="[1,2]">
        <el-collapse-item title="主导航" :name="1">
          <Nav :list="list" :router="router" />
        </el-collapse-item>
        <el-collapse-item title="带子级导航" :name="2">
          <Nav :list="list_sub" :router="router" />
        </el-collapse-item>
      </el-collapse>
    `
  }
}

export const Navigation = Nav.bind({})

Navigation.args = {
  list: RouteJSON.data.map((item: any) => ({ ...item, children: null })),
  list_sub: RouteJSON.data,
  router: false
}
