<template>
  <div class="app-data-fill flex">
    <div class="flex-1 mx-10px px-10px pb-20px overflow-y-auto">
      <el-collapse class="w-full" :value="detailList.map((d) => d.id)">
        <template v-for="detail in detailList">
          <el-collapse-item
            :key="detail.id"
            :name="detail.id"
            :title="detail.name"
          >
            <data-table :list="detail.childrenList" />
          </el-collapse-item>
        </template>
      </el-collapse>
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
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import DataTable from './-data_table.vue'

export default defineComponent({
  components: { DataTable },
  setup(_props: any, ctx: any) {
    const { cloneDeep, map } = ctx.root.$_
    const store = useStore()
    // const router = useRouter()
    const route = useRoute()
    const subNav = computed(() => route.value.params.sub_nav)
    const detailList = computed(() =>
      cloneDeep(store.getters['data_fill/detailList'])
    )
    const recordList = computed(() => store.getters['data_fill/recordList'])

    if (subNav) {
      store.dispatch('data_fill/fetchDetailList', {
        chapterId: subNav.value,
      })
    }

    const doSubmit = () => {
      const results: any[] = []
      const getTargets = (arr: any[]) => {
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

    return {
      detailList,
      recordList,
      doSubmit,
    }
  },
})
</script>
<style lang="scss" scoped>
.app-data-fill {
  height: calc(100vh - 90px);
  >>> .el-collapse-item__header {
    font-size: 14px;
  }
}
</style>
