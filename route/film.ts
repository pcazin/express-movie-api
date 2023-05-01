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


