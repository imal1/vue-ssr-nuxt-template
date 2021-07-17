<template>
  <div class="space-y-2">
    <el-table border :data="data">
      <template v-for="(column, index) in columns">
        <el-table-column
          v-bind="column"
          :key="keyName ? column[keyName] : index"
        />
      </template>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total ? total : data.length"
      class="text-right"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    keyName: {
      type: String,
      required: false,
      default() {
        return ''
      },
    },
  },
  setup() {},
})
</script>
