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
