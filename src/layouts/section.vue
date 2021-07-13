<template>
  <el-container>
    <el-aside></el-aside>
    <el-main>
      <NuxtChild />
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {

  },
})
</script>
