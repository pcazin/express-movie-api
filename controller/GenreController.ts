import GenreRepository from "../repository/GenreRepository";
import { GenrePayLoad } from "../types/Genre";
import { Request, Response } from "express";
import { genres } from "@prisma/client";

const repo: GenreRepository = new GenreRepository();

const genre_list = (_req: Request, res: Response) => {
    repo.list()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

const genre_create = async(req: Request, res: Response) => {

    if (!req.body["name"]) {
        res.status(500).json(`Field 'name' is missing from request body`);
        return;
    }

    const newGenre: GenrePayLoad = {
        name: req.body.name,
    };

    // verifier que le gnom du genre n'est pas déjà existant
    const genre: genres | Error = await repo.getByName(newGenre.name);

    if(!(genre instanceof Error)) {
        res.status(500).json("Ce genre existe déjà");
        return;
    }

    repo.create(newGenre)
        .then((result) => {
            console.log(result)
            res.status(201).json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

const genre_delete = (req: Request, res: Response) => {
    repo.delete(Number(req.params.id))
        .then((result) => {
            res.status(204).json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

export { genre_list, genre_create, genre_delete };
