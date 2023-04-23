import db from "../database/database";
import { Request, Response } from "express";
import ActorRepository from "../repository/ActorRepository";

const actor_list = (req: Request, res: Response) => {
  new ActorRepository(db)
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

const actor_get = (req: Request, res: Response) => {
  new ActorRepository(db)
    .get(Number(req.params.id))
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

const actor_create = (req: Request, res: Response) => {
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

  new ActorRepository(db)
    .create({
      contents: req.body.contents,
      done: req.body.done === "true",
    })
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

const actor_update = (req: Request, res: Response) => {
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

  const repo: ActorRepository = new ActorRepository(db);

  repo
    .update(Number(req.params.id), {
      contents: req.body.contents,
      done: req.body.done === "true",
    })
    .then(() => {
      repo.get(Number(req.params.id)).then((result) => {
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

const actor_delete = (req: Request, res: Response) => {
  new ActorRepository(db)
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

export { actor_list, actor_get, actor_create, actor_update, actor_delete };

