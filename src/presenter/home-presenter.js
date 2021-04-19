import { renderElement } from '../utils';
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
  }

  init(homeFilms) {
    this._homeFilms = homeFilms.slice();
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

  _renderFilm(filmListElement, film) {
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

    filmCardComponent.setClickHandler(showFilmModal);

    filmDetailsComponent.setClickHandler(hideFilmModal);

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
        this._renderFilm(filmsListElement, film);
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
        this._renderFilm(filmsListElement, film);
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
