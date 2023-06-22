import crypto from "crypto";
import { Request, Response } from "express";
import FilmRepository from "../repository/FilmRepository";
import { FilmPayload } from "../types/Film";
import { genres, films, actors } from "@prisma/client";
import GenreRepository from "../repository/GenreRepository";
import getMd5Hash from "../helper/hash";
import ActorRepository from "../repository/ActorRepository";

const repo: FilmRepository = new FilmRepository();
const repoGenre: GenreRepository = new GenreRepository();
const repoActor: ActorRepository = new ActorRepository();

const film_list = (_req: Request, res: Response) => {
    repo.list()
        .then((result) => {
            res.status(200).json({ success: true, result });
        })
        .catch((err) => {
            res.status(500).json({ success: false, error: err.message });
        });
};

const film_get = (req: Request, res: Response) => {
    repo.getById(Number(req.params.id))
        .then((result) => {
            const resultString = JSON.stringify(result);
            const hash = crypto
                .createHash("md5")
                .update(resultString)
                .digest("hex");
            res.set("ETag", hash);
            res.status(200).json({ success: true, result });
        })
        .catch((err) => {
            res.status(404).json({ sucess: false, error: err.message });
        });
};

const film_create = async (req: Request, res: Response) => {
    const errors: String[] = [];
    ["name", "synopsis", "release_year", "genre_id", "actors_id"].forEach((field) => {
        if (!req.body[field]) {
            errors.push(`Field '${field}' is missing from request body`);
        }
    });

    if (errors.length) {
        res.status(400).json({ sucess: false, errors });
        return;
    }

    const newFilm: FilmPayload = {
        name: req.body["name"],
        synopsis: req.body["synopsis"],
        release_year: Number(req.body["release_year"]),
        genre_id: Number(req.body["genre_id"]),
        actors_id: req.body["actors_id"],
    };

    // verifier que le genre existe
    const genre: Error | genres = await repoGenre.getById(newFilm.genre_id);

    if (genre instanceof Error) {
        res.status(404).json({ sucess: false, error: "L'id fournis pour le genre n'existe pas." });
        return;
    }

    // verifier que le nom n'est pas déjà utiliser pour un autre film
    const film: films | Error = await repo.getByName(newFilm.name);

    if (!(film instanceof Error)) {
        res.status(400).json({ sucess: false, error: "Un film possède déjà ce nom" });
        return;
    }

    // verifier que les actors existent
    for (const id of newFilm.actors_id) {
        const actor: Error | actors = await repoActor.getById(id);

        if (actor instanceof Error) {
            res.status(404).json({ sucess: false, error: `L'id ${id} fournis pour l'actor n'existe pas.` });
            return;
        }
    };

    repo.create(newFilm)
        .then((result) => {
            res.set("ETag", getMd5Hash(result));
            res.status(201).json({ sucess: true, result });
        })
        .catch((err) => {
            res.status(500).json({ sucess: false, error: err.message });
        });
};

const film_update = async (req: Request, res: Response) => {


    // je verifie si le ETag est dans le header de la requete.
    if (req.get("ETag") == undefined) {
        res.status(400).json({
            success: false,
            error: "No ETag found on request headers.",
        })
        return;
    }

    // je verifie si le ETag correspond 
    const oldFilm: films | Error = await repo.getById(Number(req.params.id))

    if (oldFilm instanceof Error) {
        res.status(404).json({
            success: false,
            error: "L'id ne correspond à aucune donnée",
        })
        return;
    }

    const oldActorhash: string = getMd5Hash(oldFilm);

    if (oldActorhash !== req.get("ETag")) {
        res.status(401).json({
            success: false,
            error: "Invalid ETag",
        })
        return;
    }

    const errors: String[] = [];
    ["name", "synopsis", "release_year", "genre_id", "actors_id"].forEach((field) => {
        if (!req.body[field]) {
            errors.push(`Field '${field}' is missing from request body`);
        }
    });
    if (errors.length) {
        res.status(400).json({ sucess: false, errors });
        return;
    }

    const updatedFilm: FilmPayload = {
        id: Number(req.params.id),
        name: req.body["name"],
        synopsis: req.body["synopsis"],
        release_year: Number(req.body["release_year"]),
        genre_id: Number(req.body["genre_id"]),
        actors_id: req.body["actors_id"],
    };

    // verifier que le genre existe
    const genre: Error | genres = await repoGenre.getById(updatedFilm.genre_id);

    if (genre instanceof Error) {
        res.status(404).json({ sucess: false, error: "L'id fournis pour le genre n'existe pas." });
        return;
    }

    // verifier que le nom n'est pas déjà utiliser pour un autre film
    const film: Error | films = await repo.getByName(updatedFilm.name);

    if (!(film instanceof Error)) {
        if (film.id != updatedFilm.id) {
            res.status(400).json({ sucess: false, error: "Un film avec la même nom existe déjà" });
            return;
        }
    }

    // verifier que les actors existent
    for (const id of updatedFilm.actors_id) {
        const actor: Error | actors = await repoActor.getById(id);

        if (actor instanceof Error) {
            res.status(404).json({ sucess: false, error: `L'id ${id} fournis pour l'actor n'existe pas.` });
            return;
        }
    };

    repo.update(updatedFilm)
        .then((result) => {
            res.set("ETag", getMd5Hash(result));
            res.status(200).json({ sucess: true, data: result });
        })
        .catch((err) => {
            res.status(500).json({ sucess: false, error: err.message });
        });
};

const film_delete = async (req: Request, res: Response) => {

    const film: films | Error = await repo.getById(Number(req.params.id))

    if (film instanceof Error) {
        res.status(404).json({
            success: false,
            error: "L'id ne correspond à aucune donnée",
        })
        return;
    }

    repo.delete(Number(req.params.id))
        .then(() => {
            res.status(200).json({
                success: true,
            });
        })
        .catch((err) => {
            res.status(500).json({ sucess: false, error: err.message });
        });
};

export { film_list, film_get, film_create, film_update, film_delete };
