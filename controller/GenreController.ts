import GenreRepository from "../repository/GenreRepository";
import { GenrePayLoad } from "../types/Genre";
import { Request, Response } from "express";
import { genres } from "@prisma/client";

const repo: GenreRepository = new GenreRepository();

const genre_list = (_req: Request, res: Response) => {
    repo.list()
        .then((result) => {
            res.status(200).json({sucess: true, result});
        })
        .catch((err) => {
            res.status(500).json({sucess: false, error: err.message });
        });
};

const genre_create = async(req: Request, res: Response) => {

    if (!req.body["name"]) {
        res.status(400).json({success: false, error: `Field 'name' is missing from request body`});
        return;
    }

    const newGenre: GenrePayLoad = {
        name: req.body.name,
    };

    // verifier que le gnom du genre n'est pas déjà existant
    const genre: genres | Error = await repo.getByName(newGenre.name);

    if(!(genre instanceof Error)) {
        res.status(400).json({success: false, error: "Ce genre existe déjà"});
        return;
    }

    repo.create(newGenre)
        .then((result) => {
            console.log(result)
            res.status(201).json({sucess: true, result});
        })
        .catch((err) => {
            res.status(500).json({success: false, error: err.message });
        });
};

const genre_delete = async (req: Request, res: Response) => {

    const genre: genres | Error = await repo.getById(Number(req.params.id))
    
    if(genre instanceof Error) {
        res.status(404).json({
            success: false,
            error: "L'id ne correspond à aucune donnée",
        })
        return;
    }

    repo.delete(Number(req.params.id))
        .then((result) => {
            res.status(200).json({success: true, result});
        })
        .catch((err) => {
            res.status(500).json({success: false, error: err.message });
        });
};

export { genre_list, genre_create, genre_delete };
