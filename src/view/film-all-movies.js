import { createFilmCardTemplate } from './film-card.js';

export const createFilmAllMoviesTemplate = (films) => {
  const cards = [];

  for (let i = 0; i < films.length; i++) {
    cards.push(createFilmCardTemplate(films[i]));
  }

  return `
  <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      ${cards.join('')}
      </div>
  </section>
`;
};
