<template>
  <div>
    <el-button v-bind="buttonAttrs" v-on="buttonEvents">
      {{ button.label }}
    </el-button>
    <el-dialog
      destory-on-close
      v-bind="dialogAttrs"
      :visible.sync="visible"
      v-on="dialogEvents"
    >
      <template v-if="!dialogAttrs.title" slot="title">
        <slot name="title" />
      </template>
      <slot />
      <template slot="footer">
        <slot name="footer" />
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import { GetObjectByTypeofValue, DifferFromObject } from './utils'

export default defineComponent({
  props: {
    button: {
      type: Object,
      required: true,
    },
    dialog: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
  },
  setup(props: any) {
    const visible = ref(false)
    const buttonProps = reactive(props.button)
    const dialogProps = reactive(props.dialog)
    const getFuncProps = GetObjectByTypeofValue('function')
    const buttonEvents = getFuncProps(buttonProps)
    const dialogEvents = getFuncProps(dialogProps)
    const buttonAttrs = DifferFromObject(buttonEvents, buttonProps)
    const dialogAttrs = DifferFromObject(dialogEvents, dialogProps)
    const { click } = buttonEvents

    buttonEvents.click = () => {
      if (click) {
        click()
      }
      visible.value = true
    }

    dialogProps.title = dialogProps.title || buttonProps.label

    return {
      visible,
      buttonAttrs,
      buttonEvents,
      dialogAttrs,
      dialogEvents,
    }
  },
})
</script>
