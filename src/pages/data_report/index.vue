<template>
  <div>
    <search-bar :search="searchModel" :do-search="doSearch" />
    <template v-for="route in MenuRoutes">
      <component
        :is="route"
        v-if="menuActive === route"
        :key="route"
        :search-model="searchModel"
      />
    </template>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  reactive,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import { flatten } from 'lodash'
import { DataReportMenu } from '../../typings/types'
import { DateType } from './search-bar/-util'
import SearchBar from './search-bar/-index.vue'

const MenuRoutes = flatten(
  DataReportMenu.map((item) =>
    item.children ? item.children.map((child) => child.route) : item.route
  )
)

export default defineComponent({
  components: {
    SearchBar,
    ...MenuRoutes.reduce((p: any, c: any) => {
      p[c] = () =>
        import(`./${c.split('-')[0]}/-${c.split('-')[1] || 'index'}.vue`)
      return p
    }, {}),
  },
  setup() {
    const { $dayjs, $message } = (getCurrentInstance() as any).proxy
    const store = useStore()
    const menuActive = computed(() => useRoute().value.query.menu)
    const searchModel = reactive({
      type: 'year',
      date: $dayjs(),
    })
    const doSearch = () => {
      const { date, type } = searchModel
      if (!date) {
        return $message.error(`请输入${(DateType as any)[type]}`)
      }
    }
    store.commit('SET_MENU_LIST', DataReportMenu)
    return {
      MenuRoutes,
      searchModel,
      doSearch,
      menuActive,
    }
  },
})
</script>
