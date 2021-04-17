import _ from 'lodash';
import Abstract from './abstract';

export const getSortByDateFilms = (films) => {
  return _.sortBy(films, ['year']);
};
export const getSortByRatingFilms = (films) => {
  return _.sortBy(films, ['rating']);
};
export const getSortByDefaultFilms = (films) => {
  return films;
};

const createSortingTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
</ul>`;
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
