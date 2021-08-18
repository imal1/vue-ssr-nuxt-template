<template>
  <div>
    <el-table
      ref="tableRef"
      stripe
      default-expand-all
      highlight-current-row
      v-bind="$attrs"
      :data="data"
    >
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
<style lang="scss" scoped>
::v-deep .el-pagination {
  text-align: right;
}
::v-deep .el-table {
  .el-table-row {
    height: 40px;
    font-size: 14px;
  }
  .el-table__row--level-0 {
    font-size: 15px;
    height: 42px;
    font-weight: bold;
    color: $--color-text-primary;
  }
  .el-table__row--level-1 {
    font-weight: 500;
    color: $--color-text-primary;
  }
}
</style>
