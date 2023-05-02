import express, { Router } from "express";
import {
    genre_list,
    genre_create,
    genre_delete,
} from "../controller/GenreController";

const router: Router = express.Router();

router.get("/", genre_list);
router.post("/", genre_create);
router.delete("/:id", genre_delete);

export default router;
