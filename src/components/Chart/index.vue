<template>
  <div :id="id" />
</template>
<script lang="ts">
import { ref, watch } from '@nuxtjs/composition-api'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  PropType,
} from '@vue/composition-api'
import {
  upperFirst,
  map,
  each,
  omit,
  round,
  get,
  meanBy,
  groupBy,
  values,
  compact,
  some,
} from 'lodash'
import * as g2plot from '@antv/g2plot'
import { IPlotTypes } from '@antv/g2plot/lib/plots/mix/utils'

const g2Theme = require('./g2-theme.json')

enum PresetPlotType {
  Line,
  Bar,
  Gauge,
}

interface IChartDataObj {
  xvalue: string | number
  yvalue: string | number
  name: string
}

export default defineComponent({
  props: {
    type: {
      type: [String, Array],
      required: true,
    },
    data: {
      type: [Array, Number] as PropType<IChartDataObj[] | IChartDataObj[][]>,
      required: true,
    },
    id: {
      type: String,
      required: false,
      default: () => require('uuid').v4().split('-').join(''),
    },
    scroll: {
      type: Boolean,
      required: false,
    },
  },
  setup(props: any, ctx: any) {
    const chartData = computed(() => props.data)
    const chart = ref(null as any)

    async function renderChart(data) {
      const plotType = upperFirst(props.type)
      chart.value = await new g2plot[plotType](props.id, {
        data,
        padding: 'auto',
        appendPadding: [20, 20, 20, 2],
        xField: plotType === PresetPlotType[1] ? 'yvalue' : 'xvalue',
        yField: plotType === PresetPlotType[1] ? 'xvalue' : 'yvalue',
        seriesField: 'name',
        xAxis: { nice: true },
        yAxis: {
          nice: true,
          label: {
            style: { fill: '#6f93f2' },
          },
        },
        label: {
          position: 'middle',
        },
        legend: {
          position: 'top',
        },
        isGroup: true,
        scrollbar: props.scroll
          ? {
              type: plotType === PresetPlotType[1] ? 'vertical' : 'horizontal',
              width: 4,
              height: 4,
            }
          : false,
        connectNulls: true,
        lineStyle: {
          lineWidth: 3,
        },
        maxColumnWidth: 60,
        minBarWidth: 15,
        point: {
          shape: 'circle',
        },
        meta: {
          xvalue: {
            sync: plotType !== PresetPlotType[1],
            formatter: (v, i: number) =>
              `${v}${
                plotType !== PresetPlotType[1]
                  ? ''
                  : get(data, `[${i}].unit`, '')
              }`,
          },
          yvalue: {
            sync: plotType === PresetPlotType[1],
            formatter: (v, i: number) =>
              `${v}${
                plotType === PresetPlotType[1]
                  ? ''
                  : get(data, `[${i}].unit`, '')
              }`,
          },
          nice: true,
        },
        ...omit(ctx.attrs, ['style']),
      })
    }

    async function renderGaugeChart(data) {
      chart.value = await new g2plot.Gauge(props.id, {
        percent: data,
        statistic: {
          content: {
            formatter: ({ percent }: any) =>
              `${ctx.attrs.title || ''} ${
                percent ? round(percent * 100) : 0
              }%`,
            style: {
              color: 'rgba(0,0,0,0.65)',
              fontSize: '24px',
            },
          },
        },
      })
    }

    async function renderMultiChart(data) {
      chart.value = await new g2plot.Mix(props.id, {
        tooltip: { shared: true },
        syncViewPadding: true,
        legend: {
          name: {
            position: 'top',
          },
        },
        plots: map(props.type, (t: string, i: number) => {
          const plotType = upperFirst(t)
          return {
            type: t,
            options: {
              padding: 'auto',
              appendPadding: [20, 20, 20, 2],
              syncViewPadding: true,
              isGroup: true,
              data: data?.length ? (data[i] as IChartDataObj) : [],
              xField: plotType === PresetPlotType[1] ? 'yvalue' : 'xvalue',
              yField: plotType === PresetPlotType[1] ? 'xvalue' : 'yvalue',
              yAxis:
                i === 0
                  ? {
                      nice: true,
                      label: {
                        style: { fill: '#6f93f2' },
                      },
                    }
                  : {
                      position: 'right',
                      nice: true,
                      line: null,
                      grid: null,
                      label: { style: { fill: '#fdae6b' } },
                    },
              xAxis: { nice: true },
              label: {
                position: 'middle',
              },
              seriesField: 'name',
              smooth: true,
              connectNulls: true,
              meta: {
                xvalue: {
                  sync: plotType !== PresetPlotType[1],
                  formatter: (v, fI: number) =>
                    `${v}${
                      plotType !== PresetPlotType[1]
                        ? ''
                        : get(data[i], `[${fI}].unit`, '')
                    }`,
                },
                yvalue: {
                  sync: plotType === PresetPlotType[1],
                  formatter: (v, fI: number) =>
                    `${v}${
                      plotType === PresetPlotType[1]
                        ? ''
                        : get(data[i], `[${fI}].unit`, '')
                    }`,
                },
                nice: true,
              },
              lineStyle: {
                lineWidth: 3,
              },
              maxColumnWidth: 60,
              minBarWidth: 15,
              point: {
                shape: 'circle',
              },
            },
          } as IPlotTypes
        }),
      })
    }

    onMounted(async () => {
      const { chartData } = (getCurrentInstance() as any).proxy
      if (typeof props.type === 'object') {
        await renderMultiChart(chartData)
      } else {
        switch (upperFirst(props.type)) {
          case PresetPlotType[2]:
            await renderGaugeChart(chartData)
            break
          default:
            await renderChart(chartData)
        }
      }
      chart.value.update(g2Theme)
      chart.value.render()
    })

    onUnmounted(() => {
      if (chart.value) {
        chart.value.destroy()
        chart.value = null
      }
    })

    watch(chartData, (newData) => {
      if (typeof props.type === 'object') {
        each(newData, (d: IChartDataObj, i: number) => {
          chart.value.chart.views[i].data(d)
        })
        chart.value.chart.render(true)
      } else {
        const groupData = groupBy(props.data, 'name')
        const plotType = upperFirst(props.type)
        chart.value.changeData(newData)
        if (plotType === PresetPlotType[0]) {
          chart.value.update({
            annotations: compact(
              map(values(groupData), (d, i) => {
                const dataAvg = meanBy(d, 'yvalue')
                if (some(d, 'yvalue')) {
                  return {
                    type: 'line',
                    top: true,
                    style: {
                      lineDash: [8, 2],
                      lineWidth: 2,
                      stroke: g2Theme.theme.colors10[i],
                      opacity: 0.6,
                    },
                    text: {
                      content: `${d[0].name}均值：${round(dataAvg, 2)}${get(
                        d,
                        '[0].unit',
                        ''
                      )}`,
                      offsetY: -4,
                    },
                    start: ['start', dataAvg],
                    end: ['end', dataAvg],
                  }
                }
              })
            ),
          })
        } else {
          chart.value.render(true)
        }
      }
    })

    return { chartData }
  },
})
</script>
