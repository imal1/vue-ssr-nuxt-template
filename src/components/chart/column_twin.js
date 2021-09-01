import { Column } from '@antv/g2plot'

export function maketable(box, data, _d2) {
  const mychart = new Column(box, {
    data,
    height: 240,
    isGroup: true,
    xField: 'xvalue',
    yField: 'yvalue',
    seriesField: 'name',
    /** 设置颜色 */
    // color: ['#1ca9e6', '#f88c24'],
    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle', // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        { type: 'interval-adjust-position' },
        // 数据标签防遮挡
        { type: 'interval-hide-overlap' },
        // 数据标签文颜色自动调整
        { type: 'adjust-color' },
      ],
    },
  })

  // mychart.interaction('active-region');
  // mychart.removeInteraction('legend-filter'); // 自定义图例，移除默认的分类图例筛选交互
  mychart.render()
}

export default maketable
