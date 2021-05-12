import Observer, { UpdateType } from '../utils/observer';

export default class Sorting extends Observer {
  constructor() {
    super();

    this._sorting = (films) => films;
  }

  setSorting(sorting) {
    this._sorting = sorting;

    this._notify(UpdateType.MAJOR, sorting);
  }

  getSorting() {
    return this._sorting;
  }
}
