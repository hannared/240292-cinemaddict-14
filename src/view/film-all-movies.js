import { createFilmCardTemplate } from "./film-card.js";

const FILM_COUNT = 5;

export const createFilmAllMoviesTemplate = () => {
  const cards = [];

  for (let i = 0; i < FILM_COUNT; i++) {
    cards.push(createFilmCardTemplate());
  }

  return `
  <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      ${cards.join("")}
      </div>
  </section>
`;
};
