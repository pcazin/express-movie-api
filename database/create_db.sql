DROP TABLE IF EXISTS films_actors;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS actors;
DROP TABLE IF EXISTS films;

CREATE TABLE 'genres' (
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
);