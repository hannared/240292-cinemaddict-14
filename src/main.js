import { createSiteMenuTemplate } from "./view/site-menu.js";
import { createFilmContainerTemplate } from "./view/film-container.js";
import { createFilmAllMoviesTemplate } from "./view/film-all-movies.js";
import { createFilmTopRatedTemplate } from "./view/film-top-rated.js";
import { createFilmMostCommentedTemplate } from "./view/film-most-commented.js";
import { createUserProfileTemplate } from "./view/user-profile.js";

const siteMainElement = document.querySelector(".main");
const siteHeaderElement = document.querySelector(".header");

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainElement, createSiteMenuTemplate(), "beforeend");

render(siteHeaderElement, createUserProfileTemplate(), "beforeend");

render(
  siteMainElement,
  createFilmContainerTemplate(
    createFilmAllMoviesTemplate(),
    createFilmTopRatedTemplate(),
    createFilmMostCommentedTemplate()
  ),
  "beforeend"
);
