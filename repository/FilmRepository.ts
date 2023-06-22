import { films, PrismaClient } from "@prisma/client";
import { FilmPayload } from "../types/Film";

const prisma = new PrismaClient();

export default class FilmRepository {
    constructor() {}

    async list(): Promise<films[] | Error> {
        try {
            const films: films[] = await prisma.films.findMany({
                include: {
                    genre: {
                        select: {
                            name: true,
                        }
                    },
                    filmActors: {
                        select: {
                            actor: true,
                        },
                    },
                },
            });
            return films;
        } catch (err) {
            return new Error("Error: list() method in FilmRepository failed.");
        }
    }

    async getById(id: number): Promise<films | Error> {
        try {
            const film: films | null = await prisma.films.findUnique({
                where: {
                    id: id,
                },
                include: {
                    genre: {
                        select: {
                            name: true,
                        }
                    },
                    filmActors: {
                        select: {
                            actor: true,
                        },
                    },
                },
            });

            if (!film) {
                return new Error(
                    "Error: get() method in FilmRepository failed."
                );
            }

            return film;
        } catch (err) {
            return new Error("Error: get() method in FilmRepository failed.");
        }
    }

    async getByName(name: string): Promise<films | Error> {
        try {
            const film: films | null = await prisma.films.findFirst({
                where: {
                    name: name,
                },
            });

            if (!film) {
                return new Error(
                    "Error: get() method in FilmRepository failed."
                );
            }

            return film;
        } catch (err) {
            return new Error("Error: get() method in FilmRepository failed.");
        }
    }

    async getByGenreId(id: number): Promise<films[] | Error> {
        try {
            const films: films[] = await prisma.films.findMany({
                where: {
                    genre_id: id
                },
            });

            return films;
        } catch (err) {
            return new Error("Error: get() method in FilmRepository failed.");
        }
    }

    async create(newFilm: FilmPayload): Promise<films | Error> {
        try {
            const film: films = await prisma.films.create({
                data: {
                    name: newFilm.name,
                    synopsis: newFilm.synopsis,
                    release_year: newFilm.release_year,
                    genre_id: newFilm.genre_id,
                    filmActors: {
                        create: newFilm.actors_id.map((actorId: number) => ({
                            actor: { connect: { id: actorId } }
                        }))
                    }
                },
            });

            return film;
        } catch (err) {
            return new Error(
                "Error: create() method in FilmRepository failed."
            );
        }
    }

    async update(film: FilmPayload): Promise<films | Error> {
        try {
            const updatedFilm: films = await prisma.films.update({
                where: { id: film.id },
                data: {
                    name: film.name,
                    synopsis: film.synopsis,
                    release_year: film.release_year,
                    genre_id: film.genre_id,
                    filmActors: {
                        create: film.actors_id.map((actorId: number) => ({
                            actor: { connect: { id: actorId } }
                        }))
                    }
                },
            });
            return updatedFilm;
        } catch (err) {
            return new Error(
                "Error: update() method in FilmRepository failed."
            );
        }
    }

    async delete(id: number): Promise<films | Error> {
        try {
            const deletedFilm: films = await prisma.films.delete({
                where: { id },
            });

            return deletedFilm;
        } catch (err) {
            return new Error(
                "Error: delete() method in FilmRepository failed."
            );
        }
    }
}


