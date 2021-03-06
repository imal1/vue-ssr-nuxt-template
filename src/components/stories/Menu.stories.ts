export default {
  title: '复合式组件/菜单',
  decorators: [() => ({ template: '<el-collapse :value="[1]"><story/></el-collapse>' })]
}

const MenuObj: any = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  template: `
    <el-row>
      <el-col :span="3" style="min-width:300px">
        <el-card>
          <Menu :list="list" :router="router" />
        </el-card>
      </el-col>
    </el-row>
  `
})

export const Menu = MenuObj.bind({})

Menu.storyName = '菜单'

Menu.args = {
  list: [{
    name: '一级菜单1',
    index: '1',
    children: [{
      name: '二级菜单1',
      index: '1-1',
      children: [{
        name: '三级菜单1',
        index: '1-1-1',
        icon: 's-opportunity'
      }, {
        name: '三级菜单2',
        index: '1-1-2',
      }, {
        name: '三级菜单3',
        index: '1-1-3',
      }, {
        name: '三级菜单4',
        index: '1-1-4',
      }, {
        name: '三级菜单5',
        index: '1-1-5',
      }, {
        name: '三级菜单6',
        index: '1-1-6',
      }, {
        name: '三级菜单7',
        index: '1-1-7',
      }, {
        name: '三级菜单8',
        index: '1-1-8',
      },]
    }, {
      name: '二级菜单2',
      index: '1-2'
    }, {
      name: '二级菜单3',
      index: '1-3'
    }, {
      name: '二级菜单4',
      index: '1-4'
    }, {
      name: '二级菜单5',
      index: '1-5'
    }, {
      name: '二级菜单6',
      index: '1-6'
    }, {
      name: '二级菜单7',
      index: '1-7'
    }, {
      name: '二级菜单8',
      index: '1-8'
    },]
  }, {
    name: '一级菜单2',
    index: '2',
  }, {
    name: '一级菜单3',
    index: '3',
  }, {
    name: '一级菜单4',
    index: '4',
  }, {
    name: '一级菜单5',
    index: '5',
  }, {
    name: '一级菜单6',
    index: '6',
  }, {
    name: '一级菜单7',
    index: '7',
  }, {
    name: '一级菜单8',
    index: '8',
  },],
  router: false
}

Menu.decorators = [() => ({ template: '<el-collapse-item title="菜单" :name="1"><story/></el-collapse-item>' })]
