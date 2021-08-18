import express from 'express';
import starWarsController from '../controllers/starWarsController';

const router = express.Router();

router.get('/', starWarsController.getAllMovies);

router.get('/:episode', starWarsController.getASingleMovie);

router.get('/:episode/characters', starWarsController.getAllCharactersInAMovie);

router.get('/:episode/comment', starWarsController.getAllCommentsInAMovie);

router.post('/:episode/comment', starWarsController.postComment);

export default router;
