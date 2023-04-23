import {
  film_list,
  film_get,
  film_create,
  film_update,
  film_delete,
} from "../controller/FilmController";

import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", film_list);

router.get("/:id", film_get);

router.post("/", film_create);

router.put("/:id", film_update);

router.delete("/:id", film_delete);

export default router;

// ● GET /film : retourne la liste des films, avec les informations de genre et les fiches
// acteurs associées
// ● GET /film/{id} : retourne la fiche du film portant l’ID indiquée, avec les
// informations de genre et les fiches acteurs associées
// ● POST /film : crée le film selon les informations du corps de la requête (erreur si
// les acteurs et/ou le genre n’existent pas)
// ● PUT /film/{id} : modifie le film selon les informations du corps de la requête
// (erreur si les acteurs et/ou le genre n’existent pas)
// ● DELETE /film/{id} : supprime le film
