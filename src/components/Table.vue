<template>
  <div class="space-y-2">
    <el-table border :data="data" v-bind="$attrs">
      <template v-for="(column, index) in columns">
        <el-table-column v-bind="column" :key="index">
          <slot :name="column.prop" />
        </el-table-column>
      </template>
    </el-table>
    <el-pagination v-if="pagination" background class="text-right" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

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
})
</script>
