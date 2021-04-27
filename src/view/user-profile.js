import Abstract from './abstract';

const getUserRating = (alreadyWatchedList) => {
  let profileRating = '';

  if (alreadyWatchedList.length <= 10 && alreadyWatchedList.length > 0) {
    profileRating = 'Novice';
  } else if (alreadyWatchedList.length <= 20) {
    profileRating = 'Fan';
  } else if (alreadyWatchedList.length >= 21) {
    profileRating = 'Movie Buff';
  }
  return profileRating;
};

const createUserProfileTemplate = (films) => {
  const alreadyWatchedList = films.filter((film) => film.isAlreadyWatched);
  const profileRating = getUserRating(alreadyWatchedList);

  return `<section class="header__profile profile">
    <p class="profile__rating">${profileRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
  `;
};

export default class UserProfile extends Abstract {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createUserProfileTemplate(this._films);
  }
}
