import { createElement } from '../utils';

const createFooterStatisticsTemplate = (films) => {
  return `
  <p>${films.length} movies inside</p>
  `;
};

export default class FooterStatistics {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._films);
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
