import _ from 'lodash';

export const getSortByDateFilms = (films) => {
  return _.sortBy(films, ['year']);
};
export const getSortByRatingFilms = (films) => {
  return _.sortBy(films, ['rating']);
};
export const getSortByDefaultFilms = (films) => {
  return films;
};

export const createSortingTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
</ul>`;
};
