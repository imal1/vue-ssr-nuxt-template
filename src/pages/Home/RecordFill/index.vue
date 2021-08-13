<template>
  <div>
    <template v-for="record in recordList">
      <el-card :key="record.id" class="mb-20px">
        <el-descriptions border>
          <template v-for="key in Object.keys(record)">
            <el-descriptions-item :key="key" :label="key">
              {{ record[key] }}
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </el-card>
    </template>
  </div>
</template>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { getters, dispatch } = useStore()
    const recordList = computed(() => getters['RecordFill/recordList'])

    dispatch('RecordFill/fetchRecordList')

    return {
      recordList,
    }
  },
})
</script>
