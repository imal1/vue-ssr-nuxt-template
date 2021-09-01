import { Gauge } from '@antv/g2plot';

export function maketablea(box, data, unit) {
  const gauge = new Gauge(box, {
    height: 240,
    percent: data,
    range: {
      color: '#81d3f8',
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    axis: {
      label: {
        formatter(v) {
          return Number(v) * 100;
        },
      },
      subTickLine: {
        count: 3,
      },
    },
    statistic: {
      content: {
        formatter: ({ percent }) => unit + `: ${(percent * 100).toFixed(0)}%`,
        style: {
          color: 'rgba(0,0,0,0.65)',
          fontSize: 12,
        },
      },
    },
  });
  gauge.render();
}

export default maketablea
