export const getHistoryFilms = (films) => {
  const historyFilms = films.filter((film) => film.isAlreadyWatched);

  return historyFilms;
};

export const getWatchlistFilms = (a) => {
  const watchlistFilms = a.filter((film) => film.isWatchList);

  return watchlistFilms;
};

export const getFavoriteFilms = (a) => {
  const favoriteFilms = a.filter((film) => film.isFavorite);

  return favoriteFilms;
};
