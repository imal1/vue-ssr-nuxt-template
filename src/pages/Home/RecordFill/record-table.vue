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
        :disabled="!$_.isEmpty(row.deptValMap)"
      />
      <span v-else-if="row.type && row.targets">
        {{
          $_.round(
            $_.divide(
              row.childrenList.find(
                (c) => c.originId === row.formula.targetIdMo
              ).val,
              row.childrenList.find(
                (c) => c.originId === row.formula.targetIdDe
              ).val
            ),
            2
          ) || '--'
        }}
      </span>
    </template>
    <template #extra="{ row }">
      <ButtonDialog
        v-if="row.isTarget"
        :button="{
          label: '详细',
          click: () => click(row),
        }"
        :dialog="{
          width: '400px',
          beforeClose: () => (row.swapValMap = {}),
        }"
      >
        <el-tree
          highlight-current
          default-expand-all
          :expand-on-click-node="false"
          :data="deptList"
          :props="{ label: 'name' }"
        >
          <template #default="{ node, data }">
            <div class="flex justify-between w-full leading-28px">
              <span>{{ node.label }}</span>
              <el-input-number
                v-if="node.isLeaf"
                v-model="row.swapValMap[data.id]"
                :min="0"
              />
            </div>
          </template>
        </el-tree>
        <template #footer="{ toggleVisible }">
          <el-button @click="() => (row.swapValMap = {})">清空</el-button>
          <el-button
            type="primary"
            @click="() => doRowConfirm(row, toggleVisible)"
          >
            确定
          </el-button>
        </template>
      </ButtonDialog>
    </template>
  </Table>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  setup(props: any, ctx: any) {
    const { sum, values, compact, cloneDeep } = ctx.root.$_
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
    const tableData = computed(() => props.list)
    const doRowConfirm = (row: any, toggleDialog: any) => {
      if (compact(values(row.swapValMap)).length) {
        row.deptValMap = row.swapValMap
        row.val = sum(values(row.deptValMap))
      } else {
        row.deptValMap = null
      }
      toggleDialog(false)
    }
    const click = (row: any) => {
      row.swapValMap = cloneDeep(row.deptValMap) || {}
    }

    return {
      tableData,
      columns,
      deptList,
      doRowConfirm,
      click,
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
