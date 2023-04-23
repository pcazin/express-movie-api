import {
  actor_list,
  actor_get,
  actor_create,
  actor_update,
  actor_delete,
} from "../controller/ActorController";

import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", actor_list);

router.get("/:id", actor_get);

router.post("/", actor_create);

router.put("/:id", actor_update);

router.delete("/:id", actor_delete);

export default router;

// ● GET /actor : retourne la liste des acteurs
// ● GET /actor/{id} : retourne la fiche de l’acteur portant l’ID indiquée
// ● POST /actor : crée l’acteur selon les informations du corps de la requête
// ● PUT /actor/{id} : modifie l’acteur selon les informations du corps de la requête
// ● DELETE /actor/{id} : supprime l’acteur
