import { renderElement } from '../utils';
import FilmCard from '../view/film-card';
import FilmDetails from '../view/film-details';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};
export default class FilmPresenter {
  constructor(filmContainer, changeData, changeMode) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

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
    filmDetailsComponent.setDeleteClickHandler(() => {});

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
