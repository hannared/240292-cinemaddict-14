import { generateFilms } from './mock/film.js';
import Filters from './model/filters.js';
import Movies from './model/movies.js';
import Sorting from './model/sorting.js';
import Footer from './presenter/footer-presenter.js';
import Header from './presenter/header-presenter.js';
import Home from './presenter/home-presenter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const FILM_COUNT = 26;

const films = generateFilms(FILM_COUNT);

const movies = new Movies();
movies.setMovies(films);

const filters = new Filters();

const sorting = new Sorting();

const header = new Header(siteHeaderElement, movies);
header.init();
header.render();

const home = new Home(siteMainElement, movies, filters, sorting);
home.init();
home.render();

const footer = new Footer(siteFooterElement, movies);
footer.init();
footer.render();
