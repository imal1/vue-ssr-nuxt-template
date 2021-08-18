<template>
  <sub-main-page />
</template>
<script lang="ts">
import {
  computed,
  useStore,
  defineComponent,
  useRoute,
  useRouter,
  watch,
  onMounted,
} from '@nuxtjs/composition-api'
import SubMainPage from './-index.vue'

export default defineComponent({
  components: { SubMainPage },
  setup() {
    const store = useStore()
    const router = useRouter()
    const subNav = computed(() => useRoute().value.params.sub_nav)
    const menuList = computed(() => (store.state as any).menuList)
    onMounted(() => {
      if (!menuList.value.length) {
        store.dispatch('fetchMenuList')
        store.dispatch('data_fill/fetchRecordList')
      }
    })
    watch([subNav, menuList], ([newNav, newMenuList]) => {
      if (!newNav && newMenuList.length) {
        router.replace(newMenuList[0].route)
      }
    })
    return {}
  },
})
</script>
