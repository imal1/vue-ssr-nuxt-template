export default {
  title: '单一组件/结果',
  decorators: [() => ({ template: '<el-collapse :value="[1,2]"><story/></el-collapse>' })]
}

const ResultObj: any = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  template: `
    <Result :icon="icon" :title="title" :sub-title="subTitle" />
  `
})

export const Result = ResultObj.bind({})

Result.storyName = '错误提示'

Result.args = {
  icon: 'info',
  title: '错误提示',
  subTitle: '请根据提示进行操作'
}

Result.decorators = [() => ({ template: '<el-collapse-item title="错误提示" :name="1"><story/></el-collapse-item>'})]
