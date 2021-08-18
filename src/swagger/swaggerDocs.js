import getMovies from './getMovies';
import getAllCharacters from './getCharacters';
import getAllComments from './getComments';
import postComment from './postComment';
import getAMovie from './getAMovie';
import schemas from './components';

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'STARWARS API',
    description: 'A Simple Api for Starwars movies',
    contact: {
      name: 'chubbystrings',
      email: 'emartinsokwor@gmail.com',
      url: 'http://chubbystrings.gihub.io/portfolio',
    },
  },
  servers: [
    {
      url: 'http://localhost:4500',
      description: 'Local server',
    },
    {
      url: 'https://starwars-api-task.herokuapp.com',
      description: 'production server',
    },
  ],
  paths: {
    '/api/v1/starwars': { ...getMovies },
    '/api/v1/starwars/{episode}': { ...getAMovie },
    '/api/v1/starwars/{episode}/characters': { ...getAllCharacters },
    '/api/v1/starwars/{episode}/comment': {
      ...getAllComments,
      ...postComment,
    },
  },
  components: {
    ...schemas,
  },
};
