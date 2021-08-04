export default {
  title: '单一组件/表格',
  decorators: [() => ({ template: '<el-collapse :value="[1,2,3]"><story/></el-collapse>' })]
}

const TableObj: any = (_args: any, { argTypes }: any) => {
  return {
    props: Object.keys(argTypes),
    template: `<Table :columns="columns" :data="data" />`
  }
}
const TableParamObj: any = (_args: any, { argTypes }: any) => {
  return {
    props: Object.keys(argTypes),
    template: `<Table :columns="columns" :data="data" :show-header="false" />`
  }
}
const TableCompatibleObj: any = (_args: any, { argTypes }: any) => {
  return {
    props: Object.keys(argTypes),
    template: `
      <Table :columns="columns" :data="data">
        <template #action="{index}">
          <ButtonDialog v-if="index !== 2" :button="{label:'编辑',size:'mini'}" :dialog="{width:'70%'}">
            <Table :columns="columns" :data="data" :show-header="false" />
          </ButtonDialog>
        </template>
      </Table>
    `
  }
}

export const Table = TableObj.bind({})
export const TableParam = TableParamObj.bind({})
export const TableCompatible = TableCompatibleObj.bind({})

Table.storyName = '基础表格'
TableParam.storyName = '可自由传参'
TableCompatible.storyName = '自定义列渲染'

const args = {
  columns: [{
    prop: 'date',
    label: '日期',
    width: '180'
  }, {
    prop: 'name',
    label: '姓名',
    width: '180'
  }, {
    prop: 'address',
    label: '地址',
  }],
  data: [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }]
}
Table.args = args
TableParam.args = args
TableCompatible.args = {
  ...args,
  columns: [{
    prop: 'date',
    label: '日期',
    width: '180'
  }, {
    prop: 'name',
    label: '姓名',
    width: '180'
  }, {
    prop: 'address',
    label: '地址',
  }, {
    prop: 'action',
    label: '操作',
    width: '120'
  }],
}

Table.decorators = [() => ({ template: '<el-collapse-item title="基础表格" :name="1"><story/></el-collapse-item>' })]
TableParam.decorators = [() => ({ template: '<el-collapse-item title="可自由传参" :name="2"><story/></el-collapse-item>' })]
TableCompatible.decorators = [() => ({ template: '<el-collapse-item title="自定义列渲染" :name="3"><story/></el-collapse-item>' })]
