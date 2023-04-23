export type Actor = {
    id?: number,
    first_name: string,
    last_name: string,
    date_of_birth: Date,
    date_of_death?: Date
}

/* CREATE TABLE 'actors' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'first_name' varchar(255) NOT NULL,
    'last_name' varchar(255) NOT NULL,
    'date_of_birth' date NOT NULL,
    'date_of_death' date
  );

    CREATE TABLE 'films_actors' (
    'film_id' INTEGER,
    'actor_id' INTEGER,
    FOREIGN KEY (film_id) REFERENCES films(id),
    FOREIGN KEY (actor_id) REFERENCES actors(id),
    PRIMARY KEY ('film_id', 'actor_id')
  );

  */
