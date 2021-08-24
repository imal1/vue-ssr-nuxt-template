<template>
  <el-tabs v-model="tabActive" type="card" class="w-full">
    <el-tab-pane label="床位资源配置" name="bed">
      <el-row>
        <el-col :span="12">
          <div class="ml-8px text-lg">床位资源配置明细表</div>
          <Table
            ref="bedTable"
            height="calc(100vh - 200px)"
            :columns="bedTableColumns"
            :data="bedReportList"
            :row-click="doRowClick"
          />
        </el-col>
        <el-col :span="12" class="pl-8px cal-right">
          <div class="h-2/5 flex flex-col">
            <div class="text-lg">床位资源配置时间趋势</div>
            <div id="bed-trend" class="h-full" />
          </div>
          <div class="h-3/5 flex flex-col">
            <div class="text-lg">床位资源配置科室分布</div>
            <div id="bed-histogram" class="h-full" />
          </div>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="手术运行分析" name="surgery">
      <el-row>
        <el-col :span="12">
          <div class="ml-8px text-lg">出院手术概况</div>
          <el-card
            class="w-400px h-230px ml-8px"
            shadow="hover"
            :body-style="{ padding: '8px 12px' }"
          >
            <el-descriptions
              v-for="(report, key) in surgeryReportList"
              :key="key"
              :title="report.name"
              :colon="false"
            >
              <el-descriptions-item content-class-name="text-20px">
                {{ report.currentVal }}
              </el-descriptions-item>
              <el-descriptions-item label="同期值：">
                {{ report.periodVal }}
              </el-descriptions-item>
              <el-descriptions-item label="同比：">
                {{ report.compareVal }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
          <div class="ml-8px mt-8px text-lg">各科室出院患者手术明细表</div>
          <el-scrollbar class="surgery-cal-left">
            <Table
              ref="surgeryTable"
              show-summary
              height="calc(100vh - 450px)"
              :columns="surgeryTableColumns"
              :data="surgeryReportDetailList"
              :header-click="doColClick"
              :header-cell-class-name="
                ({ column }) =>
                  $_.isNumber(column.index)
                    ? `to-click-header-cell cursor-pointer ${
                        selectedColIndex === column.index ? 'is-active' : ''
                      }`
                    : ''
              "
            />
          </el-scrollbar>
        </el-col>
        <el-col :span="12" class="cal-right">
          <div class="h-2/5 flex flex-col">
            <div class="text-lg">出院手术患者比例时间趋势</div>
            <div id="surgery-trend" class="h-full" />
          </div>
          <div class="h-3/5 flex flex-col">
            <div class="text-lg">各手术科室年手术人次占其出院人次比例</div>
            <div id="surgery-histogram" class="h-full" />
          </div>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  watchEffect,
} from '@nuxtjs/composition-api'
import { MultiView, Bar } from '@antv/g2plot'
import { TransDateToYearMonth } from '../search-bar/util'

export default defineComponent({
  props: {
    searchModel: {
      type: Object,
      required: true,
    },
  },
  setup(props: any, ctx: any) {
    const { isNumber } = ctx.root.$_
    const { dispatch, getters } = useStore()
    const tabActive = ref('bed')
    const bedTable = ref(null as any)
    const bedReportList = ref([] as any[])
    const bedHistogramList = ref([] as any[])
    const bedTrendData = ref({ counts: [], rates: [] })
    const surgeryReportList = ref([] as any[])
    const surgeryReportDetailList = ref([] as any[])
    const surgeryTrendData = ref({ counts: [], rates: [] })
    const surgeryHistogramList = ref([] as any[])
    const selectedColIndex = ref(0)
    let bedTrendChart: any = null
    let bedHistogramChart: any = null
    let surgeryTrendChart: any = null
    let surgeryHistogramChart: any = null
    const bedTableColumns = [
      {
        prop: 'deptName',
        label: '科室名称',
        showOverflowTooltip: true,
        width: '200',
      },
      {
        prop: 'name',
        label: '指标名称',
      },
      {
        prop: 'currentVal',
        label: '本期值',
        align: 'center',
        width: '80',
      },
      {
        prop: 'periodVal',
        label: '同期值',
        align: 'center',
        width: '80',
      },
      {
        prop: 'compareVal',
        label: '同比',
        align: 'center',
        width: '80',
      },
    ]
    const surgeryTableColumns = [
      {
        type: 'index',
        label: '序号',
        align: 'center',
        width: '50',
      },
      {
        prop: 'deptName',
        label: '科室名称',
        showOverflowTooltip: true,
        width: '120',
      },
      {
        prop: 'surgeryOutRate',
        label: '各科室年手术人次占其出院人次比例',
        align: 'center',
        headerAlign: 'left',
        index: 0,
      },
      {
        prop: 'surgeryNum',
        label: '出院患者手术人次数',
        align: 'center',
        headerAlign: 'left',
      },
      {
        prop: 'outNum',
        label: '出院患者人次数',
        align: 'center',
        headerAlign: 'left',
      },
      {
        prop: 'deptAllOutRate',
        label: '各科室出院患者人次数占全院出院患者人次数比例',
        align: 'center',
        headerAlign: 'left',
        index: 1,
      },
      {
        prop: 'deptAllSurgeryRate',
        label: '各科室手术人次数占全院手术人次数比例',
        align: 'center',
        headerAlign: 'left',
        index: 2,
      },
    ]
    const bedPathPrefix = 'data_report/resource/record/bed'
    async function fetchBedReportList() {
      const { searchModel } = props
      await dispatch(`${bedPathPrefix}/fetchReportList`, {
        ...searchModel,
        ...TransDateToYearMonth(searchModel),
      })
      const fetchedList = getters[`${bedPathPrefix}/reportList`]
      bedReportList.value = fetchedList
      bedTable.value.$refs.tableRef.setCurrentRow(fetchedList[0])
    }
    async function fetchBedChartList(row: any) {
      const { searchModel } = props
      const payload = { ...TransDateToYearMonth(searchModel), ...row }
      await dispatch(`${bedPathPrefix}/fetchTrendData`, payload)
      bedTrendData.value = getters[`${bedPathPrefix}/trendData`]
      await dispatch(`${bedPathPrefix}/fetchHistogramList`, payload)
      bedHistogramList.value = getters[`${bedPathPrefix}/histogramList`]
    }
    const surgeryPathPrefix = 'data_report/resource/record/surgery'
    async function fetchSurgeryReportList() {
      const { searchModel } = props
      const payload = { ...searchModel, ...TransDateToYearMonth(searchModel) }
      await dispatch(`${surgeryPathPrefix}/fetchReportList`, payload)
      surgeryReportList.value = getters[`${surgeryPathPrefix}/reportList`]
      await dispatch(`${surgeryPathPrefix}/fetchReportDetailList`, payload)
      surgeryReportDetailList.value =
        getters[`${surgeryPathPrefix}/reportDetailList`]
    }
    async function fetchSurgeryTrendList() {
      const { searchModel } = props
      await dispatch(`${surgeryPathPrefix}/fetchTrendData`, searchModel)
      surgeryTrendData.value = getters[`${surgeryPathPrefix}/trendData`]
    }
    async function fetchSurgeryChartList(col: any) {
      const { searchModel } = props
      const payload = { ...TransDateToYearMonth(searchModel), ...col }
      await dispatch(`${surgeryPathPrefix}/fetchTrendData`, payload)
      surgeryTrendData.value = getters[`${surgeryPathPrefix}/trendData`]
      await dispatch(`${surgeryPathPrefix}/fetchHistogramList`, payload)
      surgeryHistogramList.value = getters[`${surgeryPathPrefix}/histogramList`]
    }

    const chartOptions = {
      xField: 'xvalue',
      yField: 'yvalue',
      seriesField: 'name',
    }
    function bedChartInit() {
      bedTrendChart = new MultiView('bed-trend', {
        tooltip: { shared: true },
        syncViewPadding: true,
        plots: [
          {
            type: 'column',
            options: {
              data: bedTrendData.value.counts,
              ...chartOptions,
            },
          },
          {
            type: 'line',
            options: {
              data: bedTrendData.value.rates,
              ...chartOptions,
            },
          },
        ],
      })
      bedTrendChart.render()
      bedHistogramChart = new Bar('bed-histogram', {
        data: bedHistogramList.value,
        xField: 'yvalue',
        yField: 'xvalue',
        seriesField: 'name',
        scrollbar: {
          type: 'vertical',
        },
      })
      bedHistogramChart.render()
    }
    function surgeryChartInit() {
      surgeryTrendChart = new MultiView('surgery-trend', {
        tooltip: { shared: true },
        syncViewPadding: true,
        plots: [
          {
            type: 'column',
            options: {
              data: surgeryTrendData.value.counts,
              ...chartOptions,
            },
          },
          {
            type: 'line',
            options: {
              data: surgeryTrendData.value.rates,
              ...chartOptions,
            },
          },
        ],
      })
      surgeryTrendChart.render()
      surgeryHistogramChart = new Bar('surgery-histogram', {
        data: surgeryHistogramList.value,
        xField: 'yvalue',
        yField: 'xvalue',
        seriesField: 'name',
        scrollbar: {
          type: 'vertical',
        },
      })
      surgeryHistogramChart.render()
    }

    watchEffect(async () => {
      await fetchBedReportList()
      await fetchBedChartList(bedReportList.value[0])
      await fetchSurgeryReportList()
      await fetchSurgeryTrendList()
      await fetchSurgeryChartList({ index: selectedColIndex.value })

      bedChartInit()
      surgeryChartInit()
    })

    const doRowClick = async (row: any) => {
      await fetchBedChartList(row)
      bedTrendChart.chart.views[0].changeData(bedTrendData.value.counts)
      bedTrendChart.chart.views[1].changeData(bedTrendData.value.rates)
      bedTrendChart.render()
      bedHistogramChart.changeData(bedHistogramList.value)
      bedHistogramChart.render()
    }
    const doColClick = async ({ index }: any) => {
      if (isNumber(index)) {
        selectedColIndex.value = index
        await fetchSurgeryChartList({ index })
      }
    }

    return {
      bedTable,
      tabActive,
      bedReportList,
      bedTableColumns,
      doRowClick,
      surgeryReportList,
      surgeryReportDetailList,
      surgeryTableColumns,
      doColClick,
      selectedColIndex,
    }
  },
})
</script>
<style lang="scss" scoped>
.cal-right {
  height: calc(100vh - 175px);
}
::v-deep .to-click-header-cell {
  &:hover,
  &.is-active {
    color: $--color-primary;
  }
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
  padding-right: 8px;
}
::v-deep .el-tabs__nav {
  margin-left: 8px;
}
</style>
