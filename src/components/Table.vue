<template>
  <div>
    <el-table
      ref="tableRef"
      :stripe="isNil(attrs.stripe) ? true : attrs.stripe"
      :border="isNil(attrs.border) ? true : attrs.border"
      :default-expand-all="
        isNil(attrs.defaultExpandAll) ? true : attrs.defaultExpandAll
      "
      :data="data"
      v-bind="attrs"
      v-on="events"
    >
      <template v-for="(col, index) in columns">
        <el-table-column
          v-if="!col.prop && col.type === 'index'"
          :key="col.prop || index"
          :resizable="false"
          align="center"
          v-bind="col"
        />
        <el-table-column
          v-else-if="col.children"
          :key="col.prop || index"
          :resizable="false"
          align="center"
          v-bind="col"
        >
          <el-table-column
            v-for="(c, i) in col.children"
            :key="c.prop || `${index}${i}`"
            :resizable="false"
            header-align="left"
            v-bind="c"
          >
            <template v-if="!c.formatter" #default="{ row, column, $index }">
              <slot :name="c.prop" :row="row" :column="column" :index="$index">
                {{ isNil(row[c.prop]) ? c.empty : row[c.prop] }}
              </slot>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          :key="col.prop || index"
          :resizable="false"
          v-bind="col"
        >
          <template v-if="!col.formatter" #default="{ row, column, $index }">
            <slot :name="col.prop" :row="row" :column="column" :index="$index">
              {{ isNil(row[col.prop]) ? col.empty : row[col.prop] }}
            </slot>
          </template>
          <template
            v-if="!col.label && col.header"
            #header="{ column, $index }"
          >
            <slot
              :name="`${col.prop}-header`"
              :column="column"
              :index="$index"
            />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="pagination"
      background
      v-bind="paginAttrs"
      v-on="paginEvents"
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { pickBy, omit, keys, isFunction, isNil } from 'lodash'

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
  setup(props: any, ctx: any) {
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

    const paginEvents = computed(() => pickBy(props.pagination, isFunction))
    const paginAttrs = computed(() =>
      omit(props.pagination, keys(paginEvents.value))
    )

    return {
      attrs,
      events,
      paginEvents,
      paginAttrs,
      isNil,
    }
  },
})
</script>
<style lang="scss" scoped>
::v-deep .el-pagination {
  margin-top: 8px;
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
