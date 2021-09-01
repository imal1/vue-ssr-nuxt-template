import { Line } from '@antv/g2plot'

export function maketable(box, data) {
  const plot = new Line(box, {
    autoFit: true,
    height: 240,
    data,
    // meta: {
    //   cpu: {
    //     time: { type: 'cat' },
    //     max: 100,
    //     min: 0,
    //   },
    // },
    xField: 'xvalue',
    yField: 'yvalue',
    seriesField: 'name',
    tooltip: { showMarkers: false },
    point: {
      shape: 'breath-point',
    },
  })

  plot.render()
}

export default maketable
