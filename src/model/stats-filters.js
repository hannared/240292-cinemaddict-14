import Observer, { UpdateType } from '../utils/observer.js';

export const getAllTimeStats = (movies) => {
  const stats = {
    Drama: 0,
    Adventure: 0,
    Comedy: 0,
    Animation: 0,
    Family: 0,
    'Sci-Fi': 0,
    Thriller: 0,
    Horror: 0,
    Action: 0,
  };

  movies.forEach((movie) => {
    // Comedy,Thriller => ["Comedy", "Thriller"]
    const genres = movie.genre;

    genres.forEach((genre) => {
      if (stats[genre] === undefined) {
        stats[genre] = 0;
      }
      // if date.today === watchingDate ... +1
      stats[genre] += 1;
    });
  });

  return stats;
};

export default class StatsFilters extends Observer {
  constructor() {
    super();

    this._statsFilter = getAllTimeStats;
  }

  setStatsFilter(filter) {
    this._statsFilter = filter;

    this._notify(UpdateType.MAJOR, filter);
  }

  getStatsFilter() {
    return this._statsFilter;
  }
}
