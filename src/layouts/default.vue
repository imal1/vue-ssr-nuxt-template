<!--
 * @Author: imali
 * @Date: 2021-09-06 15:07:29
 * @LastEditTime: 2021-09-18 15:45:40
 * @LastEditors: imali
 * @Description:
-->
<template>
  <Container direction="vertical">
    <Header class="flex border-b h-60px">
      <!-- <div class="flex-1">
        <img src="~/assets/favicon.png" class="max-h-60px" />
      </div> -->
      <Nav
        class="lg:container lg:mx-auto"
        :list="routeList"
        :default-active="navActive"
        :select="doNavSelect"
      />
    </Header>
    <Container direction="horizontal">
      <Aside width="auto" class="h-[calc(100vh-60px)]">
        <LazyMenu
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
<script>
import { mapState } from 'vuex'
import { Container, Main, Aside } from 'element-ui'

export default {
  components: { Container, Main, Aside },
  data() {
    const routePath = this.$route.name?.split('-')[0]
    return {
      navActive:
        this.routeList && routePath === 'index'
          ? this.routeList[0].path
          : routePath,
    }
  },
  computed: {
    ...mapState({
      routeList: (s) => s.storage.routeList,
      menuList: (s) => s.storage.menuList,
    }),
    menuActive() {
      return this.$route.query.menu
    },
  },
  watch: {
    menuList(newList) {
      if (!this.menuActive && newList?.length) {
        let initIndex = ''
        if (newList[0].children?.length) {
          initIndex = newList[0].children[0].index
        } else {
          initIndex = newList[0].index
        }
        this.$router.replace({
          query: {
            menu: initIndex,
          },
        })
      }
    },
  },
  watchQuery: ['menu'],
  methods: {
    doNavSelect(index) {
      if (this.navActive !== index) {
        this.$storage.setState('menuList', [])
        this.navActive = index
        this.$router
          .replace({
            query: {
              menu: undefined,
            },
          })
          .catch(() => {})
      }
    },
    doMenuSelect(menu) {
      this.$router
        .replace({ query: { ...this.$route.query, menu } })
        .catch(() => {})
    },
  },
}
</script>
