import { createFilmCardTemplate } from './film-card.js';

const FILM_COUNT = 2;

export const createFilmMostCommentedTemplate = (films) => {
  const cards = [];

  for (let i = 0; i < FILM_COUNT; i++) {
    cards.push(createFilmCardTemplate(films[i]));
  }

  return `
  <section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
    ${cards.join('')}
    </div>
  </section>`;
};
