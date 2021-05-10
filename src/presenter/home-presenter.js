import FilmsPresenter from './films-presenter';
import Filters from './filter-presenter';

export default class Home {
  constructor(homeContainer, movies, filters, sorting) {
    this._homeContainer = homeContainer;
    this._movies = movies;
    this._filters = filters;
    this._sorting = sorting;

    this._handleFilmsChange = this._handleFilmsChange.bind(this);

    this._filmsPresenter = new FilmsPresenter(homeContainer, movies, sorting);
    this._filtersPresenter = new Filters(
      this._homeContainer,
      this._filters,
      this._movies,
    );

    movies.addObserver(this._handleFilmsChange);
    filters.addObserver(this._handleFilmsChange);
    sorting.addObserver(this._handleFilmsChange);
  }

  _handleFilmsChange() {
    this._homeFilms = this._movies.getMovies();

    const filter = this._filters.getFilter();
    this._homeFilms = filter(this._homeFilms);

    const sorting = this._sorting.getSorting();
    this._homeFilms = sorting(this._homeFilms);

    // FilterPresenter render
    // FilmsPresenter render
    this._filmsPresenter.update(this._homeFilms);
    this._filtersPresenter.update();
  }

  init() {
    this._filtersPresenter.init();
    this._filmsPresenter.init();
  }

  _renderHome() {
    this._filtersPresenter.render();
    this._filmsPresenter.render();
  }

  render() {
    this._renderHome();
  }
}
