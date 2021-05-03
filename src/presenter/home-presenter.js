import { renderElement, replace } from '../utils';
import SiteMenu from '../view/site-menu';
import FilmsPresenter from './films-presenter';

export default class Home {
  constructor(homeContainer, movies) {
    this._homeContainer = homeContainer;
    this._movies = movies;

    this._handleFilmsChange = this._handleFilmsChange.bind(this);

    this._filmsPresenter = new FilmsPresenter(homeContainer, movies);

    movies.addObserver(this._handleFilmsChange);
  }

  _handleFilmsChange() {
    this._homeFilms = this._movies.getMovies();

    const oldSiteMenu = this._siteMenuComponent;
    this._siteMenuComponent = new SiteMenu(this._homeFilms);
    replace(this._siteMenuComponent, oldSiteMenu);
  }

  init() {
    this._homeFilms = this._movies.getMovies();

    this._filmsPresenter.init();
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
