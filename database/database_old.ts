import sqlite3 from "sqlite3";

const DBSOURCE = "database.sqlite";

const db: sqlite3.Database = new sqlite3.Database(
  DBSOURCE,
  (errConnect: Error | null) => {
    
    // erreur de connexion
    if (errConnect) {
      // Cannot open database
      console.error(errConnect.message);
      throw errConnect;
    }

    console.log("Connected to the SQLite database.");
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
          // Table already created
          console.log("tables already created.");

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
