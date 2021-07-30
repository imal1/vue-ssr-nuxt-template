export default {
  title: '单一组件/按钮对话框',
  decorators: [() => ({ template: '<el-collapse :value="[1,2,3]"><story/></el-collapse>' })]
}

const ButtonDialogObj: any = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  template: `
    <ButtonDialog :button="button">
      <span>正文内容</span>
    </ButtonDialog>
  `
})
const ButtonDialogTitleObj: any = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  template: `
    <ButtonDialog :button="button">
      <template #title>
        <el-tag>111</el-tag>
      </template>
    </ButtonDialog>
  `
})
const ButtonDialogFooterObj: any = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  template: `
    <ButtonDialog :button="button">
      <template #footer>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </template>
    </ButtonDialog>
  `
})

export const ButtonDialog = ButtonDialogObj.bind({})
export const ButtonDialogTitle = ButtonDialogTitleObj.bind({})
export const ButtonDialogFooter = ButtonDialogFooterObj.bind({})

ButtonDialog.storyName = '按钮对话框'
ButtonDialogTitle.storyName = '自定义标题'
ButtonDialogFooter.storyName = '自定义页脚'

const args = {
  button: {
    type: 'primary',
    label: 'ButtonDialog按钮',
    click: () => {
      alert('您点击了ButtonDialog按钮！')
    }
  },
}
ButtonDialog.args = args
ButtonDialogTitle.args = args
ButtonDialogFooter.args = args

ButtonDialog.decorators = [() => ({ template: '<el-collapse-item title="基础按钮对话框" :name="1"><story/></el-collapse-item>' })]
ButtonDialogTitle.decorators = [() => ({ template: '<el-collapse-item title="自定义标题" :name="2"><story/></el-collapse-item>' })]
ButtonDialogFooter.decorators = [() => ({ template: '<el-collapse-item title="自定义页脚" :name="3"><story/></el-collapse-item>' })]
