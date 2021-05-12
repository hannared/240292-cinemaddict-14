import { renderElement } from '../utils';
import FilterButton from '../view/film-filters';

import { getAllFilms } from '../view/film-filters';

import { getFavoriteFilms } from '../view/film-filters';

import { getHistoryFilms, getWatchlistFilms } from '../view/film-filters';
import StatsButton from '../view/stats-btn';

export default class Filters {
  constructor(
    siteMenuComponent,
    filters,
    movies,
    _statsPresenter,
    _filmsPresenter,
  ) {
    this._siteMenuComponent = siteMenuComponent;
    this._filters = filters;
    this._movies = movies;
    this._statsPresenter = _statsPresenter;
    this._filmsPresenter = _filmsPresenter;
  }

  init() {}

  render() {
    this._renderFilterButtons();
  }

  update() {
    const films = this._movies.getMovies();

    this._filterByDefault.updateData(films);
    this._filterHistory.updateData(films);
    this._filterWatchList.updateData(films);
    this._filterFavorite.updateData(films);
  }

  _renderFilterButtons() {
    const filterByDefault = new FilterButton(
      'All movies',
      '#allmovies',
      this._movies,
      true,
      false,
      getAllFilms,
    );
    const filterWatchList = new FilterButton(
      'Watchlist',
      '#watchlist',
      this._movies,
      false,
      true,
      getWatchlistFilms,
    );
    const filterHistory = new FilterButton(
      'History',
      '#history',
      this._movies,
      false,
      true,
      getHistoryFilms,
    );
    const filterFavorites = new FilterButton(
      'Favorites',
      '#favorites',
      this._movies,
      false,
      true,
      getFavoriteFilms,
    );

    const statsBtn = new StatsButton(false);

    renderElement(
      this._siteMenuComponent
        .getElement()
        .querySelector('.main-navigation__items'),
      filterByDefault,
    );
    filterByDefault.setFilterClickHandler(() => {
      filterByDefault.reset();
      filterWatchList.reset();
      filterHistory.reset();
      filterFavorites.reset();
      statsBtn.reset();

      this._filters.setFilter(getAllFilms);

      this._statsPresenter.hide();
      this._filmsPresenter.show();
    });

    renderElement(
      this._siteMenuComponent
        .getElement()
        .querySelector('.main-navigation__items'),
      filterWatchList,
    );

    filterWatchList.setFilterClickHandler(() => {
      filterByDefault.reset();
      filterWatchList.reset();
      filterHistory.reset();
      filterFavorites.reset();
      statsBtn.reset();

      this._filters.setFilter(getWatchlistFilms);

      this._statsPresenter.hide();
      this._filmsPresenter.show();
    });

    renderElement(
      this._siteMenuComponent
        .getElement()
        .querySelector('.main-navigation__items'),
      filterHistory,
    );

    filterHistory.setFilterClickHandler(() => {
      filterByDefault.reset();
      filterWatchList.reset();
      filterHistory.reset();
      filterFavorites.reset();
      statsBtn.reset();

      this._filters.setFilter(getHistoryFilms);

      this._statsPresenter.hide();
      this._filmsPresenter.show();
    });

    renderElement(
      this._siteMenuComponent
        .getElement()
        .querySelector('.main-navigation__items'),
      filterFavorites,
    );

    filterFavorites.setFilterClickHandler(() => {
      filterByDefault.reset();
      filterWatchList.reset();
      filterHistory.reset();
      filterFavorites.reset();
      statsBtn.reset();

      this._filters.setFilter(getFavoriteFilms);

      this._statsPresenter.hide();
      this._filmsPresenter.show();
    });

    renderElement(this._siteMenuComponent, statsBtn);

    statsBtn.setStatsClickHandler(() => {
      filterByDefault.reset();
      filterWatchList.reset();
      filterHistory.reset();
      filterFavorites.reset();
      statsBtn.reset();

      this._statsPresenter.show();
      this._filmsPresenter.hide();
    });

    this._filterByDefault = filterByDefault;
    this._filterWatchList = filterWatchList;
    this._filterHistory = filterHistory;
    this._filterFavorite = filterFavorites;
    this._statsBtn = statsBtn;
  }
}
