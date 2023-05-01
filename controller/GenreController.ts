import GenreRepository from "../repository/GenreRepository";
import { Genre } from "../types/Genre";
import { Request, Response } from "express";
import db from "../database/database";

const genre_list = (req: Request, res: Response) => {
  new GenreRepository(db)
    .list()
    .then((result) => {
      res.json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const genre_create = (req: Request, res: Response) => {
  const errors: String[] = [];
  ["contents", "done"].forEach((field) => {
    if (!req.body[field]) {
      errors.push(`Field '${field}' is missing from request body`);
    }
  });
  if (errors.length) {
    res.status(400).json({
      success: false,
      errors,
    });
    return;
  }

  const newGenre: Genre = {
    name: req.body.name,
  }

  new GenreRepository(db)
    .create(newGenre)
    .then((result) => {
      res.status(201).json({
        success: true,
        id: result,
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

const genre_delete = (req: Request, res: Response) => {
  new GenreRepository(db)
    .delete(Number(req.params.id))
    .then(() => {
      res.status(204).json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

export { genre_list, genre_create, genre_delete };

