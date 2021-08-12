<template>
  <div>
    <el-collapse class="w-full" :value="details.map((d) => d.id)">
      <template v-for="detail in details">
        <el-collapse-item
          :key="detail.id"
          :name="detail.id"
          :title="detail.name"
        >
          <record-table :list="detail.childrenList" />
        </el-collapse-item>
      </template>
    </el-collapse>
    <div class="flex justify-center mt-20px">
      <el-button type="primary" @click="doSubmit">提交</el-button>
    </div>
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
import RecordTable from './record-table.vue'

export default defineComponent({
  components: { RecordTable },
  setup(_props: any, ctx: any) {
    const { cloneDeep, map } = ctx.root.$_
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    store.dispatch('app/fetchMenus')
    const menus = computed(() =>
      store.getters['app/menusWithRoute'](route.value.params.home)
    )
    const details = computed(() =>
      cloneDeep(store.getters['record-inject/details'])
    )

    watch([menus, route], ([newMenus, newRoute]) => {
      const { main, home } = newRoute.params
      if (home && !main) {
        router.replace(newMenus[0].route)
      }
      if (main) {
        store.dispatch('record-inject/fetchDetails', {
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
      getTargets(details.value)
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
      store.dispatch('record-inject/saveTargets', payload)
    }

    return {
      details,
      doSubmit,
    }
  },
})
</script>
<style lang="postcss" scoped>
>>> .el-collapse-item__header {
  font-size: 14px;
}
</style>
