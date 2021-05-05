import Observer, { UpdateType } from '../utils/observer.js';

export default class Filters extends Observer {
  constructor() {
    super();

    // filters.setFilter(getHistoryFilms)
    this._filter = (films) => films;
  }

  setFilter(filter) {
    this._filter = filter;

    this._notify(UpdateType.MAJOR, filter);
  }

  getFilter() {
    return this._filter;
  }
}
