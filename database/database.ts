import sqlite3 from 'sqlite3';

const DBSOURCE = 'db.sqlite';

const db: sqlite3.Database = new sqlite3.Database(DBSOURCE, (errConnect: Error | null) => {
  if (errConnect) {
    // Cannot open database
    console.error(errConnect.message);
    throw errConnect;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(
      `CREATE TABLE IF NOT EXISTS 'genres' (
        'id' INTEGER PRIMARY KEY AUTOINCREMENT,
        'name' varchar(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS 'actors' (
        'id' INTEGER PRIMARY KEY AUTOINCREMENT,
        'first_name' varchar(255) NOT NULL,
        'last_name' varchar(255) NOT NULL,
        'date_of_birth' date NOT NULL,
        'date_of_death' date
      );

      CREATE TABLE IF NOT EXISTS 'films' (
        'id' INTEGER PRIMARY KEY AUTOINCREMENT,
        'name' varchar(255) NOT NULL,
        'synopsis' text NOT NULL,
        'release_year' int,
        'genre_id' int NOT NULL
      );

      CREATE TABLE IF NOT EXISTS 'films_actors' (
        'film_id' INTEGER,
        'actor_id' INTEGER,
        FOREIGN KEY (film_id) REFERENCES films(id),
        FOREIGN KEY (actor_id) REFERENCES actors(id),
        PRIMARY KEY ('film_id', 'actor_id')
      );`,
      (errQuery) => {
        if (errQuery) {
          // Table already created
          console.log("tables already created.")
        } else {
          // Table just created, creating some rows
          console.log("tables created.")
          /* const insert = 'INSERT INTO todo (contents, done) VALUES (?,?)';
          db.run(insert, ['Acheter des bières', 0]);
          db.run(insert, ['Tondre le jardin', 0]);
          db.run(insert, ['Nettoyer le barbecue', 1]); */
        }
      },
    );
  }
});

export default db;