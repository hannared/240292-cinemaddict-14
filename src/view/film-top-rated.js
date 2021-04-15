import { createElement } from '../utils.js';
import FilmCard from './film-card.js';

const FILM_COUNT = 2;

const createFilmTopRatedTemplate = (films) => {
  const cards = [];

  const sliced = films.slice(0, FILM_COUNT);
  for (let i = 0; i < sliced.length; i++) {
    cards.push(new FilmCard(films[i]).getTemplate());
  }

  return `
  <section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
      ${cards.join('')}
    </div>
  </section>`;
};

export default class TopRatedContainer {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmTopRatedTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
