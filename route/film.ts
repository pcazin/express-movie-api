const filmController = require('../controllers/FilmController');

import express, { Router } from 'express';

const router = express.Router();


router.get('/', filmController.film_list);

router.get('/:id', filmController.film_get);

router.post('/', filmController.film_create);

router.put('/:id', filmController.film_update);

router.delete('/:id', filmController.film_delete);

export default router;