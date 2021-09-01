import { Pie } from '@antv/g2plot';

// const data = [
//   { name: '分类一', val: 27 },
//   { name: '分类二', val: 25 },
//   { name: '分类三', val: 18 },
//   { name: '分类四', val: 15 },
//   { name: '分类五', val: 10 },
//   { name: '其他', val: 5 },
// ];

export function maketable(box, data, o) {
  const piePlot = new Pie(box, {
    appendPadding: 10,
    data,
    angleField: 'val',
    height: 240,
    colorField: 'name',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: o,
      },
    },
  });

  piePlot.render();
}

export default maketable
