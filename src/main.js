import { createSiteMenuTemplate } from './view/site-menu.js';
import { createFilmContainerTemplate } from './view/film-container.js';
import { createFilmAllMoviesTemplate } from './view/film-all-movies.js';
import { createFilmTopRatedTemplate } from './view/film-top-rated.js';
import { createFilmMostCommentedTemplate } from './view/film-most-commented.js';
import { createUserProfileTemplate } from './view/user-profile.js';
import { createFilmDetailsTemplate } from './view/film-details.js';
import { createShowMoreBtnTemplate } from './view/show-more-btn.js';
import {
  createSortingTemplate,
  getSortByDateFilms,
  getSortByDefaultFilms,
  getSortByRatingFilms,
} from './view/sorting.js';
import { createFooterStatisticsTemplate } from './view/footer-statistics.js';
import { generateFilms } from './mock/film.js';
import { slice } from 'lodash';

const FILM_COUNT = 26;
const FILM_COUNT_PER_STEP = 5;

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const films = generateFilms(FILM_COUNT);
console.log(films);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainElement, createSiteMenuTemplate(films));

render(siteMainElement, createSortingTemplate());

render(siteHeaderElement, createUserProfileTemplate());

render(
  siteMainElement,
  createFilmContainerTemplate(
    createFilmAllMoviesTemplate(films.slice(0, FILM_COUNT_PER_STEP)),
    createFilmTopRatedTemplate(films),
    createFilmMostCommentedTemplate(films),
    createShowMoreBtnTemplate(),
  ),
);

render(siteMainElement, createFilmDetailsTemplate(films[0]));

render(siteFooterElement, createFooterStatisticsTemplate());

let renderedFilmCount = FILM_COUNT_PER_STEP;
const showMoreButton = siteMainElement.querySelector('.films-list__show-more');
const allMoviesContainer = siteMainElement.querySelector(
  '.films-list__container',
);
showMoreButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  render(
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
