<template>
  <el-container direction="vertical" class="lg:container lg:mx-auto">
    <portal-target slim name="header" />
    <el-container>
      <portal-target slim name="aside" />
      <el-main>
        <Nuxt />
      </el-main>
    </el-container>
    <portal-target slim name="footer" />
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>
