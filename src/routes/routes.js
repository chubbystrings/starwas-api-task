import express from 'express';
import starWarsController from '../controllers/starWarsController';
import starwarsMiddleware from '../middleware/starwarsMiddleware';

const router = express.Router();

router.get('/', starWarsController.getAllMovies);

router.get('/:episode', starwarsMiddleware.checkEpisodeId, starWarsController.getASingleMovie);

router.get('/:episode/characters', starwarsMiddleware.checkEpisodeId, starWarsController.getAllCharactersInAMovie);

router.get('/:episode/comment', starwarsMiddleware.checkEpisodeId, starWarsController.getAllCommentsInAMovie);

router.post('/:episode/comment', starwarsMiddleware.postComment, starWarsController.postComment);

export default router;
