import * as echarts from 'echarts';
import ChartNode from '../../reader/node/ChartNode';

export function renderChart(chartNode: ChartNode): HTMLDivElement {
  const wrapper = document.createElement('div');
  const extend = chartNode.extend;
  const offset = chartNode.offset;

  wrapper.style.position = 'absolute';
  wrapper.style.left = offset.x + 'px';
  wrapper.style.top = offset.y + 'px';
  wrapper.style.width = extend.w + 'px';
  wrapper.style.height = extend.h + 'px';

  if (chartNode.options && chartNode.options.series && chartNode.options.series.length > 0) {
    try {
      const chart = echarts.init(wrapper);
      chart.setOption(chartNode.options);
    } catch (e) {
      // silently ignore chart render errors
    }
  }

  return wrapper;
}
