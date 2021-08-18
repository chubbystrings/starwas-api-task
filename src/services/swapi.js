/* eslint-disable no-param-reassign */
import axios from 'axios';
import pool from '../database/dbConnect';
import { createMovieData } from '../utils/utilityFuncs';

const URL = 'https://swapi.dev/api/films';

export default {
  getMovies: async () => {
    try {
      const { rows } = await pool.query('SELECT * FROM comments');
      const result = await axios.get(URL);
      const movies = createMovieData(result.data.results, rows);
      return movies;
    } catch (error) {
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
    } catch (error) {
      if (error.response.status === 404) {
        throw Error('Not Found');
      }
      throw Error('could not fetch data');
    }
  },

  getAMovie: async (id) => {
    try {
      const result = await axios.get(`${URL}/${id}`);
      const { rows } = await pool.query('SELECT * FROM comments WHERE episode_id = $1', [id]);
      const movie = createMovieData(result.data, rows);
      return movie;
    } catch (error) {
      if (error.response.status === 404) {
        throw Error('Not Found');
      }
      throw Error('could not fetch data');
    }
  },

  searchMovie: async (searchQuery) => {
    try {
      const result = await axios.get(`${URL}/?search=${searchQuery}`);
      const { rows } = await pool.query('SELECT * FROM comments');
      const movies = createMovieData(result.data.results, rows);
      return movies;
    } catch (error) {
      if (error.response.status === 404) {
        throw Error('Not Found');
      }
      throw Error('could not fetch data');
    }
  },
};
