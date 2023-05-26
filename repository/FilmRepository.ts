import { films, PrismaClient } from "@prisma/client";
import { FilmPayload } from "../types/Film";

const prisma = new PrismaClient();

export default class FilmRepository {
    constructor() {}

    async list(): Promise<films[] | Error> {
        try {
            const films: films[] = await prisma.films.findMany();
            return films;
        } catch (err) {
            return new Error("Error: list() method in FilmRepository failed.");
        }
    }

    async get(id: number): Promise<films | Error> {
        try {
            const film: films | null = await prisma.films.findUnique({
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

    async create(newFilm: FilmPayload): Promise<films | Error> {
        try {
            const film: films = await prisma.films.create({
                data: newFilm,
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
                data: film,
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


