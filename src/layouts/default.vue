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
        :select="doNavSelect"
      />
    </el-header>
    <Container direction="horizontal">
      <Aside width="auto">
        <Menu
          :list="menuList"
          :default-openeds="$_.map(menuList, (menu) => menu.index)"
          :default-active="menuActive"
          :select="doMenuSelect"
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
  useRouter,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import { Container, Main, Aside } from 'element-ui'

export default defineComponent({
  components: { Container, Main, Aside },
  setup() {
    const store = useStore()
    const router = useRouter()
    const routeList = store.getters.routePathList
    const route = useRoute()
    const routePath = route.value.name?.split('-')[0]
    const navActive = ref(routePath === 'index' ? routeList[0].path : routePath)
    const menuActive = computed(() => route.value.query.menu)
    const menuList = computed(() => store.getters.menuIndexList)

    watch(menuList, (newList) => {
      if (!menuActive.value && newList?.length) {
        let initIndex = ''
        if (newList[0].children?.length) {
          initIndex = newList[0].children[0].index
        } else {
          initIndex = newList[0].index
        }
        router.replace({
          query: {
            menu: initIndex,
          },
        })
      }
    })

    const doNavSelect = (index: string) => {
      if (navActive.value !== index) {
        store.commit('SET_MENU_LIST', [])
        navActive.value = index
        router.replace({
          query: {
            menu: undefined,
          },
        })
      }
    }

    const doMenuSelect = (menu: string) => {
      router.replace({ query: { ...route.value.query, menu } })
    }

    return {
      routeList,
      menuList,
      navActive,
      menuActive,
      doNavSelect,
      doMenuSelect,
    }
  },
  watchQuery: ['menu'],
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
