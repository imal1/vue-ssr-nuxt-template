<template>
  <el-container>
    <portal to="header">
      <el-header class="flex border-b border-border-light">
        <div class="flex-1">
          <img src="~/assets/favicon.png" class="max-h-60px" />
        </div>
        <Nav :list="routes" />
      </el-header>
    </portal>
    <portal to="aside">
      <el-aside class="<lg:w-auto lg:w-200px">
        <Menu
          router
          :list="menus"
          :default-active="route.params.main"
          class="my-7px"
        />
      </el-aside>
    </portal>
    <portal to="footer">
      <el-footer />
    </portal>
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
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRoute,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_prop: any) {
    const { state }: any = useStore()
    const router = useRouter()
    const route = useRoute().value
    const routes = ref(
      state.routes.map((route: Record<string, any>) => ({
        ...route,
        index: route.path,
      }))
    )
    const menus = computed(() => state.menu.menus)
    router.replace(`/${routes.value[0].path}`)

    return {
      routes,
      route,
      menus,
    }
  },
})
</script>
