/* eslint-disable no-param-reassign */
import axios from 'axios';
import pool from '../database/dbConnect';

const URL = 'https://swapi.dev/api/films';

export default {
  getMovies: async () => {
    try {
      const { rows } = await pool.query('SELECT * FROM comments');

      const commentCountObj = rows.reduce((tally, comment) => {
        tally[comment.episode_id] = (tally[comment.episode_id] || 0) + 1;
        return tally;
      }, {});

      const result = await axios.get(URL);
      const movies = [];
      result.data.results.forEach((movie) => {
        movies.push({
          title: movie.title,
          opening_crawl: movie.opening_crawl,
          episode_id: movie.episode_id,
          comments: commentCountObj[movie.episode_id] || 0,
          release_date: movie.release_date,
        });
      });

      return movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } catch (e) {
      throw Error('could not fetch data');
    }
  },

  getCharacters: async (id) => {
    try {
      const result = await axios.get(`${URL}/${id}`);
      const data = await Promise.all(result.data.characters.map(async (character) => {
        const res = await axios.get(character);
        return res.data;
      }));
      return { characters: data, title: result.data.title };
    } catch (e) {
      throw Error('could not fetch data');
    }
  },
};
