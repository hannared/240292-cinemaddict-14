import Abstract from './abstract';
import Smart from './smart';

const createStatsFilterBtnTemplate = (id, value, selected) => {
  const activeRadioBtn = selected ? 'checked' : '';
  return `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${id}" value="${value}" ${activeRadioBtn}>`;
};

const createStatsFilterLabelTemplate = (label, title) => {
  return `<label for="statistic-${label}" class="statistic__filters-label">${title}</label>`;
};

export class StatsFilterLabel extends Abstract {
  constructor(label, title) {
    super();

    this.label = label;
    this.title = title;
  }

  getTemplate() {
    return createStatsFilterLabelTemplate(this.label, this.title);
  }
}

export default class StatsFilterButton extends Smart {
  constructor(id, value, selected, label, title) {
    super();
    this.id = id;
    this.value = value;
    this.selected = selected;
    this.label = label;
    this.title = title;
    this._statsFilterClickHandler = this._statsFilterClickHandler.bind(this);

    if (selected) {
      const el = this.getElement();
      el.setAttribute('checked', 'checked');
    }
  }

  getTemplate() {
    return createStatsFilterBtnTemplate(this.id, this.value, this.selected);
  }

  _statsFilterClickHandler() {
    this._callback.statsFilterClick();
  }

  setStatsFilterClickHandler(callback) {
    this._callback.statsFilterClick = callback;
    this.getElement().addEventListener('click', this._statsFilterClickHandler);
  }

  restoreHandlers() {
    this.setStatsFilterClickHandler(this._callback.click);
  }

  reset() {}
}
