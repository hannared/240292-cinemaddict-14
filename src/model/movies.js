import dayjs from 'dayjs';
import Observer from '../utils/observer.js';

const convertMinsToHrsMins = (mins) => {
  let hours = Math.floor(mins / 60);
  let minutes = mins % 60;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return { hours, minutes };
};

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(movies) {
    this._movies = movies.slice();
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
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
    debugger;

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

      // dueDate: task.due_date !== null ? new Date(task.due_date) : task.due_date, // На клиенте дата хранится как экземпляр Date
      // isArchive: task.is_archived,
      // isFavorite: task.is_favorite,
      // repeating: task.repeating_days,
    });

    // Ненужные ключи мы удаляем
    // delete adaptedTask.due_date;
    // delete adaptedTask.is_archived;
    // delete adaptedTask.is_favorite;
    // delete adaptedTask.repeating_days;

    return adaptedFilm;
  }

  static adaptToServer(movie) {
    const adaptedFilm = Object.assign({}, movie, {
      // due_date:
      //   task.dueDate instanceof Date ? task.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
      // is_archived: task.isArchive,
      // is_favorite: task.isFavorite,
      // repeating_days: task.repeating,
    });

    // Ненужные ключи мы удаляем
    // delete adaptedTask.dueDate;
    // delete adaptedTask.isArchive;
    // delete adaptedTask.isFavorite;
    // delete adaptedTask.repeating;

    return adaptedFilm;
  }
}
