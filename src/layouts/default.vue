<template>
  <el-container>
    <el-header>
      <Nav :list="[]" />
    </el-header>
    <Nuxt />
    <el-footer></el-footer>
  </el-container>
</template>
<script lang="ts">
import {
  defineComponent,
  useRouter,
  useContext,
  ref,
  useStore
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { ssrContext } = useContext()
    const router = useRouter()
    const store = useStore()
    let list: any = ref([])
    if (ssrContext) {
      list = router.getRoutes().map((route: any) => ({
        ...route,
        index: route.path,
      }))
    }
    console.log(list, router.getRoutes())
    return {
      list,
    }
  },
})
</script>
