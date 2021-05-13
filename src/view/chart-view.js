import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import _ from 'lodash';
import Smart from '../view/smart';

Chart.plugins.register(ChartDataLabels);

const BAR_HEIGHT = 50;
const GENRES_COUNT = 9;
const OPTIONS = {
  plugins: {
    datalabels: {
      font: {
        size: 20,
      },
      color: '#ffffff',
      anchor: 'start',
      align: 'start',
      offset: 40,
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: '#ffffff',
          padding: 100,
          fontSize: 20,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 24,
      },
    ],
    xAxes: [
      {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
};

const createChartTemplate = () => {
  return '<canvas class="statistic__chart" width="1000"></canvas>';
};

export class ChartView extends Smart {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createChartTemplate();
  }

  draw() {
    this._statisticCtx = this.getElement();
    this._statisticCtx.height = BAR_HEIGHT * GENRES_COUNT;

    new Chart(this._statisticCtx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: _.keys(this._data),
        datasets: [
          {
            data: _.values(this._data),
            backgroundColor: '#ffe800',
            hoverBackgroundColor: '#ffe800',
            anchor: 'start',
          },
        ],
      },
      options: OPTIONS,
    });
  }
}
