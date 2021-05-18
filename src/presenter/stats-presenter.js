import StatsFilters, {
  getAllTimeStats,
  getMonthStats,
  getTodayStats,
  getWatchedDurationAll,
  getWatchedStatsAll,
  getWatchedStatsMonth,
  getWatchedStatsToday,
  getWatchedStatsWeek,
  getWatchedStatsYear,
  getWeekStats,
  getYearStats,
  getWatchedDurationToday,
  getWatchedDurationWeek,
  getWatchedDurationMonth,
  getWatchedDurationYear,
  getTopGenreAll,
} from '../model/stats-filters';
import { renderElement } from '../utils';
import { ChartView } from '../view/chart-view';
import Stats from '../view/stats';
import StatsFilterButton, { StatsFilterLabel } from '../view/stats-filter-btn';
import StatsWatchedText, {
  StatsDurationText,
  StatsTopGenreText,
} from '../view/stats-text';

export default class Statistics {
  constructor(homeContainer, movies, statsFilters) {
    this._homeContainer = homeContainer;
    this._movies = movies;
    this._statsFilters = statsFilters;

    this._statsWatchedCounterFilters = new StatsFilters();
    this._statsWatchedDurationFilters = new StatsFilters();
    this._statsTopGenreFilters = new StatsFilters();

    this._handleStatsFilterChange = this._handleStatsFilterChange.bind(this);
    this._handleWatchedStatsFilterChange = this._handleWatchedStatsFilterChange.bind(
      this,
    );
    this._handleWatchedDurationStatsFilterChange = this._handleWatchedDurationStatsFilterChange.bind(
      this,
    );
    this._handleTopGenreStatsFilterChange = this._handleTopGenreStatsFilterChange.bind(
      this,
    );

    this._statsFilters.addObserver(this._handleStatsFilterChange);
    this._statsWatchedCounterFilters.addObserver(
      this._handleWatchedStatsFilterChange,
    );

    this._statsWatchedDurationFilters.addObserver(
      this._handleWatchedDurationStatsFilterChange,
    );

    this._statsTopGenreFilters.addObserver(
      this._handleTopGenreStatsFilterChange,
    );
  }

  _handleStatsFilterChange() {
    const films = this._movies.getMovies();

    const filter = this._statsFilters.getStatsFilter();

    const stats = filter(films);

    this._chart.updateData(stats);
    this._chart.draw();
  }

  _handleWatchedStatsFilterChange() {
    const films = this._movies.getMovies();

    const filter = this._statsWatchedCounterFilters.getStatsFilter();

    const stats = filter(films);

    this._statsWatched.updateData({ number: stats });
  }

  _handleWatchedDurationStatsFilterChange() {
    const films = this._movies.getMovies();

    const filter = this._statsWatchedDurationFilters.getStatsFilter();

    const stats = filter(films);

    this._statsDuration.updateData(stats);
  }

  _handleTopGenreStatsFilterChange() {
    const films = this._movies.getMovies();

    const filter = this._statsTopGenreFilters.getStatsFilter();

    const stats = filter(this._statsFilters, films);

    this._statsTopGenre.updateData(stats);
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

      this._statsFilters.setStatsFilter(getAllTimeStats);
      this._statsWatchedCounterFilters.setStatsFilter(getWatchedStatsAll);
      this._statsWatchedDurationFilters.setStatsFilter(getWatchedDurationAll);
      this._statsTopGenreFilters.setStatsFilter(getTopGenreAll);
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

      this._statsFilters.setStatsFilter(getTodayStats);
      this._statsWatchedCounterFilters.setStatsFilter(getWatchedStatsToday);
      this._statsWatchedDurationFilters.setStatsFilter(getWatchedDurationToday);
      this._statsTopGenreFilters.setStatsFilter(getTopGenreAll);
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

      this._statsFilters.setStatsFilter(getWeekStats);
      this._statsWatchedCounterFilters.setStatsFilter(getWatchedStatsWeek);
      this._statsWatchedDurationFilters.setStatsFilter(getWatchedDurationWeek);
      this._statsTopGenreFilters.setStatsFilter(getTopGenreAll);
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

      this._statsFilters.setStatsFilter(getMonthStats);
      this._statsWatchedCounterFilters.setStatsFilter(getWatchedStatsMonth);
      this._statsWatchedDurationFilters.setStatsFilter(getWatchedDurationMonth);
      this._statsTopGenreFilters.setStatsFilter(getTopGenreAll);
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

      this._statsFilters.setStatsFilter(getYearStats);
      this._statsWatchedCounterFilters.setStatsFilter(getWatchedStatsYear);
      this._statsWatchedDurationFilters.setStatsFilter(getWatchedDurationYear);
      this._statsTopGenreFilters.setStatsFilter(getTopGenreAll);
    });

    const watchedCounter = getWatchedStatsAll(this._movies.getMovies());
    const statsWatched = new StatsWatchedText({ number: watchedCounter });
    this._statsWatched = statsWatched;
    renderElement(
      this._stats.getElement().querySelector('.statistic__text-list'),
      statsWatched,
    );

    const watchedDuration = getWatchedDurationAll(this._movies.getMovies());
    const statsDuration = new StatsDurationText(watchedDuration);
    this._statsDuration = statsDuration;
    renderElement(
      this._stats.getElement().querySelector('.statistic__text-list'),
      statsDuration,
    );

    const statsTopGenre = new StatsTopGenreText(
      getTopGenreAll(this._statsFilters, this._movies.getMovies()),
    );
    this._statsTopGenre = statsTopGenre;
    renderElement(
      this._stats.getElement().querySelector('.statistic__text-list'),
      statsTopGenre,
    );
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
