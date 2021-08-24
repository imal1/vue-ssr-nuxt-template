<template>
  <data-fill-page />
</template>
<script lang="ts">
import {
  computed,
  useStore,
  defineComponent,
  useRoute,
  useRouter,
  onMounted,
  watchEffect,
} from '@nuxtjs/composition-api'
import DataFillPage from './-index.vue'

export default defineComponent({
  components: { DataFillPage },
  setup() {
    const store = useStore()
    const router = useRouter()
    const menuActive = computed(() => useRoute().value.params.menu_active)
    const menuList = computed(() => (store.state as any).menuList)
    onMounted(() => {
      if (!menuList.value.length) {
        store.dispatch('fetchMenuList')
        store.dispatch('data_fill/fetchRecordList')
      }
    })
    watchEffect(() => {
      if (!menuActive.value && menuList.value?.length) {
        router.replace(menuList.value[0].route)
      }
    })
    return {}
  },
})
</script>
