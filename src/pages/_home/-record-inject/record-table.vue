<template>
  <Table
    border
    stripe
    default-expand-all
    :show-header="false"
    :columns="columns"
    :data="data"
    :tree-props="{ children: 'childrenList' }"
    row-key="id"
  >
    <template #input="{ row }">
      <el-input-number v-if="row.isTarget" v-model="row.val" :min="0" />
      <span v-else-if="row.type && row.targets">
        {{
          round(
            divide(
              row.childrenList.find(
                (c) => c.originId === row.formula.targetIdDe
              ).val,
              row.childrenList.find(
                (c) => c.originId === row.formula.targetIdMo
              ).val
            ),
            2
          ) || '--'
        }}
      </span>
    </template>
  </Table>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { round, divide, isNaN } from 'lodash'

export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  setup(props: any) {
    const columns = [
      {
        prop: 'name',
      },
      {
        prop: 'input',
        align: 'center',
        width: '200',
      },
    ]
    const data = ref(props.list)

    return {
      data,
      columns,
      round,
      divide,
      isNaN,
    }
  },
})
</script>
