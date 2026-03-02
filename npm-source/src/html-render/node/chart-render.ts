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
      const chart = echarts.init(wrapper, null, {
        renderer: 'svg',
        width: extend.w,
        height: extend.h,
      });
      // Disable animation so static HTML captures contain fully rendered chart geometry.
      const options = {
        ...chartNode.options,
        animation: false,
        animationDuration: 0,
        animationDurationUpdate: 0,
        stateAnimation: { duration: 0 },
      };
      chart.setOption(options, {
        notMerge: true,
        lazyUpdate: false,
      });
    } catch (e) {
      // silently ignore chart render errors
    }
  }

  return wrapper;
}
