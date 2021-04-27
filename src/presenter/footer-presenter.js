import { renderElement } from '../utils';
import FooterStatistics from '../view/footer-statistics';

export default class Footer {
  constructor(footerContainer) {
    this._footerContainer = footerContainer;
  }

  init(homeFilms) {
    this._homeFilms = homeFilms.slice();
  }

  _renderFooterStatistics() {
    const films = this._homeFilms;

    renderElement(this._footerContainer, new FooterStatistics(films));
  }
  _renderFooter() {
    this._renderFooterStatistics();
  }

  render() {
    this._renderFooter();
  }
}
