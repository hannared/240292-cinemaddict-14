import Smart from './smart';

export const getAllFilms = (films) => films;

export const getHistoryFilms = (films) => {
  const historyFilms = films.filter((film) => film.isAlreadyWatched);

  return historyFilms;
};

export const getWatchlistFilms = (films) => {
  const watchlistFilms = films.filter((film) => film.isWatchList);

  return watchlistFilms;
};

export const getFavoriteFilms = (films) => {
  const favoriteFilms = films.filter((film) => film.isFavorite);

  return favoriteFilms;
};

const createFilterButtonTemplate = (
  title,
  path,
  movies,
  selected,
  isRequiredNumber,
  filter,
) => {
  if (isRequiredNumber) {
    const films = filter(movies.getMovies());

    title = `${title} <span class="main-navigation__item-count">${films.length}</span>`;
  }

  const activeClassName = selected ? 'main-navigation__item--active' : '';
  return `<a href="${path}" class="main-navigation__item ${activeClassName}">${title}</a>`;
};

export default class FilterButton extends Smart {
  constructor(title, path, movies, selected, isRequiredNumber, filter) {
    super();

    this._path = path;
    this._isRequiredNumber = isRequiredNumber;
    this._movies = movies;
    this._title = title;
    this._selected = selected;
    this._filter = filter;
    this._filterClickHandler = this._filterClickHandler.bind(this);

    if (selected) {
      const el = this.getElement();
      el.classList.add('main-navigation__item--active');
    }
  }

  getTemplate() {
    return createFilterButtonTemplate(
      this._title,
      this._path,
      this._movies,
      this._selected,
      this._isRequiredNumber,
      this._filter,
    );
  }

  reset() {
    this._selected = false;
    this.getElement().classList.remove('main-navigation__item--active');
  }

  restoreHandlers() {
    this.setFilterClickHandler(this._callback.click);
  }

  updateData() {
    this.updateElement();

    this.restoreHandlers();
  }

  _filterClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
    this.getElement().classList.toggle('main-navigation__item--active');
    this._selected = !this._selected;
  }

  setFilterClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener('click', this._filterClickHandler);
  }
}
