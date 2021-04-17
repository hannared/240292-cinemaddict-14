import Abstract from './abstract';

const createShowMoreBtnTemplate = () => {
  return `
  <button class="films-list__show-more">Show more</button>
  `;
};

export default class ShowMoreBtn extends Abstract {
  constructor() {
    super();
    this._clickShowMoreBtnHandler = this._clickShowMoreBtnHandler.bind(this);
  }
  getTemplate() {
    return createShowMoreBtnTemplate();
  }

  removeElement() {
    this._element.remove();

    super.removeElement();
  }
  _clickShowMoreBtnHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setShowMoreBtnClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickShowMoreBtnHandler);
  }
}
