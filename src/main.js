import SiteMenu, { createSiteMenuTemplate } from './view/site-menu.js';
import { createFilmContainerTemplate } from './view/film-container.js';
import { createFilmAllMoviesTemplate } from './view/film-all-movies.js';
import { createFilmTopRatedTemplate } from './view/film-top-rated.js';
import { createFilmMostCommentedTemplate } from './view/film-most-commented.js';
import { createUserProfileTemplate } from './view/user-profile.js';
import { createFilmDetailsTemplate } from './view/film-details.js';
import { createShowMoreBtnTemplate } from './view/show-more-btn.js';
import Sorting, { createSortingTemplate } from './view/sorting.js';
import { createFooterStatisticsTemplate } from './view/footer-statistics.js';
import { generateFilms } from './mock/film.js';
import { renderElement, renderTemplate } from './utils.js';

const FILM_COUNT = 26;
const FILM_COUNT_PER_STEP = 5;

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const films = generateFilms(FILM_COUNT);

renderElement(siteMainElement, new SiteMenu(films).getElement());

renderElement(siteMainElement, new Sorting().getElement());

renderTemplate(siteHeaderElement, createUserProfileTemplate(films));

renderTemplate(
  siteMainElement,
  createFilmContainerTemplate(
    createFilmAllMoviesTemplate(films.slice(0, FILM_COUNT_PER_STEP)),
    createFilmTopRatedTemplate(films),
    createFilmMostCommentedTemplate(films),
    createShowMoreBtnTemplate(),
  ),
);

renderTemplate(siteMainElement, createFilmDetailsTemplate(films[0]));

renderTemplate(siteFooterElement, createFooterStatisticsTemplate(films));

let renderedFilmCount = FILM_COUNT_PER_STEP;
const showMoreButton = siteMainElement.querySelector('.films-list__show-more');
const allMoviesContainer = siteMainElement.querySelector(
  '.films-list__container',
);
showMoreButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  renderTemplate(
    allMoviesContainer,
    createFilmAllMoviesTemplate(
      films.slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP),
    ),
  );
  renderedFilmCount += FILM_COUNT_PER_STEP;
  if (renderedFilmCount >= films.length) {
    showMoreButton.remove();
  }
});
