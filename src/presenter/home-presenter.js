import { renderElement } from '../utils';
import SiteMenu from '../view/site-menu';
import FilmsPresenter from './films-presenter';
import Filters from './filter-presenter';
import Statistics from './stats-presenter';

export default class Home {
  constructor(homeContainer, movies, filters, sorting, statsFilters, api) {
    this._homeContainer = homeContainer;
    this._movies = movies;
    this._filters = filters;
    this._sorting = sorting;
    this._statsFilters = statsFilters;

    this._handleFilmsChange = this._handleFilmsChange.bind(this);

    this._statsPresenter = new Statistics(homeContainer, movies, statsFilters);

    this._siteMenuComponent = new SiteMenu(this._movies.getMovies());

    this._filmsPresenter = new FilmsPresenter(
      homeContainer,
      movies,
      sorting,
      api,
    );
    this._filtersPresenter = new Filters(
      this._siteMenuComponent,
      this._filters,
      this._movies,
      this._statsPresenter,
      this._filmsPresenter,
    );

    movies.addObserver(this._handleFilmsChange);
    filters.addObserver(this._handleFilmsChange);
    sorting.addObserver(this._handleFilmsChange);
  }

  _renderSiteMenu() {
    renderElement(this._homeContainer, this._siteMenuComponent);
  }

  _handleFilmsChange() {
    this._homeFilms = this._movies.getMovies();

    const filter = this._filters.getFilter();
    this._homeFilms = filter(this._homeFilms);

    const sorting = this._sorting.getSorting();
    this._homeFilms = sorting(this._homeFilms);

    this._filmsPresenter.update(this._homeFilms);
    this._filtersPresenter.update();
  }

  init() {
    this._filtersPresenter.init();
    this._filmsPresenter.init();
    this._statsPresenter.init();
  }

  _renderHome() {
    this._renderSiteMenu();

    this._filtersPresenter.render();
    this._filmsPresenter.render();
    this._statsPresenter.render();
  }

  render() {
    this._renderHome();
  }
}
