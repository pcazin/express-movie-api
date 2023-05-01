// Import the sqlite3 module
import sqlite3 from "sqlite3";

// Define the path to the SQLite database file
const DBSOURCE = "./database.sqlite";

// Create a new instance of the sqlite3.Database class, passing in the path to the database file
const db: sqlite3.Database = new sqlite3.Database(
  DBSOURCE,
  sqlite3.OPEN_CREATE,
  (errConnect: Error | null) => {
    // If there was an error connecting to the database, print an error message and exit the program
    if (errConnect) {
      console.error(errConnect.message);
      throw errConnect;
    }

    // If the connection was successful, print a message to the console
    console.log("Connected to the SQLite database.");

    // Run an SQL query to create the 'genres', 'actors', 'films', and 'films_actors' tables
    // If the tables already exist, an error will be thrown and the 'errQuery' parameter will be defined
    // If the tables do not exist, they will be created and the 'errQuery' parameter will be undefined
    db.run(
      `CREATE TABLE 'genres' (
        'id' INTEGER PRIMARY KEY AUTOINCREMENT,
        'name' varchar(255) NOT NULL
      );

      CREATE TABLE 'actors' (
        'id' INTEGER PRIMARY KEY AUTOINCREMENT,
        'first_name' varchar(255) NOT NULL,
        'last_name' varchar(255) NOT NULL,
        'date_of_birth' date NOT NULL,
        'date_of_death' date
      );

      CREATE TABLE 'films' (
        'id' INTEGER PRIMARY KEY AUTOINCREMENT,
        'name' varchar(255) NOT NULL,
        'synopsis' text NOT NULL,
        'release_year' int,
        'genre_id' int NOT NULL
      );

      CREATE TABLE 'films_actors' (
        'film_id' INTEGER,
        'actor_id' INTEGER,
        FOREIGN KEY (film_id) REFERENCES films(id),
        FOREIGN KEY (actor_id) REFERENCES actors(id),
        PRIMARY KEY ('film_id', 'actor_id')
      );`,
      (errQuery) => {
        if (errQuery) {
          // If the tables already existed, print a message to the console
          console.log("tables already created.");
          
          // Insert some initial data into the 'genres' table
          const insertGenres = 'INSERT INTO genres (name) VALUES (?)';
          db.run(insertGenres, ['documentaires']);
          db.run(insertGenres, ['sf']);
          db.run(insertGenres, ['drama']); 

          // Insert some initial data into the 'films' table
          const insertFilms = 'INSERT INTO films (name, synopsis, release_year, genre_id) VALUES (?,?,?,?)';
          db.run(insertFilms, ['ui', "uiiiiiiiiiii", new Date().toString(), 1]);
          db.run(insertFilms, ['ui', "uiiiiiiiiiii", new Date().toString(), 1]);

          // Insert some initial data into the 'actors' table
          const insertActors = 'INSERT INTO actors (first_name, last_name, date_of_birth, date_of_death) VALUES (?,?,?,?)';
          db.run(insertActors, ['firsdtname', 'lastname', new Date().toString(), new Date().toString()]);
          db.run(insertActors, ['firsdtname', 'lastname', new Date().toString(), new Date().toString()]);

          // Run a query to select all rows from the 'actors' table and print the result to the console
          const getSQL = 'SELECT * FROM actors';
          db.all(getSQL, (err, rows) => {
            if(err) {
              console.error("erreur la malaisant")
            }
            console.log(rows)
          }) 
          
        } else {
          // Table just created, creating some rows
          console.log("tables created.");
          const insertGenres = 'INSERT INTO genres (name) VALUES (?)';
          db.run(insertGenres, ['documentaires']);
          db.run(insertGenres, ['sf']);
          db.run(insertGenres, ['drama']); 

          const insertFilms = 'INSERT INTO films (name, synopsis, release_year, genre_id) VALUES (?,?,?,?)';
          db.run(insertFilms, ['ui', "uiiiiiiiiiii", new Date().toString(), 1]);
          db.run(insertFilms, ['ui', "uiiiiiiiiiii", new Date().toString(), 1]);

          const insertActors = 'INSERT INTO actors (first_name, last_name, date_of_birth, date_of_death) VALUES (?,?,?,?)';
          db.run(insertActors, ['firsdtname', 'lastname', new Date().toString(), new Date().toString()]);
          db.run(insertActors, ['firsdtname', 'lastname', new Date().toString(), new Date().toString()]);

          const getSQL = 'SELECT * FROM genres';
          db.all(getSQL, [], (err, rows) => {
            if(err) {
              console.error("erreur la malaisant 2")
            }
            console.log(rows)
          })
        }
      }
    );
  }
);

function decorator(truc: any) {
  return {
    ...truc
  }

}

export default db;
