export const createFilmCommentsTemplate = (comments) => {
  const array = [];

  for (let i = 0; i < comments.length; i++) {
    array.push(createFilmCommentTemplate(comments[i]));
  }

  return `
        <ul class="film-details__comments-list">
${array.join('')}
        </ul>
`;
};

export const createFilmCommentTemplate = (comment = {}) => {
  const { author, message, date, emotion } = comment;
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${message}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${date}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};
