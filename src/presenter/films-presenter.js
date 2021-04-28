import { renderElement, updateItem, replace } from '../utils';
import AllMoviesContainer from '../view/film-all-movies';
import FilmContainer from '../view/film-container';
import MostCommentedContainer from '../view/film-most-commented';
import TopRatedContainer from '../view/film-top-rated';
import NoFilm from '../view/no-film';
import ShowMoreBtn from '../view/show-more-btn';
import Sorting from '../view/sorting';
import SortingButton, {
  getSortByDateFilms,
  getSortByDefaultFilms,
  getSortByRatingFilms,
} from '../view/sorting-button';
import FilmPresenter from './film-presenter';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  constructor(homeContainer, changeFilms) {
    this._homeContainer = homeContainer;

    this._changeFilms = changeFilms;

    this._sortingComponent = new Sorting();
    this._filmContainerComponent = new FilmContainer();
    this._noFilmComponent = new NoFilm();
    this._showMoreButtonComponent = new ShowMoreBtn();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);

    this._filmPresenters = {};
  }

  _handleModeChange() {
    Object.values(this._filmPresenters).forEach((presenter) =>
      presenter.resetView(),
    );
  }

  init(homeFilms) {
    this._homeFilms = homeFilms.slice();
  }

  _handleFilmChange(updatedFilm) {
    this._homeFilms = updateItem(this._homeFilms, updatedFilm);

    this._changeFilms(this._homeFilms);

    const filmPresenter = this._filmPresenters[updatedFilm.id];

    const filmsListElement = this._allMoviesComponent
      .getElement()
      .querySelector('.films-list__container');

    const filmPresenterNew = new FilmPresenter(
      filmsListElement,
      this._handleFilmChange,
      this._handleModeChange,
    );
    filmPresenterNew.init(updatedFilm);
    filmPresenterNew.render();
    replace(filmPresenterNew.getComponent(), filmPresenter.getComponent());

    this._filmPresenters[updatedFilm.id] = filmPresenterNew;
  }

  _renderSort() {
    if (this._homeFilms.length !== 0) {
      renderElement(this._homeContainer, this._sortingComponent);

      const sortingByDefault = new SortingButton('Sort by default', true);
      const sortingByDate = new SortingButton('Sort by date', false);
      const sortingByRating = new SortingButton('Sort by rating', false);

      renderElement(this._sortingComponent, sortingByDefault);
      sortingByDefault.setSortingClickHandler(() => {
        sortingByDefault.reset();
        sortingByDate.reset();
        sortingByRating.reset();

        this._homeFilms = getSortByDefaultFilms(this._homeFilms);

        this._clearFilms();

        this._renderFilms();
      });

      renderElement(this._sortingComponent, sortingByDate);
      sortingByDate.setSortingClickHandler(() => {
        sortingByDefault.reset();
        sortingByDate.reset();
        sortingByRating.reset();

        this._homeFilms = getSortByDateFilms(this._homeFilms);

        this._clearFilms();

        this._renderFilms();
      });

      renderElement(this._sortingComponent, sortingByRating);
      sortingByRating.setSortingClickHandler(() => {
        sortingByDefault.reset();
        sortingByDate.reset();
        sortingByRating.reset();

        this._homeFilms = getSortByRatingFilms(this._homeFilms);

        this._clearFilms();

        this._renderFilms();
      });
    }
  }

  _clearFilms() {
    this._filmContainerComponent.removeElement();

    this._filmContainerComponent = new FilmContainer();
  }

  _renderFilms() {
    this._topRatedComponent = new TopRatedContainer(this._homeFilms);
    this._mostCommentedComponent = new MostCommentedContainer(this._homeFilms);
    this._allMoviesComponent = new AllMoviesContainer();

    renderElement(this._homeContainer, this._filmContainerComponent);

    if (this._homeFilms.length !== 0) {
      const filmsListElement = this._allMoviesComponent
        .getElement()
        .querySelector('.films-list__container');

      renderElement(this._filmContainerComponent, this._allMoviesComponent);

      const sliced = this._homeFilms.slice(0, FILM_COUNT_PER_STEP);
      for (let i = 0; i < sliced.length; i++) {
        const film = sliced[i];

        const filmPresenter = new FilmPresenter(
          filmsListElement,
          this._handleFilmChange,
          this._handleModeChange,
        );
        filmPresenter.init(film);
        filmPresenter.render();

        this._filmPresenters[film.id] = filmPresenter;
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

        const filmPresenter = new FilmPresenter(
          filmsListElement,
          this._handleFilmChange,
          this._handleModeChange,
        );
        filmPresenter.init(film);
        filmPresenter.render();

        this._filmPresenters[film.id] = filmPresenter;
      }

      renderedFilmCount += FILM_COUNT_PER_STEP;
      if (renderedFilmCount >= films.length) {
        this._showMoreButtonComponent.removeElement();
      }
    });
  }

  _renderFilmsList() {
    this._renderSort();

    this._renderFilms();
  }

  render() {
    this._renderFilmsList();
  }
}
