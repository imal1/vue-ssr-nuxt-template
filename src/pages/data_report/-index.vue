<template>
  <div class="p-20px">
    <search-bar />
    <report-page />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SearchBar from './-search-bar.vue'
import ReportPage from './-report-page.vue'

export default defineComponent({
  components: { SearchBar, ReportPage },
  setup() {
    return {}
  },
})
</script>

