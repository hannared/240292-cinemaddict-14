import { renderElement, updateItem, replace } from '../utils';
import AllMoviesContainer from '../view/film-all-movies';
import FilmContainer from '../view/film-container';
import MostCommentedContainer from '../view/film-most-commented';
import TopRatedContainer from '../view/film-top-rated';
import NoFilm from '../view/no-film';
import ShowMoreBtn from '../view/show-more-btn';
import SiteMenu from '../view/site-menu';
import Sorting from '../view/sorting';
import FilmPresenter from './film-presenter';

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

    this._filmPresenters = {};
  }

  init(homeFilms) {
    this._homeFilms = homeFilms.slice();
  }

  _handleFilmChange(updatedFilm) {
    console.log('UPDATED FILM: ', updatedFilm);

    this._homeFilms = updateItem(this._homeFilms, updatedFilm);
    console.log('UPDATED FILMS: ', this._homeFilms);

    const oldSiteMenu = this._siteMenuComponent;
    this._siteMenuComponent = new SiteMenu(this._homeFilms);
    replace(this._siteMenuComponent, oldSiteMenu);

    const filmPresenter = this._filmPresenters[updatedFilm.id];

    const filmsListElement = this._allMoviesComponent
      .getElement()
      .querySelector('.films-list__container');

    const filmPresenterNew = new FilmPresenter(
      filmsListElement,
      this._handleFilmChange,
    );
    filmPresenterNew.init(updatedFilm);
    filmPresenterNew.render();
    replace(filmPresenterNew.getComponent(), filmPresenter.getComponent());

    this._filmPresenters[updatedFilm.id] = filmPresenterNew;
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

  _renderFilms() {
    const filmsListElement = this._allMoviesComponent
      .getElement()
      .querySelector('.films-list__container');

    this._topRatedComponent = new TopRatedContainer(this._homeFilms);
    this._mostCommentedComponent = new MostCommentedContainer(this._homeFilms);

    renderElement(this._homeContainer, this._filmContainerComponent);

    if (this._homeFilms.length !== 0) {
      renderElement(this._filmContainerComponent, this._allMoviesComponent);

      const sliced = this._homeFilms.slice(0, FILM_COUNT_PER_STEP);
      for (let i = 0; i < sliced.length; i++) {
        const film = sliced[i];

        const filmPresenter = new FilmPresenter(
          filmsListElement,
          this._handleFilmChange,
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

  _renderHome() {
    this._renderSiteMenu();
    this._renderSort();
    this._renderFilms();
  }

  render() {
    this._renderHome();
  }
}
