import AllMoviesContainer from '../view/film-all-movies';
import FilmContainer from '../view/film-container';
import MostCommentedContainer from '../view/film-most-commented';
import TopRatedContainer from '../view/film-top-rated';
import FooterStatistics from '../view/footer-statistics';
import NoFilm from '../view/no-film';
import SiteMenu from '../view/site-menu';
import Sorting from '../view/sorting';
import UserProfile from '../view/user-profile';

export default class Home {
  constructor(homeContainer) {
    this._homeContainer = homeContainer;

    this._userProfileComponent = new UserProfile();
    this._siteMenuComponent = new SiteMenu();
    this._sortingComponent = new Sorting();
    this._filmContainerComponent = new FilmContainer();
    this._allMoviesComponent = new AllMoviesContainer();
    this._noFilmComponent = new NoFilm();
    this._topRatedComponent = new TopRatedContainer();
    this._mostCommentedComponent = new MostCommentedContainer();
    this._footerStatisticsComponent = new FooterStatistics();
  }

  init(homeFilms) {
    this._homeFilms = homeFilms.slice();
  }
  _renderUserProfile() {}

  _renderSort() {}

  _renderFilm() {}

  _renderFilms() {}

  _renderNoFilms() {}

  _renderShowMoreButton() {}

  _renderTopRatedComponent() {}

  _renderMostCommentedComponent() {}

  _renderFooterStatistics() {}

  _renderHome() {}
}
