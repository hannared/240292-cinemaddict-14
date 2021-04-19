import { generateFilms } from './mock/film.js';
import Footer from './presenter/footer-presenter.js';
import Header from './presenter/header-presenter.js';
import Home from './presenter/home-presenter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer__statistics');

const FILM_COUNT = 26;

const films = generateFilms(FILM_COUNT);

const header = new Header(siteHeaderElement);
header.init(films);
header.render();

const home = new Home(siteMainElement);
home.init(films);
home.render();

const footer = new Footer(siteFooterElement);
footer.init(films);
footer.render();
