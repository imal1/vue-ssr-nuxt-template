export default {
  title: 'Components'
}

const ButtonDialogObj: any = (_args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  template: `
    <el-collapse :value="[1,2,3]">
      <el-collapse-item title="基础按钮对话框" :name="1">
        <ButtonDialog :button="button">
          <span>正文内容</span>
        </ButtonDialog>
      </el-collapse-item>
      <el-collapse-item title="自定义标题" :name="2">
        <ButtonDialog :button="button">
          <template v-slot:title>
            <el-tag>111</el-tag>
          </template>
        </ButtonDialog>
      </el-collapse-item>
      <el-collapse-item title="自定义页脚" :name="3">
        <ButtonDialog :button="button">
          <template v-slot:footer>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </template>
        </ButtonDialog>
      </el-collapse-item>
    </el-collapse>
  `
})

export const ButtonDialog = ButtonDialogObj.bind({})

ButtonDialog.args = {
  button: {
    type: 'primary',
    label: 'ButtonDialog按钮',
    click: () => {
      alert('您点击了ButtonDialog按钮！')
    }
  },
}
