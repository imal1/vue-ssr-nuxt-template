<template>
  <div>
    <el-collapse class="w-full" :value="details.map((d) => d.id)">
      <template v-for="detail in details">
        <el-collapse-item
          :key="detail.id"
          :name="detail.id"
          :title="detail.name"
        >
          <record-table :list="detail.childrenList" :value="model" />
        </el-collapse-item>
      </template>
    </el-collapse>
    <div class="flex justify-center mt-20px">
      <el-button type="primary" @click="doSubmit">提交</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  useRoute,
  useRouter,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import { cloneDeep, get, isNil, omitBy, each } from 'lodash'
import RecordTable, { getPath } from './record-table.vue'

export default defineComponent({
  components: { RecordTable },
  setup(_props: any) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    store.dispatch('menu/fetchMenus')
    const menus = computed(() =>
      store.getters['menu/menusWithRoute'](route.value.params.home)
    )
    const details = computed(() =>
      cloneDeep(store.getters['record-inject/details'])
    )
    const model = reactive({})

    watch([menus, route], ([newMenus, newRoute]) => {
      const { main, home } = newRoute.params
      if (home && !main) {
        router.replace(newMenus[0].route)
      }
      if (main) {
        store.dispatch('record-inject/fetchDetails', {
          chapterId: main,
        })
      }
    })

    const doSubmit = () => {
      const newModel = omitBy(model, isNil)
      const payload: any[] = []
      each(newModel, (val, k) => {
        const keys = k.split('-')
        const result: any[] = []
        getPath(details.value, keys, 0, result)

        const { name, chapterId, accessId } = get(details.value, result)
        payload.push({
          name,
          val,
          chapterId,
          generalChapterId: accessId.split('-')[0],
          reportId: 0,
        })
      })
      store.dispatch('record-inject/saveTargets', payload)
    }

    return {
      details,
      model,
      doSubmit,
    }
  },
})
</script>
