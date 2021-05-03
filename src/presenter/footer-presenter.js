import { renderElement } from '../utils';
import FooterStatistics from '../view/footer-statistics';

export default class Footer {
  constructor(footerContainer, movies) {
    this._footerContainer = footerContainer;
    this._movies = movies;
  }

  init() {
    this._homeFilms = this._movies.getMovies();
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
