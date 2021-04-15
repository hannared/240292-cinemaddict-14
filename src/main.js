import SiteMenu from './view/site-menu.js';
import FilmContainer from './view/film-container.js';
import UserProfile from './view/user-profile.js';
import FilmDetails from './view/film-details.js';
import ShowMoreBtn from './view/show-more-btn.js';
import Sorting from './view/sorting.js';
import FooterStatistics from './view/footer-statistics.js';
import { generateFilms } from './mock/film.js';
import { renderElement } from './utils.js';
import AllMoviesContainer from './view/film-all-movies.js';
import TopRatedContainer from './view/film-top-rated.js';
import MostCommentedContainer from './view/film-most-commented.js';
import FilmCard from './view/film-card.js';
import NoFilm from './view/no-film.js';

const FILM_COUNT = 26;
const FILM_COUNT_PER_STEP = 5;

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const films = generateFilms(FILM_COUNT);

const filmComponent = new FilmContainer();
const showMoreButton = new ShowMoreBtn();
const allMoviesContainer = new AllMoviesContainer();
const sortingComponent = new Sorting();

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCard(film);
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

  filmComponent.setFilmCardClickHandler(showFilmModal);

  filmDetailsComponent.setCloseBtnClickHandler(hideFilmModal);

  renderElement(filmListElement, filmComponent.getElement());
};

renderElement(siteMainElement, new SiteMenu(films).getElement());

renderElement(siteMainElement, sortingComponent.getElement());

renderElement(siteHeaderElement, new UserProfile(films).getElement());

renderElement(siteMainElement, filmComponent.getElement());

// - render all movies
if (films.length === 0) {
  renderElement(filmComponent.getElement(), new NoFilm().getElement());

  sortingComponent.removeElement();
} else {
  renderElement(filmComponent.getElement(), allMoviesContainer.getElement());
}

if (films.length !== 0 && films.length > FILM_COUNT_PER_STEP) {
  renderElement(filmComponent.getElement(), showMoreButton.getElement());
}
if (films.length !== 0) {
  renderElement(
    filmComponent.getElement(),
    new TopRatedContainer(films).getElement(),
  );

  renderElement(
    filmComponent.getElement(),
    new MostCommentedContainer(films).getElement(),
  );
}
// renderElement(siteMainElement, new FilmDetails(films[0]).getElement());

renderElement(siteFooterElement, new FooterStatistics(films).getElement());

const sliced = films.slice(0, FILM_COUNT_PER_STEP);
for (let i = 0; i < sliced.length; i++) {
  const film = sliced[i];
  const filmsListElement = allMoviesContainer
    .getElement()
    .querySelector('.films-list__container');
  renderFilm(filmsListElement, film);
}

let renderedFilmCount = FILM_COUNT_PER_STEP;

showMoreButton.setShowMoreBtnClickHandler(() => {
  const sliced = films.slice(
    renderedFilmCount,
    renderedFilmCount + FILM_COUNT_PER_STEP,
  );
  for (let i = 0; i < sliced.length; i++) {
    const film = sliced[i];
    const filmsListElement = allMoviesContainer
      .getElement()
      .querySelector('.films-list__container');
    renderFilm(filmsListElement, film);
  }

  renderedFilmCount += FILM_COUNT_PER_STEP;
  if (renderedFilmCount >= films.length) {
    showMoreButton.removeElement();
  }
});
