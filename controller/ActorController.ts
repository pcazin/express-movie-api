import ActorRepository from "../repository/ActorRepository";
import { ActorPayload } from "../types/Actor";
import { Request, Response } from "express";

const repo: ActorRepository = new ActorRepository();

const get_actor_list = (_req: Request, res: Response) => {

    repo.list()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send({ error: err.message });
        });
};

const get_actor = (req: Request, res: Response) => {
    repo.get(Number(req.params.id))
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send({ error: err.message });
        });
};

const create_actor = (req: Request, res: Response) => {

    console.log(req.body);

    const errors: String[] = [];

    ["first_name", "last_name", "date_of_birth", "date_of_death"].forEach(
        (field) => {
            if (!req.body[field] && field != "date_of_death") {
                errors.push(`Field '${field}' is missing from request body`);
            }
        }
    );

    if (errors.length) {
        res.status(401).json(errors);
        return;
    }

    const newActor: ActorPayload = {
        first_name: req.body["first_name"],
        last_name: req.body["last_name"],
        date_of_birth: new Date(req.body["date_of_birth"]),
        date_of_death: req.body["date_of_death"]
            ? new Date(req.body["date_of_death"])
            : null,
    };

    repo.create(newActor)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

const update_actor = (req: Request, res: Response) => {
    const errors: String[] = [];
    ["first_name", "last_name", "date_of_birth", "date_of_death"].forEach(
        (field) => {
            if (!req.body[field] && field != "date_of_death") {
                errors.push(`Field '${field}' is missing from request body`);
            }
        }
    );
    if (errors.length) {
        res.status(400).json({
            success: false,
            errors,
        });
        return;
    }

    const updatedActor: ActorPayload = {
        id: Number(req.params.id),
        first_name: req.params.first_name,
        last_name: req.params.last_name,
        date_of_birth: new Date(req.params.date_of_birth),
        date_of_death: new Date(req.params.date_of_death),
    };

    repo.update(updatedActor)
        .then((result) => {
            res.json({
                success: result,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

const delete_actor = (req: Request, res: Response) => {
    repo.delete(Number(req.params.id))
        .then(() => {
            res.status(204).json({
                success: true,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

export { get_actor_list, get_actor, create_actor, update_actor, delete_actor };
