import Api from './api.js';
import { generateFilms } from './mock/film.js';
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

const FILM_COUNT = 26;
const AUTHORIZATION = 'Basic eo0w000ik29888a';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const films = generateFilms(FILM_COUNT);

const api = new Api(END_POINT, AUTHORIZATION);

api.getFilms().then((movies) => {
  console.log(movies);
});

const movies = new Movies();
movies.setMovies(films);

const filters = new Filters();

const sorting = new Sorting();

const statsFilters = new StatsFilters();

const header = new Header(siteHeaderElement, movies);
header.init();
header.render();

const home = new Home(siteMainElement, movies, filters, sorting, statsFilters);
home.init();
home.render();

const footer = new Footer(siteFooterElement, movies);
footer.init();
footer.render();
