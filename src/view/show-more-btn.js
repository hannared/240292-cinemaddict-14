import Abstract from './abstract';

const createShowMoreBtnTemplate = () => {
  return `
  <button class="films-list__show-more">Show more</button>
  `;
};

export default class ShowMoreBtn extends Abstract {
  getTemplate() {
    return createShowMoreBtnTemplate();
  }

  removeElement() {
    this._element.remove();

    super.removeElement();
  }
}
