import { createSiteMenuTemplate } from './view/site-menu.js';
import { createFilmContainerTemplate } from './view/film-container.js';
import { createFilmAllMoviesTemplate } from './view/film-all-movies.js';
import { createFilmTopRatedTemplate } from './view/film-top-rated.js';
import { createFilmMostCommentedTemplate } from './view/film-most-commented.js';
import { createUserProfileTemplate } from './view/user-profile.js';
import { createFilmDetailsTemplate } from './view/film-details.js';
import { createShowMoreBtnTemplate } from './view/show-more-btn.js';
import { createSortingTemplate } from './view/sorting.js';
import { createFooterStatisticsTemplate } from './view/footer-statistics.js';
import { generateFilms } from './mock/film.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const films = generateFilms();
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
    createFilmAllMoviesTemplate(films),
    createFilmTopRatedTemplate(films),
    createFilmMostCommentedTemplate(films),
    createShowMoreBtnTemplate(),
  ),
);

render(siteMainElement, createFilmDetailsTemplate(films[0]));

render(siteFooterElement, createFooterStatisticsTemplate());
