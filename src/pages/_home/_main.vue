<template>
  <record-inject-page />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import RecordInjectPage from './-record-inject/index.vue'

export default defineComponent({
  components: { RecordInjectPage },
  setup() {},
})
</script>
