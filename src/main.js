import Api from './api.js';
import Filters from './model/filters.js';
import Movies from './model/movies.js';
import Sorting from './model/sorting.js';
import StatsFilters from './model/stats-filters.js';
import Footer from './presenter/footer-presenter.js';
import Header from './presenter/header-presenter.js';
import Home from './presenter/home-presenter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const AUTHORIZATION = 'Basic eo0w000ik29888a';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const movies = new Movies();
const filters = new Filters();
const sorting = new Sorting();
const statsFilters = new StatsFilters();

const header = new Header(siteHeaderElement, movies);
const home = new Home(siteMainElement, movies, filters, sorting, statsFilters);
const footer = new Footer(siteFooterElement, movies);

const api = new Api(END_POINT, AUTHORIZATION);

api.getFilms().then((data) => {
  movies.setMovies(data);

  header.init();
  header.render();

  home.init();
  home.render();

  footer.init();
  footer.render();
});
