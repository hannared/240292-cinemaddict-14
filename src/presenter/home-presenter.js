import { renderElement, replace } from '../utils';
import SiteMenu from '../view/site-menu';
import FilmsPresenter from './films-presenter';

export default class Home {
  constructor(homeContainer) {
    this._homeContainer = homeContainer;

    this._handleFilmsChange = this._handleFilmsChange.bind(this);

    this._filmsPresenter = new FilmsPresenter(
      homeContainer,
      this._handleFilmsChange,
    );
  }

  _handleFilmsChange(films) {
    this._homeFilms = films;

    const oldSiteMenu = this._siteMenuComponent;
    this._siteMenuComponent = new SiteMenu(this._homeFilms);
    replace(this._siteMenuComponent, oldSiteMenu);
  }

  init(homeFilms) {
    this._homeFilms = homeFilms.slice();

    this._filmsPresenter.init(homeFilms);
  }

  _renderSiteMenu() {
    this._siteMenuComponent = new SiteMenu(this._homeFilms);

    renderElement(this._homeContainer, this._siteMenuComponent);
  }

  _renderHome() {
    this._renderSiteMenu();

    this._filmsPresenter.render();
  }

  render() {
    this._renderHome();
  }
}
