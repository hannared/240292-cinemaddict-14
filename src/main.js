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

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainElement, createSiteMenuTemplate(), 'beforeend');

render(siteMainElement, createSortingTemplate(), 'beforeend');

render(siteHeaderElement, createUserProfileTemplate(), 'beforeend');

render(
  siteMainElement,
  createFilmContainerTemplate(
    createFilmAllMoviesTemplate(),
    createFilmTopRatedTemplate(),
    createFilmMostCommentedTemplate(),
    createShowMoreBtnTemplate(),
  ),
  'beforeend',
);

render(siteMainElement, createFilmDetailsTemplate(), 'beforeend');

render(siteFooterElement, createFooterStatisticsTemplate(), 'beforeend');
