import db from "../database/database";
import { Request, Response } from "express";
import ActorRepository from "../repository/ActorRepository";
import { Actor } from "../types/repository/Actor";

const get_actor_list = (req: Request, res: Response) => {
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

const get_actor = (req: Request, res: Response) => {
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

const create_actor = (req: Request, res: Response) => {

  const errors: String[] = [];

  ["first_name", "last_name", "date_of_birth", "date_of_death"].forEach((field) => {
    if (!req.body[field] && field != "date_of_death") {
      errors.push(`Field '${field}' is missing from request body`);
    }
  });

  if (errors.length) {
    res.status(500).json({
      success: false,
      errors,
    });
    return;
  }

  const newActor: Actor =  {
    first_name: req.body["first_name"],
    last_name: req.body["last_name"],
    date_of_birth: new Date(req.body["date_of_birth"]),
    date_of_death: req.body["date_of_death"] ? new Date(req.body["date_of_death"]) : null
  }

  new ActorRepository(db)
    .create(newActor)
    .then((result) => {
      res.status(201).json({
        success: true,
        id: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const update_actor = (req: Request, res: Response) => {
  const errors: String[] = [];
  ["first_name", "last_name", "date_of_birth", "date_of_death"].forEach((field) => {
    if (!req.body[field] && field != "date_of_death") {
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

  const updatedActor: Actor =  {
    first_name: req.params.first_name,
    last_name: req.params.last_name,
    date_of_birth: new Date(req.params.date_of_birth),
    date_of_death: new Date(req.params.date_of_death)
  }

  const repo: ActorRepository = new ActorRepository(db);

  repo
    .update(updatedActor)
    .then((result) => {
      res.json({
        success: result
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const delete_actor = (req: Request, res: Response) => {
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

export { get_actor_list, get_actor, create_actor, update_actor, delete_actor };

