import { renderElement } from '../utils';
import Stats from '../view/stats';
import { Chart, ChartDataLabels } from 'chart.js';

export default class Statistics {
  constructor(homeContainer, movies) {
    this._homeContainer = homeContainer;
    this._movies = movies;
  }

  init() {
    this._homeFilms = this._movies.getMovies();
  }

  _renderStatsInfo() {
    const films = this._homeFilms;

    this._stats = new Stats(films);

    renderElement(this._homeContainer, this._stats);
  }

  hide() {
    this._stats.hideElement();
  }

  show() {
    this._stats.showElement();
  }

  _renderStats() {
    this._renderStatsInfo();
  }

  render() {
    this._renderStats();

    this.hide();

    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector('.statistic__chart');

    // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
    statisticCtx.height = BAR_HEIGHT * 5;

    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: 'horizontalBar',
      data: {
        labels: ['Sci-Fi', 'Animation', 'Fantasy', 'Comedy', 'TV Series'],
        datasets: [
          {
            data: [11, 8, 7, 4, 3],
            backgroundColor: '#ffe800',
            hoverBackgroundColor: '#ffe800',
            anchor: 'start',
          },
        ],
      },
      options: {
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
      },
    });
  }
}
