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
      <el-aside v-if="menus.length" class="<lg:w-auto lg:w-200px">
        <Menu router :list="menus" class="my-3px" />
      </el-aside>
    </portal>
    <portal to="footer">
      <el-footer />
    </portal>
    <el-header height="20px" class="px-0">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="px-0"> 123 </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { state }: Record<string, any> = useStore()
    const routes = ref(
      state.routes.map((route: Record<string, any>) => ({
        ...route,
        index: route.path,
      }))
    )
    const menus = ref(state.menu.menus)
    return {
      routes,
      menus,
    }
  },
})
</script>
