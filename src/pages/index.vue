<template>
  <div />
</template>

<script lang="ts">
import { defineComponent, useRouter, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_prop: any) {
    const store = useStore()
    const { routePathList } = store.getters
    if (routePathList.length) {
      useRouter().replace(routePathList[0].path)
    }
    return {}
  },
})
</script>
