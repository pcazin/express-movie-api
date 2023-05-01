-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "date_of_birth" DATETIME NOT NULL,
    "date_of_death" DATETIME
);

-- CreateTable
CREATE TABLE "Film" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "release_year" INTEGER,
    "genre_id" INTEGER NOT NULL,
    CONSTRAINT "Film_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FilmActor" (
    "filmId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,

    PRIMARY KEY ("filmId", "actorId"),
    CONSTRAINT "FilmActor_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FilmActor_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
