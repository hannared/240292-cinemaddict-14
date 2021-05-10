import { renderElement } from '../utils';
import FilterButton from '../view/film-filters';

import { getAllFilms } from '../view/film-filters';

import { getFavoriteFilms } from '../view/film-filters';

import { getHistoryFilms, getWatchlistFilms } from '../view/film-filters';

import SiteMenu from '../view/site-menu';

export default class Filters {
  constructor(homeContainer, filters, movies) {
    this._homeContainer = homeContainer;
    this._filters = filters;
    this._movies = movies;
  }

  init() {}

  render() {
    this._renderSiteMenu();
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

      this._filters.setFilter(getAllFilms);
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

      this._filters.setFilter(getWatchlistFilms);
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

      this._filters.setFilter(getHistoryFilms);
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

      this._filters.setFilter(getFavoriteFilms);
    });

    this._filterByDefault = filterByDefault;
    this._filterWatchList = filterWatchList;
    this._filterHistory = filterHistory;
    this._filterFavorite = filterFavorites;
  }

  _renderSiteMenu() {
    this._siteMenuComponent = new SiteMenu(this._movies.getMovies());

    renderElement(this._homeContainer, this._siteMenuComponent);
  }
}
