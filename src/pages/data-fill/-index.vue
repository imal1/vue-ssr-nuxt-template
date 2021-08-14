<template>
  <div class="app-data-fill">
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
    <el-timeline>
      <el-timeline-item></el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useRoute,
  useRouter,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import DataTable from './-data-table.vue'

export default defineComponent({
  components: { DataTable },
  setup(_props: any, ctx: any) {
    const { cloneDeep, map } = ctx.root.$_
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    store.dispatch('fetchMenuList')
    const menus = computed(() =>
      store.getters.menuRouteList(route.value.params.home)
    )
    const detailList = computed(() =>
      cloneDeep(store.getters['data-fill/detailList'])
    )

    watch([menus, route], ([newMenus, newRoute]) => {
      const { main, home } = newRoute.params
      if (home && !main) {
        router.replace(newMenus[0].route)
      }
      if (main) {
        store.dispatch('data-fill/fetchDetailList', {
          chapterId: main,
        })
      }
    })

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
      store.dispatch('data-fill/saveTargets', payload)
    }

    return {
      detailList,
      doSubmit,
    }
  },
})
</script>
<style lang="postcss" scoped>
.app-data-fill {
  width: calc(100% - 100px);
}
>>> .el-collapse-item__header {
  font-size: 14px;
}
</style>
