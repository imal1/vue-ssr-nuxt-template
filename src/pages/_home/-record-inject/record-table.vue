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
      <el-input-number
        v-if="row.isTarget"
        v-model="model[row.id]"
        :min="0"
        @change="(v) => doInputChange(v, row)"
      />
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
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import { set, toNumber, round, divide, isNaN } from 'lodash'

export function getPath(arr: any[], keys: any[], index: number, result: any[]) {
  const i = arr.findIndex((a: any) => {
    return (a.originId || a.id) === toNumber(keys[index])
  })
  if (i > -1) {
    result.push(i)
    if (index < keys.length - 1) {
      result.push('childrenList')
      getPath(arr[i].childrenList, keys, index + 1, result)
    }
  }
}

export default defineComponent({
  props: {
    value: {
      type: Object,
      required: true,
    },
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
    const model = computed(() => props.value)

    const doInputChange = (val: any, row: any) => {
      const keys = row.accessId.split('-')
      const result: any[] = []
      getPath(data.value, keys, 1, result)
      result.push('val')
      set(data.value, result, val)
    }

    return {
      data,
      columns,
      model,
      round,
      divide,
      isNaN,
      doInputChange,
    }
  },
})
</script>
