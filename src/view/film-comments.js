import he from 'he';

export const createFilmCommentsTemplate = (comments, ids) => {
  const array = [];

  for (let i = 0; i < ids.length; i++) {
    const found = comments.find((comment) => comment.id === ids[i]);
    array.push(createFilmCommentTemplate(found));
  }

  return `
        <ul class="film-details__comments-list">
${array.join('')}
        </ul>
`;
};

export const createFilmCommentTemplate = (comment = {}) => {
  const { author, date, emotion, id } = comment;

  let message = comment.message;
  if (message === undefined) {
    message = '';
  }

  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${he.encode(message)}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${date}</span>
      <button class="film-details__comment-delete" data-id="${id}">Delete</button>
    </p>
  </div>
</li>`;
};
