<template>
  <el-container>
    <el-header height="auto">
      <Form
        :ref="formRef"
        inline
        :items="formOptions.items"
        :values="formOptions.values"
        v-bind="formOptions.formAttrs"
        v-on="formOptions.formEvents"
      >
        <template v-for="(_, slot) in formOptions.formSlots" #[slot]>
          <div :key="slot">
            <slot :name="`form-${slot}`" />
          </div>
        </template>
      </Form>
    </el-header>
    <el-container>
      <el-aside v-if="treeOptions.length" width="auto">
        <el-tree
          :ref="treeRef"
          v-bind="treeOptions.treeAttrs"
          v-on="treeOptions.treeEvents"
        />
      </el-aside>
      <el-main>
        <Table
          :ref="tableRef"
          :columns="tableOptions.columns"
          :data="tableOptions.data"
          :pagination="tableOptions.pagination"
          v-bind="tableOptions.tableAttrs"
          v-on="tableOptions.tableEvents"
        >
          <template v-for="(_, slot) in tableOptions.tableSlots" #[slot]>
            <div :key="slot">
              <slot :name="`table-${slot}`" />
            </div>
          </template>
        </Table>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import { omit, keys, isFunction, pickBy } from 'lodash'
import { IFormItem } from './Form.vue'
import { ITableColumn } from './Table.vue'

interface IFormProps {
  items: IFormItem[]
  values?: Record<string, any>
  [key: string]: any
}

interface ITableProps {
  columns: ITableColumn[]
  data?: Record<string, any>[]
  pagination?: Record<string, any>
  [key: string]: any
}

export default defineComponent({
  props: {
    form: {
      type: Object as PropType<IFormProps>,
      required: false,
      default: () => ({}),
    },
    tree: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    table: {
      type: Object as PropType<ITableProps>,
      required: false,
      default: () => ({}),
    },
  },
  setup(props: any, { slots }: any) {
    const formRef = ref(null)
    const treeRef = ref(null)
    const tableRef = ref(null)
    const { form, tree, table } = props
    const { items, values, ...otherFormProps } = form
    const { columns, data, pagination, ...otherTableProps } = table
    const formEvents = pickBy(otherFormProps, isFunction)
    const formAttrs = omit(otherFormProps, keys(formEvents))
    const treeEvents = pickBy(tree, isFunction)
    const treeAttrs = omit(tree, keys(treeEvents))
    const tableEvents = pickBy(otherTableProps, isFunction)
    const tableAttrs = omit(otherTableProps, keys(tableEvents))
    const getNamedSlots = (name: string) => {
      const result = {} as Record<string, any>
      const keys = Object.keys(slots)
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].includes(name)) {
          result[keys[i].split('-')[1]] = slots[keys[i]]
        }
      }
      return result
    }
    const formSlots = reactive(getNamedSlots('form'))
    const tableSlots = reactive(getNamedSlots('table'))
    const formOptions = reactive({
      formAttrs,
      formEvents,
      formSlots,
      items,
      values,
    })
    const treeOptions = reactive({ treeAttrs, treeEvents })
    const tableOptions = reactive({
      columns,
      data,
      pagination,
      tableAttrs,
      tableEvents,
      tableSlots,
    })

    return {
      formRef,
      treeRef,
      tableRef,
      formOptions,
      treeOptions,
      tableOptions,
    }
  },
})
</script>

