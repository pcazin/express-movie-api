import ActorRepository from "../repository/ActorRepository";
import { ActorPayload } from "../types/Actor";
import { Request, Response } from "express";
import { actors } from '@prisma/client';
import getMd5Hash from '../helper/hash';


const repo: ActorRepository = new ActorRepository();

const get_actor_list = (_req: Request, res: Response) => {
    repo.list()
        .then((result) => {
            res.status(200).json({success: true, result});
        })
        .catch((err) => {
            res.status(500).json({success: false, error: err.message });
        });
};

const get_actor = (req: Request, res: Response) => {
    repo.getById(Number(req.params.id))
        .then((result) => {
            res.set('ETag', getMd5Hash(result))
            res.status(200).json({success: true, result});
        })
        .catch((err) => {
            res.status(404).json({success: false, error: err.message });
        });
};

const create_actor = async (req: Request, res: Response) => {

    const errors: String[] = [];

    ["first_name", "last_name", "date_of_birth", "date_of_death"].forEach(
        (field) => {
            if (!req.body[field] && field != "date_of_death") {
                errors.push(`Field '${field}' is missing from request body`);
            }
        }
    );

    if (errors.length) {
        res.status(400).json({success: false, errors});
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

    if(newActor.date_of_death != null && newActor.date_of_birth >= newActor.date_of_death){
        res.status(400).json({success: false, error: "La date de décès est inférieure à la date de naissance"});
        return
    }

    //Vérifier qu'un acteur ne possède pas déjà ce nom et ce prénom
    const actor: actors | Error = await repo.getByName(
        newActor.first_name,
        newActor.last_name
    );

    if (!(actor instanceof Error)) {
        res.status(400).json({success: false, error: "Cet acteur existe déjà"});
        return;
    }

    repo.create(newActor)
        .then((result) => {
            res.set('ETag', getMd5Hash(result))
            res.status(201).json({success: true, result});
        })
        .catch((err) => {
            res.status(500).json({success: false, error: err.message });
        });
};

const update_actor = async (req: Request, res: Response) => {

    // je verifie si le ETag est dans le header de la requete.
    if(req.get("if-match") == undefined) {
        res.status(400).json({
            success: false,
            error: "No ETag found on request headers.",
        })
        return;
    }

    // je verifie si le ETag correspond 
    const oldActor: actors | Error = await repo.getById(Number(req.params.id))

    if(oldActor instanceof Error) {
        res.status(404).json({
            success: false,
            error: "L'id ne correspond à aucune donnée",
        })
        return;
    }

    const oldActorhash: string = getMd5Hash(oldActor);

    if(oldActorhash !== req.get("if-match")) {
        res.status(401).json({
            success: false,
            error: "Invalid ETag",
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

    if(updatedActor.date_of_death != null && updatedActor.date_of_birth >= updatedActor.date_of_death){
        res.status(400).json({success: false, error: "La date de décès est inférieure à la date de naissance"});
        return
    }

    //Vérifier qu'un acteur ne possède pas déjà ce nom et ce prénom
    const actor: actors | Error = await repo.getByName(
        updatedActor.first_name,
        updatedActor.last_name
    );

    if (!(actor instanceof Error)) {
        if (actor.id != updatedActor.id) {
            res.status(400).json({success: false, error: "Cet acteur existe déjà"});
            return;
        }
    }

    repo.update(updatedActor)
        .then((result) => {
            res.set("ETag", getMd5Hash(result))
            res.status(200).json({
                success: true,
                data: result,
            });
            return;
        })
        .catch((err) => {
            res.status(500).json({success: false, error: err.message });
        });
};

const delete_actor = async (req: Request, res: Response) => {

    const actor: actors | Error = await repo.getById(Number(req.params.id))
    
    if(actor instanceof Error) {
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
            res.status(500).json({success: false, error: err.message });
        });
};

export { get_actor_list, get_actor, create_actor, update_actor, delete_actor };
