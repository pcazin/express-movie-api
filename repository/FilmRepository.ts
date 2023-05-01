import sqlite3 from "sqlite3";

export default class FilmRepository {

    private database: sqlite3.Database;

    constructor(database: sqlite3.Database) {
        this.database = database;
    }

    list() {
        return new Promise((resolve, reject) => {
            resolve(true)
        });
    }

    get() {
        return new Promise((resolve, reject) => {
            resolve(true)
        });
    }

    create() {
        return new Promise((resolve, reject) => {
            resolve(true)
        });
    }

    update() {
        return new Promise((resolve, reject) => {
            resolve(true)
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            resolve(true)
        });
    }
}

module.exports = FilmRepository;