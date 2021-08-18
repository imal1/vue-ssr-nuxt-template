<template>
  <resource-record-page />
</template>
<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { DataReportMenu } from '../../typings/types'
import ResourceRecordPage from './-index.vue'

export default defineComponent({
  components: {
    ResourceRecordPage,
  },
  setup() {
    const store = useStore()
    store.commit('setMenuList', DataReportMenu)
  },
})
</script>
