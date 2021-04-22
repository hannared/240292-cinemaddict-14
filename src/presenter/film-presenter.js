import { renderElement } from '../utils';
import FilmCard from '../view/film-card';
import FilmDetails from '../view/film-details';

export default class FilmPresenter {
  constructor(filmContainer, changeData) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
  }

  init(film) {
    this._film = film;

    const filmCardComponent = new FilmCard(film);
    const filmDetailsComponent = new FilmDetails(film);

    const showFilmModal = () => {
      document.addEventListener('keydown', onEscKeyDown);

      document.body.appendChild(filmDetailsComponent.getElement());

      document.body.classList.add('hide-overflow');
    };

    const hideFilmModal = () => {
      document.body.removeChild(filmDetailsComponent.getElement());

      document.body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        hideFilmModal();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onFavouriteCLick = () => {
      console.log('FAV TEST');

      this._changeData(
        Object.assign({}, film, {
          isFavorite: !film.isFavorite,
        }),
      );
    };

    const onWatchListCLick = () => {
      console.log('TO WATCH TEST');

      this._changeData(
        Object.assign({}, film, {
          isWatchList: !film.isWatchList,
        }),
      );
    };

    const onAlreadyWatchedCLick = () => {
      console.log('WATCHED TEST');

      this._changeData(
        Object.assign({}, film, {
          isAlreadyWatched: !film.isAlreadyWatched,
        }),
      );
    };

    filmCardComponent.setClickHandler(showFilmModal);
    filmCardComponent.setFavoriteClickHandler(onFavouriteCLick);
    filmCardComponent.setWatchListClickHandler(onWatchListCLick);
    filmCardComponent.setAlreadyWatchedClickHandler(onAlreadyWatchedCLick);

    filmDetailsComponent.setClickHandler(hideFilmModal);
    filmDetailsComponent.setFavoriteClickHandler(onFavouriteCLick);
    filmDetailsComponent.setWatchListClickHandler(onWatchListCLick);
    filmDetailsComponent.setAlreadyWatchedClickHandler(onAlreadyWatchedCLick);

    this._filmCardComponent = filmCardComponent;
  }

  _renderFilm() {
    renderElement(this._filmContainer, this._filmCardComponent);
  }

  render() {
    this._renderFilm();
  }
}
