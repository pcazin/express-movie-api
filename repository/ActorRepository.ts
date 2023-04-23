import sqlite3 from "sqlite3";
import { Actor } from "../types/repository/Actor";

export default class ActorRepository {

  private database: sqlite3.Database;

  constructor(database: sqlite3.Database) {
    this.database = database;
  }

  list(): Promise<Actor[]> {
    return new Promise((resolve, reject) => {
      this.database.all("SELECT * FROM actors", [], (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  get(id: number): Promise<Actor> {
    return new Promise((resolve, reject) => {
      this.database.get(
        "SELECT * FROM actors WHERE id = ?",
        [id],
        (err, row) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  create(actor: Actor): Promise<number> {
    return new Promise((resolve, reject) => {
      this.database.run(
        "INSERT INTO actors (first_name, last_name, date_of_birth, date_of_death) VALUES (?,?,?,?)",
        [
          actor.first_name,
          actor.last_name,
          actor.date_of_birth,
          actor.date_of_death,
        ],
        function (err) {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }

  update(actor: Actor): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.database.run(
        `UPDATE actors
            SET
                first_name = ?,
                last_name = ?,
                date_of_birth = ?,
                date_of_death = ?
                WHERE id = ?`,
        [
          actor.first_name,
          actor.last_name,
          actor.date_of_birth,
          actor.date_of_death,
          actor.id,
        ],
        (err) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.database.run(
        `DELETE FROM actors
               WHERE id = ?`,
        [id],
        (err) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  }
}




