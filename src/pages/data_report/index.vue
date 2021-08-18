<template>
  <div>report</div>
</template>
<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { DataReportMenu } from '../../store/data_report/index'

export default defineComponent({
  setup() {
    const store = useStore()
    store.commit('setMenuList', DataReportMenu)
  },
})
</script>
