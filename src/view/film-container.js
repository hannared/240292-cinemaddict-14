export const createFilmContainerTemplate = (
  allMoviesTemplate,
  topRatedTemplate,
  mostCommentedTemplate,
  showMoreBtn,
) => {
  return `<section class="films">
    ${allMoviesTemplate}
    ${showMoreBtn}
    ${topRatedTemplate}
    ${mostCommentedTemplate}
  </section>`;
};
