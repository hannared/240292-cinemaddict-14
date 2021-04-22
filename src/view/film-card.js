import { sliceDescription } from '../utils';
import Abstract from './abstract';

const createFilmCardTemplate = (film = {}) => {
  const {
    title,
    rating,
    year,
    duration,
    genre,
    poster,
    description,
    comments,
    isFavorite,
  } = film;

  const text = sliceDescription(description);

  const isFavoriteClassName = isFavorite
    ? 'film-card__controls-item--active'
    : '';

  return `
  <article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre.slice(0, 1)}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${text}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteClassName}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._clickFilmCardHandler = this._clickFilmCardHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(
      this,
    );
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickFilmCardHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement()
      .querySelector('.film-card__poster')
      .addEventListener('click', this._clickFilmCardHandler);

    this.getElement()
      .querySelector('.film-card__title')
      .addEventListener('click', this._clickFilmCardHandler);

    this.getElement()
      .querySelector('.film-card__comments')
      .addEventListener('click', this._clickFilmCardHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._favoriteClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._watchListClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._alreadyWatchedClickHandler);
  }
}
