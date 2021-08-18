<template>
  <div class="app-data-fill flex">
    <div class="flex-1 mx-10px px-10px pb-20px overflow-y-auto">
      <Table
        v-loading="tableLoading"
        border
        stripe
        default-expand-all
        :show-header="false"
        :columns="columns"
        :data="detailList"
        :tree-props="{ children: 'childrenList' }"
        :span-method="spanMethod"
        row-key="id"
      >
        <template #input="{ row }">
          <el-input-number
            v-if="row.isTarget"
            v-model="row.val"
            :min="0"
            :disabled="!$_.isEmpty(row.deptValMap)"
          />
          <span v-else-if="row.type && row.targets && row.formula">
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
              click: () => clickDetailTarget(row),
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
      <div class="flex justify-center mt-20px">
        <el-button type="primary" @click="doSubmit">提交</el-button>
      </div>
    </div>
    <div class="w-100px flex items-center -mt-60px">
      <el-timeline class="m-0 p-0">
        <el-timeline-item
          v-for="record in recordList"
          :key="record.id"
          :timestamp="`${record.reportYear}-${record.reportMonth}`"
        >
          {{ record.orgCode }} {{ record.orgName }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRoute,
  useStore,
  watchEffect,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_props: any, ctx: any) {
    const { cloneDeep, map, sum, values, compact } = ctx.root.$_
    const store = useStore()
    const route = useRoute()
    const deptList = ref(store.getters.deptList)
    const subNav = computed(() => route.value.params.sub_nav)
    const detailList = ref([] as any[])
    const recordList = computed(() => store.getters['data_fill/recordList'])
    const tableLoading = ref(true)
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
    const spanMethod = ({ row }: any) => {
      if (row.isParent) {
        return {
          rowspan: 1,
          colspan: 3,
        }
      }
    }

    watchEffect((onInvalidate) => {
      onInvalidate(() => (detailList.value = []))
      if (subNav.value) {
        store
          .dispatch('data_fill/fetchDetailList', {
            chapterId: subNav.value,
          })
          .then(() => {
            detailList.value = store.getters['data_fill/detailTargetList']
            tableLoading.value = false
          })
      }
    })

    const doSubmit = () => {
      const results: any[] = []
      function getTargets(arr: any[]): void {
        arr.forEach((item: any) => {
          if (item.targets?.length) {
            results.push(...item.childrenList.filter((c: any) => c.val))
          } else {
            getTargets(item.childrenList)
          }
        })
      }
      getTargets(detailList.value)
      const payload = results.map(
        ({ name, val, chapterId, originId, deptValMap }: any) => ({
          name,
          val,
          chapterId,
          id: originId,
          reportId: 0,
          generalChapterId: route.value.params.main,
          targetDeptList: map(deptValMap, (val: any, deptId: any) => ({
            targetId: originId,
            chapterId,
            deptId,
            val,
            reportId: 0,
          })).filter((item: any) => item.val),
        })
      )
      store.dispatch('data_fill/saveTargets', payload)
    }
    const doRowConfirm = (row: any, toggleDialog: any) => {
      if (compact(values(row.swapValMap)).length) {
        row.deptValMap = row.swapValMap
        row.val = sum(values(row.deptValMap))
      } else {
        row.deptValMap = null
      }
      toggleDialog(false)
    }
    const clickDetailTarget = (row: any) => {
      row.swapValMap = cloneDeep(row.deptValMap) || {}
    }

    return {
      columns,
      tableLoading,
      spanMethod,
      deptList,
      detailList,
      recordList,
      doSubmit,
      doRowConfirm,
      clickDetailTarget,
    }
  },
})
</script>
<style lang="scss" scoped>
.app-data-fill {
  height: calc(100vh - 90px);
  ::v-deep .el-table__empty-block {
    min-height: calc(100vh - 160px);
  }
  ::v-deep .el-collapse-item__header {
    font-size: 14px;
  }
  ::v-deep .el-table__row--level-0 {
    font-size: 14px;
    height: 48px;
    font-weight: 500;
    color: $--color-text-primary;
  }
  ::v-deep .el-table__row--level-1 {
    font-size: 13px;
    color: $--color-text-primary;
    font-weight: 500;
  }
  ::v-deep .el-table__row--level-3 {
    color: #909399;
  }
  ::v-deep .el-tree-node__content {
    height: 36px;
  }
}
</style>
