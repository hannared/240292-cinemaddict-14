import { renderElement } from '../utils';
import FilterButton, { getHistoryFilms } from '../view/film-filters';
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

    this._siteMenuComponent.updateData(films);
  }

  _renderFilterButtons() {
    const filterByDefault = new FilterButton(
      'All movies',
      '#allmovies',
      this._movies,
      true,
      false,
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

      getHistoryFilms(this._movies);
    });

    const filterWatchList = new FilterButton(
      'Watch List',
      '#watchlist',
      this._movies,
      false,
      true,
    );
    renderElement(
      this._siteMenuComponent
        .getElement()
        .querySelector('.main-navigation__items'),
      filterWatchList,
    );

    const filterHistory = new FilterButton(
      'History',
      '#history',
      this._movies,
      false,
      true,
    );
    renderElement(
      this._siteMenuComponent
        .getElement()
        .querySelector('.main-navigation__items'),
      filterHistory,
    );

    const filterFavorites = new FilterButton(
      'Favorites',
      '#favorites',
      this._movies,
      false,
      true,
    );
    renderElement(
      this._siteMenuComponent
        .getElement()
        .querySelector('.main-navigation__items'),
      filterFavorites,
    );
  }

  _renderSiteMenu() {
    this._siteMenuComponent = new SiteMenu(this._movies.getMovies());

    renderElement(this._homeContainer, this._siteMenuComponent);
  }
}
