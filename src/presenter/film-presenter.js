import _ from 'lodash';
import Movies from '../model/movies';
import { renderElement } from '../utils';
import { UpdateType } from '../utils/observer';
import FilmCard from '../view/film-card';
import FilmDetails from '../view/film-details';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};
export default class FilmPresenter {
  constructor(filmContainer, changeData, changeMode, movies, api) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._movies = movies;
    this._api = api;

    this._mode = Mode.DEFAULT;

    this.onEscKeyDown = this.onEscKeyDown.bind(this);
    this.showFilmModal = this.showFilmModal.bind(this);
    this.hideFilmModal = this.hideFilmModal.bind(this);
  }

  onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.hideFilmModal();
      document.removeEventListener('keydown', this.onEscKeyDown);
    }
  }

  showFilmModal() {
    this._changeMode();

    this._mode = Mode.POPUP;

    document.addEventListener('keydown', this.onEscKeyDown);

    document.body.appendChild(this._filmDetailsComponent.getElement());

    document.body.classList.add('hide-overflow');

    this._filmDetailsComponent.updateData(this._film);
  }

  hideFilmModal() {
    if (this._mode === Mode.POPUP) {
      document.body.removeChild(this._filmDetailsComponent.getElement());

      document.body.classList.remove('hide-overflow');

      this._mode = Mode.DEFAULT;
    }
  }

  init(film) {
    this._film = film;

    const filmCardComponent = new FilmCard(film);
    const filmDetailsComponent = new FilmDetails(film);

    const onFavouriteCLick = () => {
      this._changeData(
        Object.assign({}, film, {
          isFavorite: !film.isFavorite,
        }),
      );
    };

    const onWatchListCLick = () => {
      this._changeData(
        Object.assign({}, film, {
          isWatchList: !film.isWatchList,
        }),
      );
    };

    const onAlreadyWatchedCLick = () => {
      this._changeData(
        Object.assign({}, film, {
          isAlreadyWatched: !film.isAlreadyWatched,
        }),
      );
    };

    filmCardComponent.setClickHandler(this.showFilmModal);
    filmCardComponent.setFavoriteClickHandler(onFavouriteCLick);
    filmCardComponent.setWatchListClickHandler(onWatchListCLick);
    filmCardComponent.setAlreadyWatchedClickHandler(onAlreadyWatchedCLick);

    filmDetailsComponent.setClickHandler(this.hideFilmModal);
    filmDetailsComponent.setFavoriteClickHandler(onFavouriteCLick);
    filmDetailsComponent.setWatchListClickHandler(onWatchListCLick);
    filmDetailsComponent.setAlreadyWatchedClickHandler(onAlreadyWatchedCLick);

    filmDetailsComponent.setDeleteClickHandler((comment) => {
      this._filmDetailsComponent.beginCommentDelete(comment);
      // render details
      this._filmDetailsComponent.updateData(this._film);

      this._api
        .deleteComment(comment)
        .then(() => {
          _.remove(this._film.comments, (cid) => cid === comment.id);
          _.remove(this._film.commentsList, (c) => c.id === comment.id);

          this._movies._updateMovie(UpdateType.MINOR, this._film);
          this._filmDetailsComponent.endCommentDelete();

          this._filmDetailsComponent.updateData(this._film);
        })
        .catch(() => {
          this._filmDetailsComponent.onCommentDeleteError(comment);
          this._filmDetailsComponent.endCommentDelete();

          this._filmDetailsComponent.updateData(this._film);
        });
    });
    filmDetailsComponent.setAddClickHandler((comment) => {
      this._filmDetailsComponent.beginCommentAdd();
      this._filmDetailsComponent.updateData(film);

      this._api
        .addComment(this._film, comment)
        .then((data) => {
          const { comments, movie } = data;

          const film = Movies.adaptToClient(movie);
          film.commentsList = comments;

          this._movies._updateMovie(UpdateType.MINOR, film);
          this._filmDetailsComponent.endCommentAdd();

          this._filmDetailsComponent.updateData(film);
        })
        .catch(() => {
          this._filmDetailsComponent.onCommentFormError();
          this._filmDetailsComponent.endCommentAdd();

          this._filmDetailsComponent.updateData(film);
        });
    });

    this._filmCardComponent = filmCardComponent;
    this._filmDetailsComponent = filmDetailsComponent;
  }

  resetView() {
    this.hideFilmModal();
  }

  _renderFilm() {
    renderElement(this._filmContainer, this._filmCardComponent);
  }

  render() {
    this._renderFilm();
  }

  getComponent() {
    return this._filmCardComponent;
  }
}
