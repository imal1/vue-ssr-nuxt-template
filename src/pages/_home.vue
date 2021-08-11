<template>
  <div>
    <portal to="header">
      <el-header class="flex border-b border-border-light">
        <div class="flex-1">
          <img src="~/assets/favicon.png" class="max-h-60px" />
        </div>
        <Nav :list="routeList" />
      </el-header>
    </portal>
    <portal to="aside">
      <el-aside class="<lg:w-auto lg:w-200px">
        <Menu
          router
          :list="menus"
          :default-active="defaultActive"
          class="h-full"
        />
      </el-aside>
    </portal>
    <portal to="footer">
      <!-- <el-footer /> -->
    </portal>
    <el-container direction="vertical">
      <!-- <el-header height="20px" class="px-0">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header> -->
      <NuxtChild />
    </el-container>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onUpdated,
  ref,
  useRoute,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  scrollToTop: true,
  setup(_prop: any) {
    const store = useStore()
    const router = useRouter()
    const routeList = store.getters.routePathList
    const route = useRoute()
    const defaultActive = ref('')
    const { home, main } = route.value.params
    const menus = computed(() => store.getters['app/menusWithRoute'](home))
    if (routeList.length && !home) {
      router.replace(`/${routeList[0].path}`)
    }

    onUpdated(() => {
      const { data }: any = getCurrentInstance()
      if (data.defaultActive !== main) {
        data.defaultActive = main
      }
    })

    return {
      routeList,
      menus,
      defaultActive,
    }
  },
})
</script>
