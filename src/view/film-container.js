export const createFilmContainerTemplate = (
  allMoviesTemplate,
  topRatedTemplate,
  mostCommentedTemplate
) => {
  return `
  <section class="films">
    ${allMoviesTemplate}
    ${topRatedTemplate}
    ${mostCommentedTemplate}
  </section>
`;
};
