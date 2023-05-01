import { Genre, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class GenreRepository {
    constructor() {}

    async list(): Promise<Genre[] | Error> {
        try {
            const genres: Genre[] = await prisma.genre.findMany();
            return genres;
        } catch (err) {
            return new Error("Error: list() method in GenreRepository failed.");
        }
    }

    async get(id: number): Promise<Genre | Error> {
        try {
            const genre: Genre | null = await prisma.genre.findUnique({
                where: {
                    id,
                },
            });

            if (!genre) {
                return new Error(
                    "Error: get() method in GenreRepository failed."
                );
            }

            return genre;
        } catch (err) {
            return new Error("Error: get() method in GenreRepository failed.");
        }
    }

    async create(newGenre: Genre): Promise<Genre | Error> {
        try {
            const genre: Genre = await prisma.genre.create({ data: newGenre });
            return genre;
        } catch (err) {
            return new Error(
                "Error: create() method in GenreRepository failed."
            );
        }
    }

    async update(genre: Genre): Promise<Genre | Error> {
        try {
            const updatedGenre: Genre = await prisma.genre.update({
                where: {
                    id: genre.id,
                },
                data: genre,
            });

            return updatedGenre;
        } catch (err) {
            return new Error(
                "Error: update() method in GenreRepository failed."
            );
        }
    }

    async delete(id: number): Promise<Genre | Error> {
        try {
            const deletedGenre: Genre = await prisma.genre.delete({
                where: { id },
            });

            return deletedGenre;
        } catch (err) {
            return new Error(
                "Error: delete() method in GenreRepository failed."
            );
        }
    }
}


