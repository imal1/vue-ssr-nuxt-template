<template>
  <Container direction="vertical">
    <el-header class="flex border-b">
      <!-- <div class="flex-1">
        <img src="~/assets/favicon.png" class="max-h-60px" />
      </div> -->
      <Nav
        class="lg:container lg:mx-auto"
        :list="routeList"
        :default-active="navActive"
        :select="doMenuSelect"
      />
    </el-header>
    <Container direction="horizontal">
      <Aside width="auto">
        <Menu
          router
          :list="menuList"
          :default-openeds="$_.map(menuList, (menu) => menu.index)"
          :default-active="menuActive"
          class="h-full"
        />
      </Aside>
      <Main class="p-0">
        <Nuxt />
      </Main>
    </Container>
    <!-- <Footer height="30px" class="text-center">
      <span>@Mandala 曼荼罗</span>
    </Footer> -->
  </Container>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRoute,
  useStore,
} from '@nuxtjs/composition-api'
import { Container, Main, Aside } from 'element-ui'

export default defineComponent({
  components: { Container, Main, Aside },
  setup() {
    const store = useStore()
    const routeList = store.getters.routePathList
    const routePath = useRoute().value.name?.split('-')[0]
    const navActive = ref(routePath === 'index' ? routeList[0].path : routePath)
    const menuActive = computed(() => useRoute().value.params.menu_active)
    const menuList = computed(() =>
      store.getters.menuRouteList(navActive.value)
    )
    const doMenuSelect = (index: string) => {
      if (navActive.value !== index) {
        store.commit('clearMenuList')
        navActive.value = index
      }
    }
    return {
      routeList,
      menuList,
      navActive,
      menuActive,
      doMenuSelect,
    }
  },
})
</script>
<style lang="scss" scoped>
.el-aside {
  height: calc(100vh - 60px);
}
.el-footer {
  color: $--color-text-secondary;
}
</style>
