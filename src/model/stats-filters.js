import dayjs from 'dayjs';
import Observer, { UpdateType } from '../utils/observer.js';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const newStats = () => {
  return {
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
};

export const getAllTimeStats = (movies) => {
  const stats = newStats();

  movies.forEach((movie) => {
    const genres = movie.genre;

    genres.forEach((genre) => {
      if (stats[genre] === undefined) {
        stats[genre] = 0;
      }

      stats[genre] += 1;
    });
  });

  return stats;
};

export const getTodayStats = (movies) => {
  const stats = newStats();
  const today = dayjs(new Date());

  movies.forEach((movie) => {
    const genres = movie.genre;

    genres.forEach((genre) => {
      if (stats[genre] === undefined) {
        stats[genre] = 0;
      }

      if (today.diff(dayjs(movie.watchingDate)) === 0) {
        stats[genre] += 1;
      }
    });
  });

  return stats;
};

export const getWeekStats = (movies) => {
  const stats = newStats();
  const today = dayjs(new Date());

  movies.forEach((movie) => {
    const genres = movie.genre;

    genres.forEach((genre) => {
      if (stats[genre] === undefined) {
        stats[genre] = 0;
      }

      const days7ago = dayjs(today).subtract(7, 'day');
      if (dayjs(movie.watchingDate).isBetween(days7ago, today, 'day', '[]')) {
        stats[genre] += 1;
      }
    });
  });

  return stats;
};

export const getMonthStats = (movies) => {
  const stats = newStats();
  const today = dayjs(new Date());

  movies.forEach((movie) => {
    const genres = movie.genre;

    genres.forEach((genre) => {
      if (stats[genre] === undefined) {
        stats[genre] = 0;
      }

      const monthAgo = dayjs(today).subtract(1, 'month');
      if (dayjs(movie.watchingDate).isBetween(monthAgo, today, 'day', '[]')) {
        stats[genre] += 1;
      }
    });
  });

  return stats;
};

export const getYearStats = (movies) => {
  const stats = newStats();
  const today = dayjs(new Date());

  movies.forEach((movie) => {
    const genres = movie.genre;

    genres.forEach((genre) => {
      if (stats[genre] === undefined) {
        stats[genre] = 0;
      }

      const yearAgo = dayjs(today).subtract(1, 'year');
      if (dayjs(movie.watchingDate).isBetween(yearAgo, today, 'day', '[]')) {
        stats[genre] += 1;
      }
    });
  });

  return stats;
};

export const getWatchedStatsAll = (movies) => {
  let stats = 0;

  movies.forEach((movie) => {
    if (movie.isAlreadyWatched) {
      stats += 1;
    }
  });

  return stats;
};

export const getWatchedStatsToday = (movies) => {
  const today = dayjs(new Date());

  let stats = 0;

  movies.forEach((movie) => {
    if (movie.isAlreadyWatched && today.diff(dayjs(movie.watchingDate)) === 0) {
      stats += 1;
    }
  });

  return stats;
};

export const getWatchedStatsWeek = (movies) => {
  const today = dayjs(new Date());

  let stats = 0;

  movies.forEach((movie) => {
    const days7ago = dayjs(today).subtract(7, 'day');

    if (
      movie.isAlreadyWatched &&
      dayjs(movie.watchingDate).isBetween(days7ago, today, 'day', '[]')
    ) {
      stats += 1;
    }
  });

  return stats;
};

export const getWatchedStatsMonth = (movies) => {
  const today = dayjs(new Date());

  let stats = 0;

  movies.forEach((movie) => {
    const monthAgo = dayjs(today).subtract(1, 'month');

    if (
      movie.isAlreadyWatched &&
      dayjs(movie.watchingDate).isBetween(monthAgo, today, 'day', '[]')
    ) {
      stats += 1;
    }
  });

  return stats;
};

export const getWatchedStatsYear = (movies) => {
  const today = dayjs(new Date());

  let stats = 0;

  movies.forEach((movie) => {
    const yearAgo = dayjs(today).subtract(1, 'year');

    if (
      movie.isAlreadyWatched &&
      dayjs(movie.watchingDate).isBetween(yearAgo, today, 'day', '[]')
    ) {
      stats += 1;
    }
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
