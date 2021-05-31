import dayjs from 'dayjs';
import Observer from '../utils/observer.js';

const convertMinsToHrsMins = (mins) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return { hours, minutes };
};

export default class Movies extends Observer {
  constructor(api) {
    super();
    this._movies = [];
    this._api = api;
  }

  setMovies(movies) {
    this._movies = movies.slice();
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    this._api.updateFilm(update).then((response) => {
      this._updateMovie(updateType, response);
    });
  }

  _updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can not update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addMovie(updateType, update) {
    this._movies = [update, ...this._movies];

    this._notify(updateType, update);
  }

  deleteMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can not delete unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(movie) {
    const year = dayjs(movie.film_info.release.date).year();

    const { hours, minutes } = convertMinsToHrsMins(movie.film_info.runtime);
    const adaptedFilm = Object.assign({}, movie, {
      title: movie.film_info.title,
      poster: movie.film_info.poster,
      alternativeTitle: movie.film_info.alternative_title,
      rating: movie.film_info.total_rating,
      ageRating: movie.film_info.age_rating,
      year: year,
      hours: hours,
      minutes: minutes,
      genre: movie.film_info.genre,
      description: movie.film_info.description,
      director: movie.film_info.director,
      writers: movie.film_info.writers,
      actors: movie.film_info.actors,
      release: {
        date: movie.film_info.release.date,
        country: movie.film_info.release.release_country,
      },
      isFavorite: movie.user_details.favorite,
      isWatchList: movie.user_details.watchlist,
      isAlreadyWatched: movie.user_details.already_watched,
      watchingDate: movie.user_details.watching_date,
      commentsList: [],
      runtime: movie.film_info.runtime,
    });

    return adaptedFilm;
  }

  static adaptToServer(movie) {
    // prettier-ignore
    const adaptedFilm = {
      id: movie.id,
      'film_info': {
        title: movie.title,
        'alternative_title': movie.alternativeTitle,
        'total_rating': movie.rating,
        poster: movie.poster,
        'age_rating': movie.ageRating,
        director: movie.director,
        writers: movie.writers,
        actors: movie.actors,
        release: {
          date: movie.release.date,
          'release_country': movie.release.country,
        },
        runtime: movie.runtime,
        genre: movie.genre,
        description: movie.description,
      },
      'user_details': {
        watchlist: movie.isWatchList,
        'already_watched': movie.isAlreadyWatched,
        'watching_date': movie.watchingDate,
        favorite: movie.isFavorite,
      },
      comments: movie.comments,
    };

    return adaptedFilm;
  }
}
