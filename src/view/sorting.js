import _ from 'lodash';
import Abstract from './abstract';

const createSortingTemplate = () => {
  return `<ul class="sort"></ul>`;
};

export default class Sorting extends Abstract {
  getTemplate() {
    return createSortingTemplate();
  }

  removeElement() {
    this._element.remove();

    super.removeElement();
  }
}
