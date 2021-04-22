import { renderElement, updateItem } from '../utils';
import AllMoviesContainer from '../view/film-all-movies';
import FilmCard from '../view/film-card';
import FilmContainer from '../view/film-container';
import FilmDetails from '../view/film-details';
import MostCommentedContainer from '../view/film-most-commented';
import TopRatedContainer from '../view/film-top-rated';
import NoFilm from '../view/no-film';
import ShowMoreBtn from '../view/show-more-btn';
import SiteMenu from '../view/site-menu';
import Sorting from '../view/sorting';

const FILM_COUNT = 26;
const FILM_COUNT_PER_STEP = 5;

export default class Home {
  constructor(homeContainer) {
    this._homeContainer = homeContainer;
    this._sortingComponent = new Sorting();
    this._filmContainerComponent = new FilmContainer();
    this._allMoviesComponent = new AllMoviesContainer();
    this._noFilmComponent = new NoFilm();
    this._showMoreButtonComponent = new ShowMoreBtn();

    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(homeFilms) {
    this._homeFilms = homeFilms.slice();
  }

  _handleFilmChange(updatedFilm) {
    console.log('UPDATED FILM: ', updatedFilm);

    this._homeFilms = updateItem(this._homeFilms, updatedFilm);
    console.log('UPDATED FILMS: ', this._homeFilms);

    // this._taskPresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderSiteMenu() {
    this._siteMenuComponent = new SiteMenu(this._homeFilms);

    renderElement(this._homeContainer, this._siteMenuComponent);
  }
  _renderSort() {
    if (this._homeFilms.length !== 0) {
      renderElement(this._homeContainer, this._sortingComponent);
    }
  }

  _renderFilm(filmListElement, film, changeData) {
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

      changeData(
        Object.assign({}, film, {
          isFavorite: !film.isFavorite,
        }),
      );
    };

    const onWatchListCLick = () => {
      console.log('TO WATCH TEST');

      changeData(
        Object.assign({}, film, {
          isWatchList: !film.isWatchList,
        }),
      );
    };

    const onAlreadyWatchedCLick = () => {
      console.log('WATCHED TEST');

      changeData(
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

    renderElement(filmListElement, filmCardComponent.getElement());
  }

  _renderFilms() {
    this._topRatedComponent = new TopRatedContainer(this._homeFilms);
    this._mostCommentedComponent = new MostCommentedContainer(this._homeFilms);

    renderElement(this._homeContainer, this._filmContainerComponent);

    if (this._homeFilms.length !== 0) {
      renderElement(this._filmContainerComponent, this._allMoviesComponent);

      const sliced = this._homeFilms.slice(0, FILM_COUNT_PER_STEP);
      for (let i = 0; i < sliced.length; i++) {
        const film = sliced[i];
        const filmsListElement = this._allMoviesComponent
          .getElement()
          .querySelector('.films-list__container');
        this._renderFilm(filmsListElement, film, this._handleFilmChange);
      }

      if (this._homeFilms.length > FILM_COUNT_PER_STEP) {
        this._renderShowMoreButton();
      }

      renderElement(this._filmContainerComponent, this._topRatedComponent);
      renderElement(this._filmContainerComponent, this._mostCommentedComponent);
    }
  }

  _renderNoFilms() {
    if (this._homeFilms.length === 0) {
      renderElement(this._filmContainerComponent, this._noFilmComponent);
    }
  }

  _renderShowMoreButton() {
    renderElement(this._filmContainerComponent, this._showMoreButtonComponent);

    const films = this._homeFilms;
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    this._showMoreButtonComponent.setClickHandler(() => {
      const sliced = films.slice(
        renderedFilmCount,
        renderedFilmCount + FILM_COUNT_PER_STEP,
      );
      for (let i = 0; i < sliced.length; i++) {
        const film = sliced[i];
        const filmsListElement = this._allMoviesComponent
          .getElement()
          .querySelector('.films-list__container');
        this._renderFilm(filmsListElement, film, this._handleFilmChange);
      }

      renderedFilmCount += FILM_COUNT_PER_STEP;
      if (renderedFilmCount >= films.length) {
        this._showMoreButtonComponent.removeElement();
      }
    });
  }

  _renderHome() {
    this._renderSiteMenu();
    this._renderSort();
    this._renderFilms();
  }

  render() {
    this._renderHome();
  }
}
