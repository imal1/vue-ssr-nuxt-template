<!--
 * @Description:
 * @version:
 * @Author: imali
 * @Date: 2021-07-14 13:30:41
 * @LastEditors: imali
 * @LastEditTime: 2021-07-14 13:35:25
-->

<template>
  <el-form :ref="root" :model="model" v-bind="formAttrs" v-on="formEvents">
    <template v-for="item in formItems">
      <el-form-item
        :key="item.columnAttrs['prop']"
        v-bind="item.columnAttrs"
        v-on="item.columnEvents"
      >
        <component
          :is="item.content.is"
          v-if="item.content && item.content.is"
          v-model="model[item.columnAttrs['prop']]"
          v-bind="item.content.contentAttrs"
          v-on="item.content.contentEvents"
        >
          <slot :name="item.columnAttrs['prop']" />
        </component>
        <slot v-else :name="item.columnAttrs['prop']" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import { omit, keys, isFunction, pickBy } from 'lodash'

export interface IFormItem {
  prop: string
  label?: string
  content?: {
    is: string
    [key: string]: any
  }
  [key: string]: any
}

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<IFormItem[]>,
      required: true,
    },
    values: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  setup(props: any, { attrs }: any) {
    const root = ref(null)
    const model = reactive(props.values)
    const formItems = ref([] as any[])
    // 获取表单属性
    const formEvents = pickBy(attrs, isFunction)
    const formAttrs = omit(attrs, keys(formEvents.value))
    // 获取各栏属性
    formItems.value = props.items.map((item: any) => {
      const { content, ...otherItem } = item
      const columnEvents = pickBy(otherItem, isFunction)
      const columnAttrs = omit(otherItem, keys(columnEvents.value))
      item = { content, columnAttrs, columnEvents }
      // 获取输入框属性
      if (item.content?.is) {
        const { is, ...otherContent } = content
        const contentEvents = pickBy(otherContent, isFunction)
        const contentAttrs = omit(otherContent, keys(contentEvents.value))
        item.content = { is, contentEvents, contentAttrs }
      }
      return item
    })

    return {
      root,
      model,
      formItems,
      formEvents,
      formAttrs,
    }
  },
})
</script>
<style lang="postcss" scoped>
>>> .el-range-separator {
  min-width: 18px;
}
</style>
