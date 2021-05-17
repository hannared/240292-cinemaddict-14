import { renderElement } from '../utils';
import { ChartView } from '../view/chart-view';
import Stats from '../view/stats';
import StatsFilterButton, { StatsFilterLabel } from '../view/stats-filter-btn';

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

  _renderStatsFilters() {
    const filterAll = new StatsFilterButton('all-time', 'all-time', true);
    const filterAllLabel = new StatsFilterLabel('all-time', 'All time');

    const filterToday = new StatsFilterButton('today', 'today', false);
    const filterTodayLabel = new StatsFilterLabel('today', 'Today');

    const filterWeek = new StatsFilterButton('week', 'week', false);
    const filterWeekLabel = new StatsFilterLabel('week', 'Week');

    const filterMonth = new StatsFilterButton('month', 'month', false);
    const filterMonthLabel = new StatsFilterLabel('month', 'Month');

    const filterYear = new StatsFilterButton('year', 'year', false);
    const filterYearLabel = new StatsFilterLabel('year', 'Year');

    renderElement(
      this._stats.getElement().querySelector('.statistic__filters'),
      filterAll,
    );
    renderElement(
      this._stats.getElement().querySelector('.statistic__filters'),
      filterAllLabel,
    );

    filterAll.setStatsFilterClickHandler(() => {
      filterToday.reset();
      filterWeek.reset();
      filterMonth.reset();
      filterYear.reset();
    });

    renderElement(
      this._stats.getElement().querySelector('.statistic__filters'),
      filterToday,
    );

    renderElement(
      this._stats.getElement().querySelector('.statistic__filters'),
      filterTodayLabel,
    );

    filterToday.setStatsFilterClickHandler(() => {
      filterAll.reset();
      filterWeek.reset();
      filterMonth.reset();
      filterYear.reset();
    });

    renderElement(
      this._stats.getElement().querySelector('.statistic__filters'),
      filterWeek,
    );

    renderElement(
      this._stats.getElement().querySelector('.statistic__filters'),
      filterWeekLabel,
    );

    filterWeek.setStatsFilterClickHandler(() => {
      filterAll.reset();
      filterToday.reset();
      filterMonth.reset();
      filterYear.reset();
    });

    renderElement(
      this._stats.getElement().querySelector('.statistic__filters'),
      filterMonth,
    );

    renderElement(
      this._stats.getElement().querySelector('.statistic__filters'),
      filterMonthLabel,
    );

    filterMonth.setStatsFilterClickHandler(() => {
      filterAll.reset();
      filterToday.reset();
      filterWeek.reset();
      filterYear.reset();
    });

    renderElement(
      this._stats.getElement().querySelector('.statistic__filters'),
      filterYear,
    );

    renderElement(
      this._stats.getElement().querySelector('.statistic__filters'),
      filterYearLabel,
    );
    filterYear.setStatsFilterClickHandler(() => {
      filterAll.reset();
      filterToday.reset();
      filterWeek.reset();
      filterMonth.reset();
    });
  }

  _renderStats() {
    this._renderStatsInfo();
  }

  render() {
    this._renderStats();

    this._renderStatsFilters();

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
