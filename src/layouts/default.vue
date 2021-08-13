<template>
  <Container direction="vertical" class="lg:container lg:mx-auto">
    <portal-target slim name="header" />
    <Container direction="horizontal">
      <portal-target slim name="aside" />
      <Main>
        <Nuxt />
      </Main>
    </Container>
    <portal-target slim name="footer" />
  </Container>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Container, Main } from 'element-ui'

export default defineComponent({
  components: { Container, Main },
  setup() {},
})
</script>
<style lang="postcss" scoped>
.el-container .el-container {
  height: calc(100vh - 60px);
}
</style>
