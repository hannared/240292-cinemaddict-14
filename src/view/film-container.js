import { createElement } from '../utils';

const createFilmContainerTemplate = (films) => {
  return `<section class="films">
  </section>`;
};

export default class FilmContainer {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmContainerTemplate(this._films);
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
