import dayjs from 'dayjs';
import Observer, { UpdateType } from '../utils/observer.js';
import isBetween from 'dayjs/plugin/isBetween';
import _ from 'lodash';

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
      if (movie.isAlreadyWatched) {
        stats[genre] += 1;
      }
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

      if (
        movie.isAlreadyWatched &&
        today.diff(dayjs(movie.watchingDate)) === 0
      ) {
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
      if (movie.isAlreadyWatched && stats[genre] === undefined) {
        stats[genre] = 0;
      }

      const weekAgo = dayjs(today).subtract(7, 'day');
      if (dayjs(movie.watchingDate).isBetween(weekAgo, today, 'day', '[]')) {
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
      if (
        movie.isAlreadyWatched &&
        dayjs(movie.watchingDate).isBetween(monthAgo, today, 'day', '[]')
      ) {
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
      if (
        movie.isAlreadyWatched &&
        dayjs(movie.watchingDate).isBetween(yearAgo, today, 'day', '[]')
      ) {
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
    const weekAgo = dayjs(today).subtract(7, 'day');

    if (
      movie.isAlreadyWatched &&
      dayjs(movie.watchingDate).isBetween(weekAgo, today, 'day', '[]')
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

export const getWatchedDurationAll = (movies) => {
  let minutes = 0;
  let hours = 0;

  movies.forEach((movie) => {
    if (movie.isAlreadyWatched) {
      minutes += movie.minutes;
      hours += movie.hours;
    }
  });

  minutes = minutes - Math.floor(minutes / 60) * 60;
  hours += Math.floor(minutes / 60);

  return { minutes, hours };
};

export const getWatchedDurationToday = (movies) => {
  const today = dayjs(new Date());

  let minutes = 0;
  let hours = 0;

  movies.forEach((movie) => {
    if (movie.isAlreadyWatched && today.diff(dayjs(movie.watchingDate)) === 0) {
      minutes += movie.minutes;
      hours += movie.hours;
    }
  });

  minutes = minutes - Math.floor(minutes / 60) * 60;
  hours += Math.floor(minutes / 60);

  return { minutes, hours };
};

export const getWatchedDurationWeek = (movies) => {
  const today = dayjs(new Date());

  let minutes = 0;
  let hours = 0;

  movies.forEach((movie) => {
    const weekAgo = dayjs(today).subtract(7, 'day');
    if (
      movie.isAlreadyWatched &&
      dayjs(movie.watchingDate).isBetween(weekAgo, today, 'day', '[]')
    ) {
      minutes += movie.minutes;
      hours += movie.hours;
    }
  });

  minutes = minutes - Math.floor(minutes / 60) * 60;
  hours += Math.floor(minutes / 60);

  return { minutes, hours };
};

export const getWatchedDurationMonth = (movies) => {
  const today = dayjs(new Date());

  let minutes = 0;
  let hours = 0;

  movies.forEach((movie) => {
    const monthAgo = dayjs(today).subtract(1, 'month');
    if (
      movie.isAlreadyWatched &&
      dayjs(movie.watchingDate).isBetween(monthAgo, today, 'day', '[]')
    ) {
      minutes += movie.minutes;
      hours += movie.hours;
    }
  });

  minutes = minutes - Math.floor(minutes / 60) * 60;
  hours += Math.floor(minutes / 60);

  return { minutes, hours };
};

export const getWatchedDurationYear = (movies) => {
  const today = dayjs(new Date());

  let minutes = 0;
  let hours = 0;

  movies.forEach((movie) => {
    const yearAgo = dayjs(today).subtract(1, 'year');
    if (
      movie.isAlreadyWatched &&
      dayjs(movie.watchingDate).isBetween(yearAgo, today, 'day', '[]')
    ) {
      minutes += movie.minutes;
      hours += movie.hours;
    }
  });

  minutes = minutes - Math.floor(minutes / 60) * 60;
  hours += Math.floor(minutes / 60);

  return { minutes, hours };
};

export const getTopGenreAll = (statsFilter, movies) => {
  const filter = statsFilter.getStatsFilter();
  const genres = filter(movies);
  // { Adventure: 10, Comedy: 5 }

  const values = _.values(genres);
  const maxValue = _.max(values);
  const genre = _.findKey(genres, (o) => {
    return o === maxValue;
  });

  return { genre };
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
