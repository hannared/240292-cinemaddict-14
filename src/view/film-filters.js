import Smart from './smart';

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
) => {
  if (isRequiredNumber) {
    title = `${title} (${movies.getMovies().length})`;
  }

  const activeClassName = selected ? 'main-navigation__item--active' : '';
  return `<a href="${path}" class="main-navigation__item ${activeClassName}">${title}</a>`;
};

export default class FilterButton extends Smart {
  // ("All Movies", "#allmovies", movies, true, false)
  // ("History", "#allmovies", movies, false, true)

  constructor(title, path, movies, selected, isRequiredNumber) {
    super();

    this._path = path;
    this._isRequiredNumber = isRequiredNumber;
    this._movies = movies;
    this._title = title;
    this._selected = selected;
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
    );
  }

  reset() {
    this.getElement().classList.remove('main-navigation__item--active');
  }

  _filterClickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
    this.getElement().classList.toggle('main-navigation__item--active');
  }

  setFilterClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener('click', this._filterClickHandler);
  }

  removeElement() {
    this._element.remove();

    super.removeElement();
  }
}
