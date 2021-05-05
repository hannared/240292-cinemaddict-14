import { getHistoryFilms } from './film-filters.js';
import { getWatchlistFilms } from './film-filters.js';
import { getFavoriteFilms } from './film-filters.js';
import Smart from './smart.js';

const createSiteMenuTemplate = (films) => {
  const historyFilms = getHistoryFilms(films);
  const watchlistFilms = getWatchlistFilms(films);
  const favoriteFilms = getFavoriteFilms(films);

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistFilms.length}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyFilms.length}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteFilms.length}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class SiteMenu extends Smart {
  constructor(films) {
    super();

    this._films = films;
  }

  updateData(films) {
    this._films = films;

    this.updateElement();
  }

  getTemplate() {
    return createSiteMenuTemplate(this._films);
  }
}
