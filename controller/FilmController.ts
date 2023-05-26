import crypto from 'crypto';
import { Request, Response } from "express";
import FilmRepository from "../repository/FilmRepository";
import { FilmPayload } from "../types/Film";
import { genres } from "@prisma/client";
import GenreRepository from '../repository/GenreRepository';

const repo: FilmRepository = new FilmRepository();
const repoGenre : GenreRepository = new GenreRepository();

const film_list = (_req: Request, res: Response) => {
    repo.list()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

const film_get = (req: Request, res: Response) => {
    repo.get(Number(req.params.id))
        .then((result) => {
            const resultString = JSON.stringify(result)
            const hash = crypto.createHash('md5').update(resultString).digest("hex");
            res.set('ETag', hash)
            res.json(result);
        })
        .catch((err) => {
            res.status(404).json({ error: err.message });
        });
};

const film_create = async (req: Request, res: Response) => {
    const errors: String[] = [];
    ["name", "synopsis", "release_year", "genre_id"].forEach((field) => {
        if (!req.body[field]) {
            errors.push(`Field '${field}' is missing from request body`);
        }
    });

    if (errors.length) {
        res.status(400).json(errors);
        return;
    }

    const newFilm: FilmPayload = {
        name: req.body["name"],
        synopsis: req.body["synopsis"],
        release_year: Number(req.body["release_year"]),
        genre_id: Number(req.body["genre_id"]),
    };

    // verifier que le genre existe
    const genre: Error | genres = await repoGenre.get(newFilm.genre_id);

    if(genre instanceof Error) {
        res.status(400).json("L'id fournis pour le genre n'existe pas.");
        return;
    }

    repo.create(newFilm)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

const film_update = (req: Request, res: Response) => {
    const errors: String[] = [];
    ["name", "synopsis", "release_year", "genre_id"].forEach((field) => {
        if (!req.body[field]) {
            errors.push(`Field '${field}' is missing from request body`);
        }
    });
    if (errors.length) {
        res.status(400).json(errors);
        return;
    }

    const updatedFilm: FilmPayload = {
        id: Number(req.params.id),
        name: req.body["name"],
        synopsis: req.body["synopsis"],
        release_year: Number(req.body["release_year"]),
        genre_id: Number(req.body["genre_id"]),
    };

    repo.update(updatedFilm)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

const film_delete = (req: Request, res: Response) => {
    repo.delete(Number(req.params.id))
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


