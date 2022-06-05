import type { HTMLDOMElement, Options } from 'highcharts';
import Highcharts from 'highcharts';

export default (node: HTMLDOMElement, config: Options) => {
	const redraw = true;
	const oneToOne = true;
	const chart = Highcharts.chart(node, config);

	return {
		update(config: Options) {
			chart.update(config, redraw, oneToOne);
		},
		destroy() {
			chart.destroy();
		}
	};
};
