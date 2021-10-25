<!--
 * @Author: imali
 * @Date: 2021-10-12 16:40:22
 * @LastEditTime: 2021-10-13 13:07:42
 * @LastEditors: imali
 * @Description:
-->
<template>
  <Container direction="vertical">
    <Header class="flex border-b h-60px">
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
          class="h-full"
          router
        />
      </Aside>
      <Main class="p-0">
        <Nuxt />
      </Main>
    </Container>
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
          ? this.routeList[0]?.path
          : routePath
    }
  },
  computed: {
    ...mapState({
      routeList: (s) => s.storage.routeList,
      menuList: (s) => s.storage.menuList
    }),
    menuActive() {
      return this.$route.name?.split('-')[1]
    },
    deepDep() {
      return [this.navActive, this.menuList]
    }
  },
  watch: {
    deepDep(newDeps) {
      const [newNav, newList] = newDeps[1]
      if (!this.menuActive && newList?.length && this.navActive !== 'index') {
        let initIndex = ''
        if (newList[0].children?.length) {
          initIndex = newList[0].children[0].index
        } else {
          initIndex = newList[0].index
        }
        this.$router.replace(`${newNav}/${initIndex}`)
      }
    }
  },
  methods: {
    doNavSelect(index) {
      if (this.navActive !== index) {
        this.$storage.setState('menuList', [])
        this.navActive = index
      }
    }
  }
}
</script>
