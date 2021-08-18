<template>
  <div class="flex">
    <div class="flex-1">
      <Table :columns="tableColumns" :data="tableData" />
    </div>
    <div class="w-300px"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>
