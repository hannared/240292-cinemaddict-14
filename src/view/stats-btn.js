import Smart from './smart';

const createStatsButtonTemplate = (selected) => {
  const activeClassName = selected ? 'main-navigation__additional--active' : '';
  return `<a href="#stats" class="main-navigation__additional ${activeClassName}">Stats</a>`;
};

export default class StatsButton extends Smart {
  constructor(selected) {
    super();
    this._selected = selected;
    this._statsClickHandler = this._statsClickHandler.bind(this);

    if (selected) {
      const el = this.getElement();
      el.classList.add('main-navigation__additional--active');
    }
  }

  getTemplate() {
    return createStatsButtonTemplate(this._selected);
  }

  reset() {
    this._selected = false;
    this.getElement().classList.remove('main-navigation__additional--active');
  }

  _statsClickHandler(evt) {
    evt.preventDefault();

    this._callback.statsClick();

    this.getElement().classList.toggle('main-navigation__additional--active');
    this._selected = !this._selected;
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getElement().addEventListener('click', this._statsClickHandler);
  }

  restoreHandlers() {
    this.setStatsClickHandler(this._callback.click);
  }
}
