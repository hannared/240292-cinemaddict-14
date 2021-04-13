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

const FILM_COUNT = 26;
const FILM_COUNT_PER_STEP = 5;

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const films = generateFilms(FILM_COUNT);

const filmComponent = new FilmContainer(films);

renderElement(siteMainElement, new SiteMenu(films).getElement());

renderElement(siteMainElement, new Sorting().getElement());

renderElement(siteHeaderElement, new UserProfile(films).getElement());

renderElement(siteMainElement, filmComponent.getElement());

// - render all movies
renderElement(
  filmComponent.getElement(),
  new AllMoviesContainer(films.slice(0, FILM_COUNT_PER_STEP)).getElement(),
);
renderElement(filmComponent.getElement(), new ShowMoreBtn().getElement());
renderElement(
  filmComponent.getElement(),
  new TopRatedContainer(films).getElement(),
);
renderElement(
  filmComponent.getElement(),
  new MostCommentedContainer(films).getElement(),
);

renderElement(siteMainElement, new FilmDetails(films[0]).getElement());

renderElement(siteFooterElement, new FooterStatistics(films).getElement());

let renderedFilmCount = FILM_COUNT_PER_STEP;
const showMoreButton = siteMainElement.querySelector('.films-list__show-more');
const allMoviesContainer = siteMainElement.querySelector(
  '.films-list__container',
);
//showMoreButton.addEventListener('click', (evt) => {
//evt.preventDefault();

// renderTemplate(
//   allMoviesContainer,
//   createFilmAllMoviesTemplate(
//     films.slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP),
//   ),
// );
// renderedFilmCount += FILM_COUNT_PER_STEP;
// if (renderedFilmCount >= films.length) {
//   showMoreButton.remove();
// }
//});
