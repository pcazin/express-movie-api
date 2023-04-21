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
      `CREATE TABLE IF NOT EXISTS todo (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          contents TEXT,
          done TINYINT DEFAULT 0
      )`,
      (errQuery) => {
        if (errQuery) {
          // Table already created
        } else {
          // Table just created, creating some rows
          const insert = 'INSERT INTO todo (contents, done) VALUES (?,?)';
          db.run(insert, ['Acheter des bières', 0]);
          db.run(insert, ['Tondre le jardin', 0]);
          db.run(insert, ['Nettoyer le barbecue', 1]);
        }
      },
    );
  }
});

export default db;