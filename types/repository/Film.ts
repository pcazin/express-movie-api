export type Film = {
    id?: number,
    name: string,
    synopsis: string,
    release_year: number,
    genre_id: number,
}

/*   CREATE TABLE 'films' (
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
  ); */