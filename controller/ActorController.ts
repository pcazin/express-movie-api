import db from "../database/database";
import { Request, Response } from "express";
import ActorRepository from "../repository/ActorRepository";

exports.actor_list = (req: Request, res: Response) => {
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

exports.actor_get = (req: Request, res: Response) => {
    new ActorRepository(db).get(req.params.id)
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

exports.actor_create = (req: Request, res: Response) => {
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

    new ActorRepository(db).create({
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

exports.actor_update = (req: Request, res: Response) => {
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

    repo.update(req.params.id, {
        contents: req.body.contents,
        done: req.body.done === "true",
    })
        .then(() => {
            repo.get(req.params.id).then((result) => {
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

exports.actor_delete = (req: Request, res: Response) => {

    new ActorRepository(db).delete(req.params.id)
        .then(() => {
            res.status(204).json({
                success: true,
            });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};
