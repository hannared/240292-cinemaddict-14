import { createElement } from '../utils';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can not instantiate Abstract, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  showElement() {
    this.getElement().classList.remove('visually-hidden');
  }

  hideElement() {
    this.getElement().classList.add('visually-hidden');
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
