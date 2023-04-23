import db from "../database/database";
import { Request, Response } from "express";
import TodoRepository from "../repository/TodoRepository";

exports.todo_list = (req: Request, res: Response) => {
    new TodoRepository(db)
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

exports.todo_get = (req: Request, res: Response) => {
    new TodoRepository(db)
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

exports.todo_create = (req: Request, res: Response) => {
    const errors: String[] = [];
    ['contents', 'done'].forEach((field) => {
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

    new TodoRepository(db).create({
        contents: req.body.contents,
        done: req.body.done === 'true',
    })
        .then((result) => {
            res
                .status(201)
                .json({
                    success: true,
                    id: result,
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.todo_update = (req: Request, res: Response) => {
    const errors: String[] = [];
    ['contents', 'done'].forEach((field) => {
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

    const repo: TodoRepository = new TodoRepository(db);

    repo.update(
        Number(req.params.id),
        {
            contents: req.body.contents,
            done: req.body.done === 'true',
        },
    )
        .then(() => {
            repo.get(Number(req.params.id))
                .then((result) => {
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

exports.todo_delete = (req: Request, res: Response) => {
    new TodoRepository(db)
        .delete(Number(req.params.id))
        .then(() => {
            res.status(204)
                .json({
                    success: true,
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

