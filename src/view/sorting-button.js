import _ from 'lodash';
import Smart from './smart';

export const getSortByDateFilms = (films) => {
  return _.sortBy(films, ['year']);
};

export const getSortByRatingFilms = (films) => {
  return _.sortBy(films, ['rating']);
};

export const getSortByDefaultFilms = (films) => {
  return _.sortBy(films, ['id']);
};

const createSortingButtonTemplate = (title) => {
  return `<li><a href="#" class="sort__button">${title}</a></li>`;
};

export default class SortingButton extends Smart {
  constructor(title, selected) {
    super();

    this._title = title;

    this._sortingClickHandler = this._sortingClickHandler.bind(this);

    if (selected) {
      this.getElement()
        .querySelector('.sort__button')
        .classList.add('sort__button--active');
    }
  }

  getTemplate() {
    return createSortingButtonTemplate(this._title);
  }

  reset() {
    this.getElement()
      .querySelector('.sort__button')
      .classList.remove('sort__button--active');
  }

  _sortingClickHandler() {
    this._callback.SortingClick();

    this.getElement()
      .querySelector('.sort__button')
      .classList.toggle('sort__button--active');
  }

  setSortingClickHandler(callback) {
    this._callback.SortingClick = callback;
    this.getElement()
      .querySelector('.sort__button')
      .addEventListener('click', this._sortingClickHandler);
  }

  removeElement() {
    this._element.remove();

    super.removeElement();
  }
}
