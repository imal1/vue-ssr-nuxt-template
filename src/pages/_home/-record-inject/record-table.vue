<template>
  <Table
    border
    stripe
    default-expand-all
    :indent="42"
    :show-header="false"
    :columns="columns"
    :data="tableData"
    :tree-props="{ children: 'childrenList' }"
    row-key="id"
  >
    <template #input="{ row }">
      <el-input-number
        v-if="row.isTarget"
        v-model="row.val"
        :min="0"
        :disabled="Object.keys(row.deptValMap).length ? true : false"
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
    <template #extra="{ row }">
      <ButtonDialog v-if="row.isTarget" :button="{ label: '详细' }">
        <el-tree default-expand-all :data="deptList" :props="{ label: 'name' }">
          <template #default="{ node, data }">
            <div class="flex justify-between w-full leading-28px">
              <span>{{ node.label }}</span>
              <el-input-number
                v-if="node.isLeaf"
                v-model="row.deptValMap[data.id]"
                @change="() => doRowSum(row)"
              />
            </div>
          </template>
        </el-tree>
        <template #footer>
          <el-button type="primary" @click="() => doRowClear(row)">
            清空
          </el-button>
        </template>
      </ButtonDialog>
    </template>
  </Table>
</template>
<script lang="ts">
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api'
import { round, divide, isNaN, values, sum } from 'lodash'

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
        width: '160',
      },
      {
        prop: 'extra',
        align: 'center',
        width: '80',
      },
    ]
    const store = useStore()
    const deptList = ref(store.getters.deptList)
    const tableData = ref(props.list)
    const doRowClear = (row: any) => {
      row.deptValMap = {}
    }
    const doRowSum = (row: any) => {
      row.val = sum(values(row.deptValMap))
    }

    return {
      tableData,
      columns,
      deptList,
      round,
      divide,
      isNaN,
      doRowClear,
      doRowSum,
    }
  },
})
</script>
<style lang="postcss" scoped>
>>> .el-table__row.expanded.el-table__row--level-0 {
  font-size: 13px;
  color: #303133;
}
>>> .el-table__row.el-table__row--level-2 {
  color: #909399;
}
>>> .el-tree-node__content {
  height: 36px;
}
</style>
