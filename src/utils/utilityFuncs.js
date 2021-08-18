/* eslint-disable no-param-reassign */
export const commentCountObj = (array) => {
  const commentCount = array.reduce((tally, comment) => {
    tally[comment.episode_id] = (tally[comment.episode_id] || 0) + 1;
    return tally;
  }, {});
  return { commentCount };
};

export const createMovieData = (movies, comments) => {
  const { commentCount } = commentCountObj(comments);

  if (Array.isArray(movies)) {
    const moviesArr = [];
    movies.forEach((movie) => {
      moviesArr.push({
        title: movie.title,
        opening_crawl: movie.opening_crawl,
        episode_id: movie.episode_id,
        comments: commentCount[movie.episode_id] || 0,
        release_date: movie.release_date,
      });
    });
    return moviesArr.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  }
  const movieData = {
    title: movies.title,
    opening_crawl: movies.opening_crawl,
    episode_id: movies.episode_id,
    comments: commentCount[movies.episode_id] || 0,
    release_date: movies.release_date,
  };

  return movieData;
};

export const compareAsc = (a, b) => {
  let comparison = 0;
  if (a.name > b.name) {
    comparison = 1;
  } else if (a.name < b.name) {
    comparison = -1;
  }
  return comparison;
};

export const compareDesc = (a, b) => {
  let comparison = 0;
  if (a.name < b.name) {
    comparison = 1;
  } else if (a.name > b.name) {
    comparison = -1;
  }
  return comparison;
};

export const rearrangeCharacters = (characters, ...args) => {
  let newCharacters = [...characters];
  const [sortBy, gender, orderBy] = args;

  if (gender && (gender === 'male' || gender === 'female')) {
    newCharacters = newCharacters.filter((character) => character.gender === gender);
  }

  if (sortBy === 'height') {
    newCharacters = orderBy === 'asc' ? newCharacters.sort((a, b) => a.height - b.height) : newCharacters.sort((a, b) => b.height - a.height);
  } else {
    newCharacters = orderBy === 'asc' ? newCharacters.sort(compareAsc) : newCharacters.sort(compareDesc);
  }

  return newCharacters;
};

export const convertCmToFtAndInches = (cm) => {
  const result = `${cm * 0.3}`;

  const resultArr = result.split('.');
  const feet = resultArr[0];
  const inches = (cm * 0.39).toFixed(2);
  return `${feet}ft and ${inches}inches`;
};
