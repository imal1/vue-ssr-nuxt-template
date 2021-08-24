<template>
  <div>
    <el-table
      ref="tableRef"
      stripe
      default-expand-all
      highlight-current-row
      :data="data"
      v-bind="attrs"
      v-on="events"
    >
      <template v-for="(col, index) in columns">
        <el-table-column
          v-if="!col.prop && col.type === 'index'"
          v-bind="col"
          :key="index"
        />
        <el-table-column v-else v-bind="col" :key="index">
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
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
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
    const tableFuncAttrName = [
      'row-class-name',
      'row-style',
      'cell-class-name',
      'cell-style',
      'header-row-class-name',
      'header-row-style',
      'header-cell-class-name',
      'header-cell-style',
      'row-key',
      'summary-method',
      'span-method',
      'load',
    ]
    const events = computed(() =>
      omit(pickBy(ctx.attrs, isFunction), tableFuncAttrName)
    )
    const attrs = computed(() => omit(ctx.attrs, keys(events.value)))

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
