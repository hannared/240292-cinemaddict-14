import { createElement } from '../utils';

const createFilmContainerTemplate = () => {
  return `<section class="films">
  </section>`;
};

export default class FilmContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmContainerTemplate();
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
