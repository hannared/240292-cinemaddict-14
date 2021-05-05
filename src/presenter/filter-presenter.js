import { renderElement } from '../utils';
import SiteMenu from '../view/site-menu';

export default class Filters {
  constructor(homeContainer, filters, movies) {
    this._homeContainer = homeContainer;
    this._filters = filters;
    this._movies = movies;
  }

  init() {}

  render() {
    this._renderSiteMenu();
  }

  update() {
    const films = this._movies.getMovies();

    this._siteMenuComponent.updateData(films);
  }

  _renderSiteMenu() {
    this._siteMenuComponent = new SiteMenu(this._movies.getMovies());

    renderElement(this._homeContainer, this._siteMenuComponent);
  }
}
