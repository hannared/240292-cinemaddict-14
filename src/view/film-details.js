import dayjs from 'dayjs';
import _ from 'lodash';
import { createFilmCommentsTemplate } from './film-comments';
import { RELEASE_DATE_FORMAT } from './film-consts';
import Smart from './smart';

const createFilmDetailsTemplate = (film = {}) => {
  const {
    title,
    rating,
    director,
    writers,
    actors,
    duration,
    genre,
    poster,
    description,
    comments,
    ageRating,
    alternativeTitle,
    release,
    commentsList,
    isFavorite,
    isWatchList,
    isAlreadyWatched,
  } = film;

  const releaseDate = dayjs(release.date).format(RELEASE_DATE_FORMAT);

  const commentsTemplate = createFilmCommentsTemplate(commentsList, comments);

  const genresTemplate = genre
    .map((element) => `<span class="film-details__genre">${element}</span>`)
    .join('');

  const isWatchListAttribute = isWatchList ? 'checked' : '';
  const isAlreadyWatchedAttribute = isAlreadyWatched ? 'checked' : '';
  const isFavoriteAttribute = isFavorite ? 'checked' : '';

  return `
  <section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tbody><tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
              ${genresTemplate}
            </tr>
          </tbody></table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" ${isWatchListAttribute} class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" ${isAlreadyWatchedAttribute} class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" ${isFavoriteAttribute} class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        ${commentsTemplate}

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>
`;
};

export default class FilmDetails extends Smart {
  constructor(film) {
    super();

    this._film = film;
    this._clickCloseBtnHandler = this._clickCloseBtnHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(
      this,
    );
    this._addClickHandler = this._addClickHandler.bind(this);

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this.emojiClicks();
  }

  emojiClicks() {
    this.getElement()
      .querySelector('label[for="emoji-smile"]')
      .addEventListener('click', this._emojiClickHandler);

    this.getElement()
      .querySelector('label[for="emoji-sleeping"]')
      .addEventListener('click', this._emojiClickHandler);

    this.getElement()
      .querySelector('label[for="emoji-puke"]')
      .addEventListener('click', this._emojiClickHandler);

    this.getElement()
      .querySelector('label[for="emoji-angry"]')
      .addEventListener('click', this._emojiClickHandler);
  }

  _emojiClickHandler(evt) {
    this._addEmojiIcon(evt);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  _clickCloseBtnHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();
  }

  _watchListClickHandler() {
    this._callback.watchListClick();
  }

  _alreadyWatchedClickHandler() {
    this._callback.alreadyWatchedClick();
  }

  _addEmojiIcon(evt) {
    const el = evt.target;
    const cln = el.cloneNode(true);
    this.getElement().querySelector(
      '.film-details__add-emoji-label',
    ).innerHTML = '';

    this.getElement()
      .querySelector('.film-details__add-emoji-label')
      .appendChild(cln);
    cln.setAttribute('width', '55');
    cln.setAttribute('height', '55');
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();

    const id = parseInt(evt.target.getAttribute('data-id'));
    _.remove(this._film.comments, (cid) => cid === id);
    _.remove(this._film.commentsList, (comment) => comment.id === id);

    this.updateData(this._film);

    this._callback.deleteClick();
  }

  _addClickHandler(evt) {
    if (evt.key == 'Enter') {
      evt.preventDefault();

      const emotion = this.getElement().querySelector(
        '.film-details__emoji-item:checked',
      ).value;

      const id = Math.floor(Math.random() * 1000);
      const date = new Date();

      const comment = {
        id: id,
        author: 'John Doe',
        message: evt.target.value,
        date: dayjs(date).fromNow(),
        emotion: emotion + '.png',
      };

      this._film.commentsList.push(comment);
      this._film.comments.push(id);

      this.updateData(this._film);

      this._callback.addClick();
    }
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._clickCloseBtnHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector('.film-details__control-label--favorite')
      .addEventListener('click', this._favoriteClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement()
      .querySelector('.film-details__control-label--watchlist')
      .addEventListener('click', this._watchListClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement()
      .querySelector('.film-details__control-label--watched')
      .addEventListener('click', this._alreadyWatchedClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;

    const buttons = this.getElement().querySelectorAll(
      '.film-details__comment-delete',
    );

    buttons.forEach((button) => {
      button.addEventListener('click', this._deleteClickHandler);
    });
  }

  setAddClickHandler(callback) {
    this._callback.addClick = callback;

    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('keydown', this._addClickHandler);
  }

  restoreHandlers() {
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setWatchListClickHandler(this._callback.alreadyWatchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setAddClickHandler(this._callback.addClick);
    this.setClickHandler(this._callback.click);

    this.emojiClicks();
  }

  updateData(film) {
    this._film = film;

    this.updateElement();

    this.restoreHandlers();
  }
}
