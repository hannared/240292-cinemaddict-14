import dayjs from 'dayjs';
import he from 'he';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const createFilmCommentsTemplate = (comments, ids, deletingComment) => {
  const array = [];

  for (let i = 0; i < ids.length; i++) {
    const found = comments.find((comment) => comment.id === ids[i]);
    if (found !== undefined) {
      array.push(
        createFilmCommentTemplate(found, deletingComment === found.id),
      );
    }
  }

  return `
    <ul class="film-details__comments-list">
      ${array.join('')}
    </ul>
  `;
};

export const createFilmCommentTemplate = (comment = {}, isDeleting) => {
  const { author, date, emotion, id } = comment;
  let message = comment.comment;
  if (message === undefined) {
    message = '';
  }
  const formattedDate = dayjs(date).fromNow();
  const deleting = isDeleting ? 'Deleting...' : 'Delete';

  return `<li class="film-details__comment comment-${id}">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${he.encode(message)}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${formattedDate}</span>
      <button class="film-details__comment-delete" data-id="${id}">${deleting}</button>
    </p>
  </div>
</li>`;
};
