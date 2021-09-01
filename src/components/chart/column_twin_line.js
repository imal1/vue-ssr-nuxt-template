/* eslint-disable eqeqeq */
import { Column } from '@antv/g2plot'

export function maketable(box, d1, d2) {
   d1.forEach(function (v){
       d2.push(v)
   })
   const data = d2

  const mychart = new Column(box, {
      data,
      isGroup: true,
      height: 240,
      xField: 'xvalue',
      yField: 'yvalue',
      seriesField: 'name',
    })
  
  mychart.render()
}

export default maketable
