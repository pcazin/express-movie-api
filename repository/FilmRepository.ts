import { Film, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class FilmRepository {
    constructor() {}

    async list(): Promise<Film[] | Error> {
        try {
            const films: Film[] = await prisma.film.findMany();
            return films;
        } catch (err) {
            return new Error("Error: list() method in FilmRepository failed.");
        }
    }

    async get(id: number): Promise<Film | Error> {
        try {
            const film: Film | null = await prisma.film.findUnique({
                where: {
                    id: id,
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

    async create(newFilm: Film): Promise<Film | Error> {
        try {
            const film: Film = await prisma.film.create({
                data: newFilm,
            });

            return film;
        } catch (err) {
            return new Error(
                "Error: create() method in FilmRepository failed."
            );
        }
    }

    async update(film: Film): Promise<Film | Error> {
        try {
            const updatedFilm: Film = await prisma.film.update({
                where: { id: film.id },
                data: film,
            });
            return updatedFilm;
        } catch (err) {
            return new Error(
                "Error: update() method in FilmRepository failed."
            );
        }
    }

    async delete(id: number): Promise<Film | Error> {
        try {
            const deletedFilm: Film = await prisma.film.delete({
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


