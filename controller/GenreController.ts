import GenreRepository from "../repository/GenreRepository";
import { GenrePayLoad } from "../types/Genre";
import { Request, Response } from "express";

const repo: GenreRepository = new GenreRepository();

const genre_list = (req: Request, res: Response) => {
    repo.list()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

const genre_create = (req: Request, res: Response) => {
    if (!req.body["name"]) {
        res.status(400).json(`Field 'name' is missing from request body`);
        return;
    }

    const newGenre: GenrePayLoad = {
        name: req.body.name,
    };

    repo.create(newGenre)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

const genre_delete = (req: Request, res: Response) => {
    repo
        .delete(Number(req.params.id))
        .then((result) => {
            res.status(204).json(result);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

export { genre_list, genre_create, genre_delete };
