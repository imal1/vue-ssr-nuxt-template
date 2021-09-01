import { Bar } from '@antv/g2plot'

const sortBykey = function (ary, key) {
  return ary.sort(function (a, b) {
    const x = a[key]
    const y = b[key]
    return x > y ? -1 : x < y ? 1 : 0
  })
}
const getten = function (arr){
  const newarr = []
  arr.forEach(function (v,i){
    if(i<10){
      newarr.push(v)
    }
  })
  return newarr
}

export function maketablea(box, data, unit) {
  const barPlot = new Bar(box, {
    autoFit: true,
    // height: 300,
    data: getten(sortBykey(data, 'yvalue')),
    xField: 'yvalue',
    yField: 'xvalue',
    meta: {
      yvalue: {
        alias: unit,
      },
    },
    minBarWidth: 20,
    maxBarWidth: 20,
  })

  barPlot.render()
}

export default maketablea
