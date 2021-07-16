export default {
  title: 'Layout'
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

Menu.args = {
  list: [{
    name: '一级导航1',
    index: '1',
    children: [{
      name: '二级导航1',
      index: '1-1',
      children: [{
        name: '三级导航1',
        index: '1-1-1',
        icon: 's-opportunity'
      },{
        name: '三级导航2',
        index: '1-1-2',
      },{
        name: '三级导航3',
        index: '1-1-3',
      },{
        name: '三级导航4',
        index: '1-1-4',
      },{
        name: '三级导航5',
        index: '1-1-5',
      },{
        name: '三级导航6',
        index: '1-1-6',
      },{
        name: '三级导航7',
        index: '1-1-7',
      },{
        name: '三级导航8',
        index: '1-1-8',
      },]
    },{
      name: '二级导航2',
      index: '1-2'
    },{
      name: '二级导航3',
      index: '1-3'
    },{
      name: '二级导航4',
      index: '1-4'
    },{
      name: '二级导航5',
      index: '1-5'
    },{
      name: '二级导航6',
      index: '1-6'
    },{
      name: '二级导航7',
      index: '1-7'
    },{
      name: '二级导航8',
      index: '1-8'
    },]
  },{
    name: '一级导航2',
    index: '2',
  },{
    name: '一级导航3',
    index: '3',
  },{
    name: '一级导航4',
    index: '4',
  },{
    name: '一级导航5',
    index: '5',
  },{
    name: '一级导航6',
    index: '6',
  },{
    name: '一级导航7',
    index: '7',
  },{
    name: '一级导航8',
    index: '8',
  },],
  router: false
}
