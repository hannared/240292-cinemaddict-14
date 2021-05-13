import { renderElement } from '../utils';
import { ChartView } from '../view/chart-view';
import Stats from '../view/stats';

export default class Statistics {
  constructor(homeContainer, movies, statsFilters) {
    this._homeContainer = homeContainer;
    this._movies = movies;
    this._statsFilters = statsFilters;
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

    const filter = this._statsFilters.getStatsFilter();
    const data = filter(this._movies.getMovies());

    this._chart = new ChartView(data);

    renderElement(
      this._stats.getElement().querySelector('.statistic__chart-wrap'),
      this._chart,
    );

    this._chart.draw();

    // onClick
    /*

    const filter = this._statsFilters.getStatsFilter();
    const data = filter(this._movies.getMovies());
    this._chart.updateData(data);

    */
  }
}
