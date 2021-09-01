<template>
  <div />
</template>
<script lang="ts">
import {
  defineComponent,
  useRoute,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_prop: any) {
    const store = useStore()
    const routePath = useRoute().value.name?.split('-')[0]
    const { routePathList } = store.getters
    if (routePath === 'index' && routePathList.length) {
      useRouter().replace(routePathList[0].path)
    }
    return {}
  },
})
</script>
