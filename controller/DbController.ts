import db from "../database/database";
import { Request, Response } from "express";
import FilmRepository from "../repository/FilmRepository";

const init_db = (_req: Request, _res: Response) => {
  console.log("db init: " + JSON.stringify(db))
};

export { init_db };