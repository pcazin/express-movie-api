import express, { Router } from 'express';
import { genre_list, genre_create, genre_delete } from '../controller/GenreController';

const router: Router = express.Router();

router.get('/', genre_list);
router.post('/', genre_create);
router.delete('/:id', genre_delete);

export default router;

// ● GET /genre : retourne la liste des genres
// ● POST /genre : crée le genre selon les informations du corps de la requête
// ● DELETE /genre/{id} : supprime le genre (sauf si utilisé dans un ou plusieurs
// films)