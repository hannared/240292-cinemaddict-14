import Abstract from './abstract';

const createFilmContainerTemplate = () => {
  return `<section class="films">
  </section>`;
};

export default class FilmContainer extends Abstract {
  getTemplate() {
    return createFilmContainerTemplate();
  }
}
