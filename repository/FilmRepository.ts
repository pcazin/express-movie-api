import sqlite3 from "sqlite3";

export default class FilmRepository {

    private database: sqlite3.Database;

    constructor(database: sqlite3.Database) {
        this.database = database;
    }

    list() {

    }

    get() {

    }

    create() {

    }

    update() {

    }

    delete() {

    }
}

module.exports = FilmRepository;