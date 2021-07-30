export default {
  title: '单一组件/表单',
  decorators: [() => ({ template: '<el-collapse :value="[1,2]"><story/></el-collapse>' })]
}

const FormInlineObj: any = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  template: `
    <Form inline :items="items" :values="values" labelWidth="auto">
      <template #select>
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </template>
      <template #radio>
        <el-radio :label="3">备选项1</el-radio>
        <el-radio :label="6">备选项2</el-radio>
        <el-radio :label="9">备选项3</el-radio>
      </template>
      <template #checkbox>
        <el-checkbox :label="1">备选项1</el-checkbox>
        <el-checkbox :label="2">备选项2</el-checkbox>
        <el-checkbox :label="3">备选项3</el-checkbox>
        <el-checkbox :label="4" disabled>备选项4</el-checkbox>
        <el-checkbox :label="5" disabled>备选项5</el-checkbox>
      </template>
      <template #actions>
        <el-button type="primary">查询</el-button>
        <el-button>取消</el-button>
      </template>
    </Form>
  `
})
const FormObj: any = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  template: `
    <el-card style="width: 400px">
      <Form :items="items" :values="values" labelWidth="auto">
        <template #select>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </template>
        <template #radio>
          <el-radio :label="3">备选项1</el-radio>
          <el-radio :label="6">备选项2</el-radio>
          <el-radio :label="9">备选项3</el-radio>
        </template>
        <template #checkbox>
          <el-checkbox :label="1">备选项1</el-checkbox>
          <el-checkbox :label="2">备选项2</el-checkbox>
          <el-checkbox :label="3">备选项3</el-checkbox>
          <el-checkbox :label="4" disabled>备选项4</el-checkbox>
          <el-checkbox :label="5" disabled>备选项5</el-checkbox>
        </template>
        <template #actions>
          <el-button type="primary">查询</el-button>
          <el-button>取消</el-button>
        </template>
      </Form>
    </el-card>
  `
})

export const Form = FormObj.bind({})
export const FormInline = FormInlineObj.bind({})

FormInline.storyName = '搜索栏'
Form.storyName = '竖行表单'

const args = {
  items: [{
    label: '输入',
    prop: 'input',
    content: {
      is: 'el-input',
      placeholder: '请输入'
    },
  }, {
    label: '计数',
    prop: 'inputnumber',
    content: {
      is: 'el-input-number'
    }
  }, {
    label: '选择',
    prop: 'select',
    content: {
      is: 'el-select',
      style: { width: '100%' },
    },
  }, {
    label: '多选',
    prop: 'checkbox',
    content: {
      is: 'el-checkbox-group'
    },
  }, {
    label: '单选',
    prop: 'radio',
    content: {
      is: 'el-radio-group'
    }
  }, {
    label: '开关',
    prop: 'switch',
    content: {
      is: 'el-switch'
    }
  }, {
    label: '日期',
    prop: 'date',
    content: {
      is: 'el-date-picker',
      placeholder: '请选择日期',
      style: { width: '100%' },
    }
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
  }],
  values: {
    select: 'shanghai',
    checkbox: []
  }
}
FormInline.args = args
Form.args = args

FormInline.decorators = [() => ({ template: '<el-collapse-item title="搜索栏" :name="1"><story/></el-collapse-item>' })]
Form.decorators = [() => ({ template: '<el-collapse-item title="竖行表单" :name="1"><story/></el-collapse-item>' })]
