import pool from '../database/dbConnect';
import swapiApi from '../services/swapi';
import Response from '../utils/response';

const responseObj = new Response();

export default {
  getAllMovies: async (req, res) => {
    try {
      if (req.query && req.query.search) {
        const { search } = req.query;
        const data = await swapiApi.searchMovie(search);

        if (data.length === 0) {
          responseObj.setError(404, 'Movie not found');
          return responseObj.send(res);
        }
        responseObj.setSuccess(200, 'successful', data);
        return responseObj.send(res);
      }

      const data = await swapiApi.getMovies();
      responseObj.setSuccess(200, 'successful', data);
      return responseObj.send(res);
    } catch (error) {
      responseObj.setError(500, error.message || 'could not fetch movies');
      return responseObj.send(res);
    }
  },

  getASingleMovie: async (req, res) => {
    try {
      const episode = +req.params.episode;
      if (!episode) {
        responseObj.setError(400, 'episode id is missing or incorrect');
        return responseObj.send(res);
      }
      const data = await swapiApi.getAMovie(episode);
      responseObj.setSuccess(200, 'successful', data);
      return responseObj.send(res);
    } catch (error) {
      if (error.message === 'Not Found') {
        responseObj.setError(404, 'Movie not found');
        return responseObj.send(res);
      }
      responseObj.setError(500, error);
      return responseObj.send(res);
    }
  },

  getAllCharactersInAMovie: async (req, res) => {
    const episode = +req.params.episode;
    if (!episode) {
      responseObj.setError(400, 'episode id is missing or incorrect');
      return responseObj.send(res);
    }

    try {
      const result = await swapiApi.getCharacters(episode);

      responseObj.setSuccess(200, 'successful', result);
      return responseObj.send(res);
    } catch (error) {
      if (error.message === 'Not Found') {
        responseObj.setError(404, 'Movie not found');
        return responseObj.send(res);
      }
      responseObj.setError(500, 'could not fetch characters');
      return responseObj.send(res);
    }
  },

  getAllCommentsInAMovie: async (req, res) => {
    const episode = +req.params.episode;
    if (!episode) {
      responseObj.setError(400, 'episode id is missing or incorrect');
      return responseObj.send(res);
    }

    const query = 'SELECT * FROM comments WHERE episode_id=$1';
    try {
      const { rows } = await pool.query(query, [episode]);

      responseObj.setSuccess(200, 'comment added successfully', rows);
      return responseObj.send(res);
    } catch (error) {
      if (error.message === 'Not Found') {
        responseObj.setError(404, 'Movie not found');
        return responseObj.send(res);
      }
      responseObj.setError(500, 'an error occurred, could not fetch comments');
      return responseObj.send(res);
    }
  },

  postComment: async (req, res) => {
    const { comment } = req.body;

    if (!comment) {
      responseObj.setError(400, 'cannot send empty comment');
      return responseObj.send(res);
    }

    const episode = +req.params.episode;
    if (!episode) {
      responseObj.setError(400, 'episode id is missing or incorrect');
      return responseObj.send(res);
    }

    const query = 'INSERT INTO comments (episode_id, comment, created_on) VALUES ($1, $2, NOW()) returning *';
    try {
      const { rows } = await pool.query(query, [episode, comment]);

      responseObj.setSuccess(201, 'comment added successfully', rows[0]);
      return responseObj.send(res);
    } catch (error) {
      if (error.message === 'Not Found') {
        responseObj.setError(404, 'Movie not found');
        return responseObj.send(res);
      }
      responseObj.setError(500, 'could not add comment');
      return responseObj.send(res);
    }
  },
};
