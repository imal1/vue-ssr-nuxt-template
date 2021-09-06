<template>
  <el-container class="lg:container lg:mx-auto">
    <el-header class="flex">
      <client-only>
        <div class="flex-1">
          <img src="~/assets/favicon.png" class="max-h-60px" />
        </div>
        <Nav :list="routes" />
      </client-only>
    </el-header>
    <el-container>
      <el-aside v-if="menus.length" class="<lg:w-auto lg:w-200px">
        <client-only>
          <Menu router :list="menus" class="my-3px" />
        </client-only>
      </el-aside>
      <el-main>
        <client-only>
          <Nuxt />
        </client-only>
      </el-main>
    </el-container>
    <el-footer></el-footer>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, useStore, ref } from '@nuxtjs/composition-api'

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
<style lang="postcss" scoped>
.el-header {
  border-bottom: solid 1px #e6e6e6;
}
</style>
