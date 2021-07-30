export default {
  title: '复合式组件/导航',
  decorators: [() => ({ template: '<el-collapse :value="[1,2]"><story/></el-collapse>' })]
}

const RouteJSON = require('../../static/routes.json')

const NavObj: any = (_args: any, { argTypes }: any) => {
  return {
    props: Object.keys(argTypes),
    template: `
      <Nav :list="list" :router="router" />
    `
  }
}
const NavSubObj: any = (_arg: any, { argTypes }: any) => {
  return {
    props: Object.keys(argTypes),
    template: `
      <Nav :list="list" :router="router" />
    `
  }
}

export const Nav = NavObj.bind({})
export const NavSub = NavSubObj.bind({})

Nav.storyName = '主导航'
NavSub.storyName = '带子级导航'

Nav.args = {
  list: RouteJSON.data.map((item: any) => ({ ...item, children: null })),
  router: false
}
NavSub.args = {
  list: RouteJSON.data,
  router: false
}

Nav.decorators = [() => ({ template: '<el-collapse-item title="主导航" :name="1"><story/></el-collapse-item>' })]
NavSub.decorators = [() => ({ template: '<el-collapse-item title="带子级导航" :name="2"><story/></el-collapse-item>' })]
