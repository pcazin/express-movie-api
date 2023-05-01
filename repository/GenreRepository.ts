import sqlite3 from "sqlite3";
import { Genre } from "../types/repository/Genre";

export default class GenreRepository {

    private database: sqlite3.Database;

    constructor(database: sqlite3.Database) {
        this.database = database;
    }

    list(): Promise<Genre[]> {
        return new Promise((resolve, reject) => {
            this.database.all('SELECT * FROM todo', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(
                        // rows.map((row) => this.decorator(row)),
                        rows
                    );
                }
            });
        });
    }

    get(id: number): Promise<Genre> {
        return new Promise((resolve, reject) => {
            this.database.get('SELECT * FROM todo WHERE id = ?', [id], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(
                        // this.decorator(row),
                        row
                    );
                }
            });
        });
    }

    create(data: Genre): Promise<boolean> {
        /* return new Promise((resolve, reject) => {
            this.database.run(
                'INSERT INTO todo (contents, done) VALUES (?,?)',
                [data.contents, data.done ? 1 : 0],
                function (err) {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                },
            );
        }); */
        return new Promise((resolve, reject) => {
            resolve(true);
        })
    }

    update(data: Genre) {
        /* return new Promise((resolve, reject) => {
            this.database.run(
                `UPDATE todo
               SET contents = ?,
                   done = ?
               WHERE id = ?`,
                [data.contents, data.done ? 1 : 0, id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                },
            );
        }); */
    }

    delete(id: number) {
        return new Promise((resolve, reject) => {
            this.database.run(
                `DELETE FROM todo
               WHERE id = ?`,
                [id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(true);
                    }
                },
            );
        });
    }

    // eslint-disable-next-line class-methods-use-this
    /* decorator(todo) {
        return {
            ...todo,
            done: todo.done === 1,
        };
    } */
}

module.exports = GenreRepository;