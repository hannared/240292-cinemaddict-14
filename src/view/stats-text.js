import Abstract from './abstract';
import Smart from './smart';

const createStatsWatchedTemplate = (number) => {
  return `<li class="statistic__text-item">
  <h4 class="statistic__item-title">You watched</h4>
  <p class="statistic__item-text">${number} <span class="statistic__item-description">movies</span></p>
</li>`;
};

const createStatsDurationTemplate = (hours, minutes) => {
  return `<li class="statistic__text-item">
  <h4 class="statistic__item-title">Total duration</h4>
  <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
</li>`;
};

const createStatsTopGenreTemplate = (title) => {
  return `<li class="statistic__text-item">
  <h4 class="statistic__item-title">Top genre</h4>
  <p class="statistic__item-text">${title}</p>
</li>`;
};

export default class StatsWatchedText extends Smart {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    const { number } = this._data;

    return createStatsWatchedTemplate(number);
  }
}

export class StatsDurationText extends Smart {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    const { hours, minutes } = this._data;

    return createStatsDurationTemplate(hours, minutes);
  }
}

export class StatsTopGenreText extends Smart {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createStatsTopGenreTemplate(this._data);
  }
}
