/* eslint-disable no-undef */
import Model from './index';

beforeEach(() => {
  fetch.resetMocks();
});

test('yandex translate api call', () => {
  fetch.mockResponseOnce(JSON.stringify(
    {
      code: 200,
      lang: 'ru-en',
      text: [
        "the poet's dream",
      ],
    },
  ));
  const model = new Model();
  return model.getTranslation('мечта поэта').then((res) => expect(res).toBe("the poet's dream"));
});

const movieInfo = {
  Title: 'Star Trek Into Darkness',
  Year: '2013',
  Rated: 'PG-13',
  Released: '16 May 2013',
  Runtime: '132 min',
  Genre: 'Action, Adventure, Sci-Fi',
  Director: 'J.J. Abrams',
  Writer: 'Roberto Orci, Alex Kurtzman, Damon Lindelof, Gene Roddenberry (television series "Star Trek")',
  Actors: 'Chris Pine, Zachary Quinto, Zoe Saldana, Karl Urban',
  Plot: 'After the crew of the Enterprise find an unstoppable force of terror from within their own organization, Captain Kirk leads a manhunt to a war-zone world to capture a one-man weapon of mass destruction.',
  Language: 'English, Klingon',
  Country: 'USA',
  Awards: 'Nominated for 1 Oscar. Another 7 wins & 56 nominations.',
  Poster: 'https://m.media-amazon.com/images/M/MV5BMTk2NzczOTgxNF5BMl5BanBnXkFtZTcwODQ5ODczOQ@@._V1_SX300.jpg',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '7.7/10',
    },
    {
      Source: 'Rotten Tomatoes',
      Value: '84%',
    },
    {
      Source: 'Metacritic',
      Value: '72/100',
    },
  ],
  Metascore: '72',
  imdbRating: '7.7',
  imdbVotes: '454,690',
  imdbID: 'tt1408101',
  Type: 'movie',
  DVD: '10 Sep 2013',
  BoxOffice: '$228,756,232',
  Production: 'Paramount',
  Website: 'N/A',
  Response: 'True',
};

const movieResult = {
  id: 'tt1408101',
  title: 'Star Trek Into Darkness',
  year: '2013',
  image: 'https://m.media-amazon.com/images/M/MV5BMTk2NzczOTgxNF5BMl5BanBnXkFtZTcwODQ5ODczOQ@@._V1_SX300.jpg',
  imdbRating: '7.7',
};

test('imbd film api call', () => {
  fetch.mockResponses(
    [
      JSON.stringify(movieInfo),
    ],
    [
      JSON.stringify('good url'),
      { status: 200 },
    ],
  );
  const model = new Model();
  return model.getInfo('tt1408101').then((res) => expect(res).toStrictEqual(movieResult));
});

test('imbd film api call with dead image', () => {
  fetch.mockResponses(
    [
      JSON.stringify(movieInfo),
    ],
    [
      JSON.stringify('no url'),
      { status: 404 },
    ],
  );
  const model = new Model();
  movieResult.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhLinI3xZpIuFviNZcJ3X1qonvcA0rHcLhY57qgBAYwkNbQmgL&usqp=CAU';
  return model.getInfo('tt1408101').then((res) => expect(res).toStrictEqual(movieResult));
});

test('imbd film api call without poster', () => {
  movieInfo.Poster = 'N/A';
  fetch.mockResponseOnce(JSON.stringify(movieInfo));
  const model = new Model();
  return model.getInfo('tt1408101').then((res) => expect(res).toStrictEqual(movieResult));
});
