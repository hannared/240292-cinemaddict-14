// import Abstract from './abstract.js';
// import FilmCard from './film-card.js';

// const FILM_COUNT = 2;

// export const createFilmMostCommentedTemplate = (films) => {
//   const cards = [];

//   const sliced = films.slice(0, FILM_COUNT);
//   for (let i = 0; i < sliced.length; i++) {
//     cards.push(new FilmCard(films[i]).getTemplate());
//   }

//   return `
//   <section class="films-list films-list--extra">
//     <h2 class="films-list__title">Most commented</h2>
//     <div class="films-list__container">
//     ${cards.join('')}
//     </div>
//   </section>`;
// };

// export default class MostCommentedContainer extends Abstract {
//   constructor(film) {
//     super();
//     this._film = film;
//   }

//   getTemplate() {
//     return createFilmMostCommentedTemplate(this._film);
//   }
// }
