<template>
  <div>
    <el-table ref="tableRef" :data="data" v-bind="$attrs">
      <template v-for="(col, index) in columns">
        <el-table-column v-bind="col" :key="index">
          <template #default="{ row, column, $index }">
            <slot :name="col.prop" :row="row" :column="column" :index="$index">
              {{ row[col.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination v-if="pagination" background />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from '@nuxtjs/composition-api'
import { pickBy, omit, keys, isFunction } from 'lodash'

export interface ITableColumn {
  prop: string
  label: string
  [key: string]: any
}

export default defineComponent({
  props: {
    columns: {
      type: Array as PropType<ITableColumn[]>,
      required: true,
    },
    data: {
      type: Array,
      required: false,
      default() {
        return []
      },
    },
    pagination: {
      type: Object,
      required: false,
      default() {
        return null
      },
    },
  },
  setup(_props: any, ctx: any) {
    const attrs = ref({})
    const events = ref({})

    watch(ctx.attrs, (newAttrs) => {
      events.value = pickBy(newAttrs, isFunction)
      attrs.value = omit(newAttrs, keys(events.value))
    })

    return {
      attrs,
      events,
    }
  },
})
</script>
<style lang="postcss" scoped>
>>> .el-pagination {
  text-align: right;
}
</style>
