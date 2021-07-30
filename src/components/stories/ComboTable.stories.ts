export default {
  title: '复合式组件/组合式表格',
  decorators: [() => ({ template: '<el-collapse :value="[1,2]"><story/></el-collapse>' })]
}

const ComboTableObj: any = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  template: `
    <ComboTable :form="form" :table="table">
      <template #form-actions>
        <el-button type="primary">查询</el-button>
      </template>
      <template #table-action>
        <ButtonDialog :button="{label:'编辑',size:'mini'}" :dialog="{width:'70%'}">
          123
        </ButtonDialog>
      </template>
    </ComboTable>
  `
})

export const ComboTable = ComboTableObj.bind({})

ComboTable.storyName = '组合式表格'

ComboTable.args = {
  form: {
    items: [{
      label: '输入',
      prop: 'input',
      content: {
        is: 'el-input',
        placeholder: '请输入'
      },
    }, {
      label: '日期范围',
      prop: 'daterange',
      content: {
        is: 'el-date-picker',
        type: 'daterange',
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        style: { width: '100%' },
      }
    }, {
      prop: 'actions',
      labelWidth: '0px',
      class: 'text-center'
    }]
  },
  table: {
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
}

ComboTable.decorators = [() => ({ template: '<el-collapse-item title="组合式表格" :name="1"><story/></el-collapse-item>' })]
