import express, { Router } from 'express';
const genreController = require('../controllers/GenreController');

const router = express.Router();

router.get('/', genreController.genre_list);
router.post('/', genreController.genre_create);
router.delete('/:id', genreController.genre_delete);

export default router;