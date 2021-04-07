const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (a = 0, b = 1) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return (lower + Math.random() * (upper - lower + 1)).toFixed(1);
};

const generateTitle = () => {
  const titles = [
    'Made for Each Other',
    'Popeye meets Syndbad',
    'Sagerbrush Trail',
    'Santa claus conquers the martians',
    'The dance of life',
    'The great Flamarion',
    'The Man with The Golden Arm',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateGenre = () => {
  const genres = ['Musical', 'History', 'Thriller', 'Drama', 'Melodrama'];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

const generateEmotion = () => {
  const emotions = ['smile', 'sleeping', 'puke', 'angry'];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.png',
    'santa-claus-conquers-the-martians.png',
    'the-dance-of-life.png',
    'the-great-flamarion.png',
    'the-man-with-the-golden-arm',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateDescription = () => {
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
  const randomDescription = getRandomInteger(1, 3);
  const array = [];
  for (let i = 0; i < randomDescription; i++) {
    const randomIndex = getRandomInteger(0, descriptions.length - 1);
    array.push(descriptions[randomIndex]);
  }
  return array.join(' ');
};

const generateAlternativeTitle = () => {
  const alternativeTitles = [
    'New I new Me',
    'When the Sun Goes Down',
    'After the Dawn',
    'Wake me Up When September Ends',
    'In the Begginig',
    'Only We',
    'During the Winter',
  ];

  const randomIndex = getRandomInteger(0, alternativeTitles.length - 1);

  return alternativeTitles[randomIndex];
};

const generateDirector = () => {
  const directors = [
    'Tom Ford',
    'Kristofer Nolan',
    'Stiven Spilberg',
    'Martin Scorseze',
    'Stenly Kubric',
    'Alfred Hichkok',
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateActors = () => {
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
  const randomActors = getRandomInteger(1, 4);
  const array = [];
  for (let i = 0; i < randomActors; i++) {
    const randomIndex = getRandomInteger(0, actors.length - 1);
    array.push(actors[randomIndex]);
  }
  return array.join(' ');
};

const generateWriters = () => {
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
  const randomWriters = getRandomInteger(1, 2);
  const array = [];
  for (let i = 0; i < randomWriters; i++) {
    const randomIndex = getRandomInteger(0, writers.length - 1);
    array.push(writers[randomIndex]);
  }
  return array.join(' ');
};

const generateComment = (i) => {
  return {
    id: i,
    author: 1,
    message: 1,
    date: '2019-05-11T16:12:32.554Z',
    emotion: generateEmotion(),
  };
};

const generateComments = () => {
  const comments = [];

  for (let i = 0; i < 10; i++) {
    const comment = generateComment(i);
    comments.push(comment);
  }

  return comments;
};

const generateFilm = (i) => {
  return {
    id: i,
    poster: `/images/posters/${generatePoster()}`,
    title: generateTitle(),
    alternativeTitle: generateAlternativeTitle(),
    rating: getRandomFloat(1, 9),
    age_rating: 0,
    year: getRandomInteger(1900, 2021),
    duration: 1,
    genre: generateGenre(),
    description: generateDescription(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    release: {
      date: '2019-05-11T00:00:00.000Z',
      release_country: 'Finland',
    },
    runtime: 77,
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false,
    },
    comments: generateComments(),
  };
};

export const generateFilms = () => {
  const films = [];

  for (let i = 0; i < 26; i++) {
    const film = generateFilm(i);
    films.push(film);
  }

  return films;
};

/*
{
  "id": "0",
  "comments": [
    $Comment.id$, $Comment.id$
  ],
  "film_info": {
    "title": "A Little Pony Without The Carpet",
    "alternative_title": "Laziness Who Sold Themselves",
    "total_rating": 5.3,
    "poster": "images/posters/blue-blazes.jpg",
    "age_rating": 0,
    "director": "Tom Ford",
    "writers": [
      "Takeshi Kitano"
    ],
    "actors": [
      "Morgan Freeman"
    ],
    "release": {
      "date": "2019-05-11T00:00:00.000Z",
      "release_country": "Finland"
    },
    "runtime": 77,
    "genre": [
      "Comedy"
    ],
    "description": "Oscar-winning film, a war drama about two young people, from the creators of timeless classic \"Nu, Pogodi!\" and \"Alice in Wonderland\", with the best fight scenes since Bruce Lee."
  },
  "user_details": {
    "watchlist": false,
    "already_watched": true,
    "watching_date": "2019-04-12T16:12:32.554Z",
    "favorite": false
  }
}
*/