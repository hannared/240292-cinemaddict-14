import Abstract from './abstract';

const createFooterStatisticsTemplate = (films) => {
  return `
  <p>${films.length} movies inside</p>
  `;
};

export default class FooterStatistics extends Abstract {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._film);
  }
}
