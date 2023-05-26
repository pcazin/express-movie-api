import crypto from 'crypto';
import ActorRepository from "../repository/ActorRepository";
import { ActorPayload } from "../types/Actor";
import { Request, Response } from "express";
import { actors } from '@prisma/client';
import getMd5Hash from '../helper/hash';

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
            res.set('ETag', getMd5Hash(result))
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
            res.set('ETag', getMd5Hash(result))
            res.status(201).json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

const update_actor = async (req: Request, res: Response) => {

    // je verifie si le ETag est dans le header de la requete.
    if(req.get("ETag") == undefined) {
        res.status(401).json({
            success: false,
            message: "No ETag found on request headers.",
        })
        return;
    }

    // je verifie si le ETag correspond 
    const oldActor: actors | Error = await repo.get(Number(req.params.id))

    if(oldActor instanceof Error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
        })
        return;
    }

    const oldActorhash: string = getMd5Hash(oldActor);

    if(oldActorhash !== req.get("ETag")) {
        res.status(401).json({
            success: false,
            message: "Invalid ETag",
        })
        return;
    }

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
        first_name: req.body["first_name"],
        last_name: req.body["last_name"],
        date_of_birth: new Date(req.body["date_of_birth"]),
        date_of_death: new Date(req.body["date_of_death"]),
    };

    repo.update(updatedActor)
        .then((result) => {
            res.json({
                success: true,
                data: result
            });
            return;
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
