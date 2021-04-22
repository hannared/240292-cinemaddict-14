export const getHistoryFilms = (a) => {
  const historyFilms = a.filter((film) => film.isAlreadyWatched);

  return historyFilms;
};

export const getWatchlistFilms = (a) => {
  const watchlistFilms = a.filter((film) => film.isWatchlist);

  return watchlistFilms;
};

export const getFavoriteFilms = (a) => {
  const favoriteFilms = a.filter((film) => film.isFavorite);

  return favoriteFilms;
};
