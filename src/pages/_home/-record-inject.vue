<template>
  <el-collapse class="w-full" :value="details.map((d) => d.id)">
    <template v-for="detail in details">
      <el-collapse-item :key="detail.id" :name="detail.id" :title="detail.name">
        <Table
          border
          stripe
          default-expand-all
          :show-header="false"
          :columns="columns"
          :data="detail.childrenList"
          :tree-props="treeProps"
          row-key="id"
        >
          <!-- <template #input>
            <el-input />
          </template> -->
        </Table>
      </el-collapse-item>
    </template>
  </el-collapse>
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

export default defineComponent({
  setup(_props: any, ctx: any) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    store.dispatch('menu/fetchMenus', ctx.root)
    const menus = computed(() =>
      store.getters['menu/menusWithRoute'](route.value.params.home)
    )
    const details = computed(() => store.getters['record-inject/details'])

    watch([menus, route], ([newMenus, newRoute]) => {
      const { main, home } = newRoute.params
      if (home && !main) {
        router.replace(newMenus[0].route)
      }
      if (main) {
        store.dispatch('record-inject/fetchDetails', {
          chapterId: main,
          $http: ctx.root.$http,
          $loading: ctx.root.$loading,
        })
      }
    })

    const columns = [
      {
        prop: 'name',
      },
      {
        prop: 'input',
        width: '200',
      },
    ]

    const treeProps = { hasChildren: 'hasChildren', children: 'childrenList' }

    return {
      details,
      columns,
      treeProps,
    }
  },
})
</script>
