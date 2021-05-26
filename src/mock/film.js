import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getRandomInteger, getRandomFloat } from '../utils.js';

dayjs.extend(relativeTime);
dayjs.extend(dayjsRandom);

const titles = [
  'Made for Each Other',
  'Popeye meets Syndbad',
  'Sagerbrush Trail',
  'Santa claus conquers the martians',
  'The dance of life',
  'The great Flamarion',
  'The Man with The Golden Arm',
];
const genres = [
  'Drama',
  'Adventure',
  'Comedy',
  'Animation',
  'Family',
  'Sci-Fi',
  'Thriller',
  'Horror',
  'Action',
];

const emotions = ['angry.png', 'puke.png', 'sleeping.png', 'smile.png'];

const posters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];

const alternativeTitles = [
  'New I new Me',
  'When the Sun Goes Down',
  'After the Dawn',
  'Wake me Up When September Ends',
  'In the Begginig',
  'Only We',
  'During the Winter',
];

const directors = [
  'Tom Ford',
  'Kristofer Nolan',
  'Stiven Spilberg',
  'Martin Scorseze',
  'Stenly Kubric',
  'Alfred Hichkok',
];

const actors = [
  'Penelopa Kruz',
  'Havier Bardem',
  'Benisio Del Torro',
  'Victoria Abril',
  'Elsa Pataki',
  'Elena Anaya',
  'Colombo',
  'Montserat',
  'Maria Valverde',
  'Eduardo Noriego',
];

const writers = [
  'Penelopa Kruz',
  'Havier Bardem',
  'Benisio Del Torro',
  'Victoria Abril',
  'Elsa Pataki',
  'Elena Anaya',
  'Colombo',
  'Montserat',
  'Maria Valverde',
  'Eduardo Noriego',
];

const authors = [
  'Nick Wane',
  'Anna Cuper',
  'John Doe',
  'Tim Timych',
  'Zack Den',
  'Andy Travel',
];

const messages = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'Never again!',
  'Super',
];

const countries = [
  'USA',
  'Belarus',
  'Spain',
  'Mexico',
  'Iceland',
  'Switzerland',
];

const generateTitle = () => {
  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateGenre = () => {
  const randomGenres = getRandomInteger(1, 3);
  const array = [];

  for (let i = 0; i < randomGenres; i++) {
    const randomIndex = getRandomInteger(0, genres.length - 1);
    array.push(genres[randomIndex]);
  }
  return array;
};

const generateEmotion = () => {
  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generatePoster = () => {
  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateDescription = () => {
  const randomDescription = getRandomInteger(1, 3);
  const array = [];
  for (let i = 0; i < randomDescription; i++) {
    const randomIndex = getRandomInteger(0, descriptions.length - 1);
    array.push(descriptions[randomIndex]);
  }
  return array.join(' ');
};

const generateAlternativeTitle = () => {
  const randomIndex = getRandomInteger(0, alternativeTitles.length - 1);

  return alternativeTitles[randomIndex];
};

const generateDirector = () => {
  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateActors = () => {
  const randomActors = getRandomInteger(1, 4);
  const array = [];
  for (let i = 0; i < randomActors; i++) {
    const randomIndex = getRandomInteger(0, actors.length - 1);
    array.push(actors[randomIndex]);
  }
  return array.join(', ');
};

const generateWriters = () => {
  const randomWriters = getRandomInteger(1, 2);
  const array = [];
  for (let i = 0; i < randomWriters; i++) {
    const randomIndex = getRandomInteger(0, writers.length - 1);
    array.push(writers[randomIndex]);
  }
  return array.join(', ');
};

const generateAuthor = () => {
  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateMessages = () => {
  const randomIndex = getRandomInteger(0, messages.length - 1);

  return messages[randomIndex];
};

const generateCountry = () => {
  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateComment = (i) => {
  const date = dayjs.between('2021-01-01', '2021-04-05');
  return {
    id: i,
    author: generateAuthor(),
    comment: generateMessages(),
    date: dayjs(date).fromNow(),
    emotion: generateEmotion(),
  };
};

const generateComments = () => {
  const comments = [];

  for (let i = 0; i < getRandomInteger(1, 8); i++) {
    const comment = generateComment(i);
    comments.push(comment);
  }

  return comments;
};

const generateFilm = (i) => {
  const releaseDate = dayjs.between('2020-06-10', '2030-03-02');

  const generateAlreadyWatched = () => {
    const alreadyWatched = Boolean(getRandomInteger(0, 1));

    let watchingDate = '';

    if (alreadyWatched) {
      const today = new Date();
      const from = dayjs(today).subtract(30, 'day');
      const to = today;
      watchingDate = dayjs.between(from, to);
    }

    return { alreadyWatched, watchingDate };
  };

  const watched = generateAlreadyWatched();

  const hours = getRandomInteger(1, 2);
  const minutes = getRandomInteger(10, 60);

  const commentsList = generateComments();

  return {
    id: i,
    poster: `/images/posters/${generatePoster()}`,
    title: generateTitle(),
    alternativeTitle: generateAlternativeTitle(),
    rating: getRandomFloat(1, 9),
    ageRating: '18+',
    year: getRandomInteger(1900, 2021),
    hours: hours,
    minutes: minutes,
    duration: `${hours}h ${minutes}m`,
    genre: generateGenre(),
    description: generateDescription(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    release: {
      date: releaseDate,
      country: generateCountry(),
    },

    isFavorite: Boolean(getRandomInteger(0, 1)),
    isWatchList: Boolean(getRandomInteger(0, 1)),
    isAlreadyWatched: watched.alreadyWatched,
    watchingDate: watched.watchingDate,
    comments: commentsList.map((element) => {
      return element.id;
    }),
    commentsList: commentsList,
  };
};

export const generateFilms = (count) => {
  const films = [];

  for (let i = 0; i < count; i++) {
    const film = generateFilm(i);
    films.push(film);
  }

  return films;
};
