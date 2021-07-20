<template>
  <div class="space-y-2">
    <el-table border :data="data" v-bind="otherAttrs">
      <template v-for="(column, index) in columns">
        <el-table-column v-bind="column" :key="index" />
      </template>
    </el-table>
    <el-pagination background class="text-right"> </el-pagination>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { OmitByArray } from '../utils'

export default defineComponent({
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    }
  },
  setup(props: any) {
    console.log(props)
    const getOtherProps = OmitByArray(['columns', 'data', 'pagination'])
    const otherAttrs = reactive(getOtherProps(props))

    return {
      otherAttrs,
    }
  },
})
</script>
