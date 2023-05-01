import db from "../database/database";
import { Request, Response } from "express";
import FilmRepository from "../repository/FilmRepository";

const film_list = (req: Request, res: Response) => {
  new FilmRepository(db)
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

const film_get = (req: Request, res: Response) => {
  new FilmRepository(db)
    .get()
    .then((result) => {
      res.json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(404).json({ error: err.message });
    });
};

const film_create = (req: Request, res: Response) => {
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

  new FilmRepository(db)
    .create()
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

const film_update = (req: Request, res: Response) => {
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

  const repo: FilmRepository = new FilmRepository(db);

  repo
    .update()
    .then(() => {
      repo.get().then((result) => {
        res.json({
          success: true,
          data: result,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

const film_delete = (req: Request, res: Response) => {
  const repo = new FilmRepository(db);

  repo
    .delete()
    .then(() => {
      res.status(204).json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

export { film_list, film_get, film_create, film_update, film_delete };

// ● GET /film : retourne la liste des films, avec les informations de genre et les fiches
// acteurs associées
// ● GET /film/{id} : retourne la fiche du film portant l’ID indiquée, avec les
// informations de genre et les fiches acteurs associées
// ● POST /film : crée le film selon les informations du corps de la requête (erreur si
// les acteurs et/ou le genre n’existent pas)
// ● PUT /film/{id} : modifie le film selon les informations du corps de la requête
// (erreur si les acteurs et/ou le genre n’existent pas)
// ● DELETE /film/{id} : supprime le film
