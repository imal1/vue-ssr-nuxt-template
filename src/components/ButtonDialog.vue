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
      <template v-if="!dialogAttrs.title" #title>
        <slot name="title" />
      </template>
      <slot />
      <template #footer>
        <slot name="footer" :toggle-visible="toggleVisible" />
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import { omit, keys, isFunction, pickBy } from 'lodash'

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
  setup(props: any, ctx: any) {
    const visible = ref(false)
    const buttonProps = reactive(props.button)
    const dialogProps = reactive(props.dialog)
    const buttonEvents = pickBy(buttonProps, isFunction)
    const dialogEvents = pickBy(dialogProps, isFunction)
    const buttonAttrs = omit(buttonProps, keys(buttonEvents))
    const dialogAttrs = omit(dialogProps, keys(dialogEvents))
    const { click } = buttonEvents
    const toggleVisible = (toVisible: boolean) => {
      visible.value = toVisible
    }

    buttonEvents.click = async () => {
      if (click) {
        click()
      }
      await toggleVisible(true)
    }

    if (!ctx.slots.title) {
      dialogAttrs['title' as any] =
        dialogAttrs['title' as any] || buttonProps.label
    }

    return {
      visible,
      buttonAttrs,
      buttonEvents,
      dialogAttrs,
      dialogEvents,
      toggleVisible,
    }
  },
})
</script>
