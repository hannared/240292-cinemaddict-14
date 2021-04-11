export const getHistoryFilms = (a) => {
  const historyFilms = a.filter((film) => film.userDetails.alreadyWatched);

  return historyFilms;
};

export const getWatchlistFilms = (a) => {
  const watchlistFilms = a.filter((film) => film.userDetails.watchlist);

  return watchlistFilms;
};

export const getFavoriteFilms = (a) => {
  const favoriteFilms = a.filter((film) => film.userDetails.favorite);

  return favoriteFilms;
};
