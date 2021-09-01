import { Scatter } from '@antv/g2plot'

export function maketable(box, data, xv, yv) {
  const scatterPlot = new Scatter(box, {
    data,
    height: 300,
    xField: xv,
    yField: yv,
    size: 5,
    pointStyle: {
      fill: '#5B8FF9',
    },
    axis: {
      title: {
        text: '11',
        position: 'center',
      },
    },
    label: {
      style: {
        text: 'name',
        fill: 'blue',
        opacity: 0.6,
        fontSize: 14,
      },
    },
  })
  scatterPlot.render()
}

export default maketable
