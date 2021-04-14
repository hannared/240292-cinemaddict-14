import { createElement } from '../utils.js';
import FilmCard from './film-card.js';

const createFilmAllMoviesTemplate = (films) => {
  const cards = [];

  for (let i = 0; i < films.length; i++) {
    cards.push(new FilmCard(films[i]).getTemplate());
  }

  return `
  <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      ${cards.join('')}
      </div>
  </section>
`;
};

export default class AllMoviesContainer {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmAllMoviesTemplate(this._films);
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
