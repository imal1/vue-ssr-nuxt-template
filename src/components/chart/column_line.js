/* eslint-disable eqeqeq */
import { Chart } from '@antv/g2'
import { groupBy, size } from 'lodash'

export async function maketable(box, d1, d2) {
  const data = []
  const title = []
  if (d2 == '') {
    const peopd = []
    await d1.forEach(function (v) {
      if (v.name == '同比') {
        peopd.push(v)
      }
    })
    await peopd.forEach(function (v) {
      d1.forEach(function (n) {
        if (v.xvalue == n.xvalue && v.name != n.name) {
          const x = { time: n.xvalue, xv: n.yvalue, yv: v.yvalue }
          data.push(x)
        }
      })
    })
  } else {
    await d1.forEach(function (v) {
      title[0] = v.name
      const x = { name: v.name, time: v.xvalue, xv: v.yvalue, yv: 0 }
      data.push(x)
    })
    await d2.forEach(function (v, i) {
      title[1] = v.name
      data[i].yv = v.yvalue
    })
  }
  const mychart = new Chart({
    container: box,
    autoFit: true,
    height: 220,
  })
  mychart.data(data)
  mychart.scale({
    yv: {
      // min: 0,
      //   max: 4,
      alias: '同比',
    },
    xv: {
      min: 0,
      //   max: 100,
      alias: '数量',
    },
  })
  mychart.legend({
    custom: true,
    items: [
      {
        value: title[0],
        name: title[0],
        marker: { symbol: 'square', style: { fill: '#31bd9a', r: 5 } },
      },
      {
        value: title[1],
        name: title[1],
        marker: {
          symbol: 'hyphen',
          style: { stroke: '#fdae6b', r: 5, lineWidth: 3 },
        },
      },
    ],
    position: 'top',
  })
  mychart.axis('yv', {
    grid: null,
    title: null,
    label: {
      style: {
        fill: '#fdae6b',
      },
    },
  })
  mychart.axis('xv', {
    title: null,
  })
  mychart.tooltip({
    shared: true,
  })
  if (size(groupBy(d1, 'name')) > 1) {
    mychart
      .interval()
      .position('time*xv')
      .color('xv', ['#31bd9a', '#fdae6b'])
      .adjust([{ type: 'dodge', dodgeBy: 'name' }])
  } else {
    mychart.interval().position('time*xv').color('#31bd9a')
  }
  mychart.line().position('time*yv').color('#fdae6b').size(3).shape('smooth')
  mychart.point().position('time*yv').color('#fdae6b').size(3).shape('circle')

  mychart.interaction('active-region')
  mychart.removeInteraction('legend-filter') // 自定义图例，移除默认的分类图例筛选交互
  mychart.render()
}

export default maketable
