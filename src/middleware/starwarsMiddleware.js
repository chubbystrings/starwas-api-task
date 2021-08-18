import Response from '../utils/response';

const responseObj = new Response();
export default {
  postComment: (req, res, next) => {
    const { comment } = req.body;

    if (!comment) {
      responseObj.setError(400, 'cannot send empty comment');
      return responseObj.send(res);
    }

    if (comment.length > 500) {
      responseObj.setError(400, 'commment should not exceed 500 characters');
      return responseObj.send(res);
    }

    const episode = +req.params.episode;
    if (!episode) {
      responseObj.setError(400, 'episode id is missing or incorrect');
      return responseObj.send(res);
    }

    return next();
  },

  checkEpisodeId: (req, res, next) => {
    const episode = +req.params.episode;
    if (!episode) {
      responseObj.setError(400, 'episode id is missing or incorrect');
      return responseObj.send(res);
    }

    return next();
  },
};
