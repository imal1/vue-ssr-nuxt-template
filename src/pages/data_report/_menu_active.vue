<template>
  <div>
    <search-bar :search="searchModel" :do-search="doSearch" />
    <resource-record-page
      v-if="menuActive === 'resource-record'"
      :search-model="searchModel"
    />
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
import { DataReportMenu } from '../../typings/types'
import { DateType } from './search-bar/util'
import SearchBar from './search-bar/-index.vue'
import ResourceRecordPage from './resource/-record.vue'

export default defineComponent({
  components: { SearchBar, ResourceRecordPage },
  setup() {
    const { $dayjs, $message } = (getCurrentInstance() as any).proxy
    const store = useStore()
    const menuActive = computed(() => useRoute().value.params.menu_active)
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
    store.commit('setMenuList', DataReportMenu)
    return {
      searchModel,
      doSearch,
      menuActive,
    }
  },
})
</script>
