export default {
  title: 'Components'
}

const TableObj: any = (_args: any, { argTypes }: any) => {
  return {
    props: Object.keys(argTypes),
    template: `
      <el-collapse :value="[1,2]">
        <el-collapse-item title="基础表格" :name="1">
          <Table :columns="columns" :data="data" />
        </el-collapse-item>
        <el-collapse-item title="自定义列数据表格" :name="2">
          <Table :columns="columns_action" :data="data" />
        </el-collapse-item>
      </el-collapse>
    `
  }
}

export const Table = TableObj.bind({})

Table.args = {
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
  columns_action: [{
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
    label: '操作',
    width: '120'
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
